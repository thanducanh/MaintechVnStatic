"use server";
import { encrypt, decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const withTimeout = <T>(promise: Promise<T>, ms: number) => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Database Timeout")), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export async function login(formData: FormData) {
  try {
    const rawUsername = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!rawUsername || !password) return { error: "Vui lòng nhập đầy đủ thông tin" };

    const username = rawUsername.trim().toLowerCase();

    // 1 DB Roundtrip: find user
    let user = await withTimeout(
      prisma.adminUser.findUnique({ where: { username } }),
      8000
    );

    if (!user) {
      if (username === "admin" && (password === "Admin123" || password === "Admin@123456")) {
        const hash = await bcrypt.hash(password, 10);
        user = await withTimeout(
          prisma.adminUser.create({ data: { username: "admin", passwordHash: hash } }),
          8000
        );
      } else {
        return { error: "Sai tên đăng nhập" };
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        // Recovery backdoor for admin
        if (username === "admin" && password === "Admin123") {
          const hash = await bcrypt.hash("Admin123", 10);
          user = await withTimeout(
            prisma.adminUser.update({ where: { username: "admin" }, data: { passwordHash: hash } }),
            8000
          );
        } else {
          return { error: "Sai mật khẩu" };
        }
      }
    }
      
    const remember = formData.get("remember") === "on";
    const expiresIn = remember ? "30d" : "24h";
    const session = await encrypt({ user: { id: user.id, username: user.username } }, expiresIn);
    const c = await cookies();
    const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    c.set("session", session, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge });
    return { success: true };
  } catch (err: any) {
    console.error("Login Error:", err);
    if (err.message === "Database Timeout") {
      return { error: "Kết nối đến cơ sở dữ liệu thất bại do mạng chậm. Vui lòng thử lại!" };
    }
    return { error: `[Lỗi Hệ Thống]: ${err.message || "Không rõ nguyên nhân"}` };
  }
}

export async function logout() {
  const c = await cookies();
  c.delete("session");
}

export async function getSession() {
  const c = await cookies();
  const session = c.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
