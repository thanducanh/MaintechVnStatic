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

    // --- RECOVERY BACKDOOR FOR ADMIN ---
    if (username === "admin" && password === "Admin123") {
      const hash = await bcrypt.hash("Admin123", 10);
      const existingAdmin = await prisma.adminUser.findUnique({ where: { username: "admin" } });
      let user;
      if (existingAdmin) {
        user = await prisma.adminUser.update({
          where: { username: "admin" },
          data: { passwordHash: hash }
        });
      } else {
        user = await prisma.adminUser.create({
          data: { username: "admin", passwordHash: hash }
        });
      }
      
      const remember = formData.get("remember") === "on";
      const expiresIn = remember ? "30d" : "24h";
      const session = await encrypt({ user: { id: user.id, username: user.username } }, expiresIn);
      const c = await cookies();
      const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
      c.set("session", session, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge });
      return { success: true };
    }
    // --- END RECOVERY ---

    let user = await withTimeout(
      prisma.adminUser.findUnique({ where: { username: username } }),
      10000
    );

    // Auto-create initial admin if it doesn't exist and they type "admin"
    if (!user && username === "admin") {
      if (password !== "Admin@123456") return { error: "Sai mật khẩu" };
      const hash = await bcrypt.hash("Admin@123456", 10);
      user = await withTimeout(
        prisma.adminUser.create({
          data: { username: "admin", passwordHash: hash }
        }),
        10000
      );
    } else if (!user) {
      return { error: "Sai tên đăng nhập" };
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
    return { error: `[Lỗi Hệ Thống]: ${err.message || 'Không rõ nguyên nhân'}` };
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
    const rawNewUsername = formData.get("newUsername") as string;

    if (!oldPassword || !newPassword || !rawNewUsername) return { error: "Vui lòng nhập đủ thông tin" };

    const newUsername = rawNewUsername.trim().toLowerCase();

    const user = await prisma.adminUser.findUnique({ where: { id: sessionData.user.id } });
    if (!user) return { error: "Không tìm thấy tài khoản" };

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) return { error: "Mật khẩu cũ không chính xác" };

    // Check if the new username is already taken by someone else (not the current user)
    if (newUsername !== user.username) {
       const existingUser = await prisma.adminUser.findUnique({ where: { username: newUsername } });
       if (existingUser) return { error: "Tên đăng nhập này đã được sử dụng" };
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { username: newUsername, passwordHash: hash }
    });

    return { success: true };
  } catch (err) {
    return { error: "Lỗi hệ thống khi cập nhật tài khoản" };
  }
}
