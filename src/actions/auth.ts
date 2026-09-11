"use server";
import { encrypt, decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== "admin@maintechvn.com") return { error: "Sai tài khoản" };

  let user = await prisma.adminUser.findUnique({ where: { username: "admin" } });

  if (!user) {
    if (password !== "Admin@123456") return { error: "Sai mật khẩu" };
    const hash = await bcrypt.hash("Admin@123456", 10);
    user = await prisma.adminUser.create({
      data: { username: "admin", passwordHash: hash }
    });
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
}
