"use server";
import { encrypt, decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper for timeout
const withTimeout = <T>(promise: Promise<T>, ms: number) => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Database Timeout")), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email !== "admin@maintechvn.com") return { error: "Sai tài khoản" };

    // With a 10s timeout to prevent infinite loading if DB is unreachable
    let user = await withTimeout(
      prisma.adminUser.findUnique({ where: { username: "admin" } }),
      10000
    );

    if (!user) {
      if (password !== "Admin@123456") return { error: "Sai mật khẩu" };
      const hash = await bcrypt.hash("Admin@123456", 10);
      user = await withTimeout(
        prisma.adminUser.create({
          data: { username: "admin", passwordHash: hash }
        }),
        10000
      );
    } else {
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return { error: "Sai mật khẩu" };
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
    return { error: err.message === "Database Timeout" ? "Kết nối đến cơ sở dữ liệu thất bại (Timeout). Kiểm tra DATABASE_URL trên Vercel." : "Có lỗi xảy ra, vui lòng thử lại sau." };
  }
}

export async function logout() {
  const c = await cookies();
  c.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const c = await cookies();
  const session = c.get("session")?.value;
  if (!session) return null;
  return await decrypt(session).catch(() => null);
}

export async function changePassword(formData: FormData) {
  try {
    const sessionData = await getSession();
    if (!sessionData) return { error: "Không được phép" };

    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!oldPassword || !newPassword) return { error: "Vui lòng nhập đủ thông tin" };

    const user = await prisma.adminUser.findUnique({ where: { username: "admin" } });
    if (!user) return { error: "Không tìm thấy tài khoản" };

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) return { error: "Mật khẩu cũ không chính xác" };

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.adminUser.update({
      where: { username: "admin" },
      data: { passwordHash: hash }
    });

    return { success: true };
  } catch (err) {
    return { error: "Lỗi hệ thống khi đổi mật khẩu" };
  }
}
