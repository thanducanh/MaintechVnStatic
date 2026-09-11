import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const twelveHoursAgo = new Date();
    twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

    // Find messages that are "Mới", not deleted, created > 12h ago, and no reminder sent yet
    // @ts-ignore
    const pendingMessages = await prisma.contactMessage.findMany({
      where: {
        status: { not: "Đã xử lý" },
        deletedAt: null,
        reminderSent: false,
        createdAt: { lt: twelveHoursAgo }
      }
    });

    if (pendingMessages.length === 0) {
      return NextResponse.json({ message: "Không có tin nhắn nào cần nhắc nhở" });
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      let htmlContent = `<h2>Nhắc nhở: Có ${pendingMessages.length} yêu cầu chưa được xử lý!</h2>
        <p>Các tin nhắn sau đã quá 12 giờ kể từ khi khách hàng liên hệ nhưng chưa được xử lý trong hệ thống:</p>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 800px;">
          <tr>
            <th style="background-color: #f8f9fa;">Khách hàng</th>
            <th style="background-color: #f8f9fa;">Điện thoại</th>
            <th style="background-color: #f8f9fa;">Thời gian nhận</th>
          </tr>
      `;

      for (const msg of pendingMessages) {
        htmlContent += `
          <tr>
            <td>${msg.name} ${msg.company ? `(CTY: ${msg.company})` : ''}</td>
            <td>${msg.phone}</td>
            <td>${new Date(msg.createdAt).toLocaleString("vi-VN")}</td>
          </tr>
        `;
      }

      htmlContent += `</table><br/><p>Vui lòng đăng nhập vào <a href="https://maintechvn.com/admin">Hệ thống Quản trị</a> để xử lý.</p>`;

      await transporter.sendMail({
        from: `Maintech Notification <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, 
        subject: `[QUAN TRỌNG] Nhắc nhở xử lý ${pendingMessages.length} tin nhắn tồn đọng`,
        html: htmlContent,
      });

      // Update reminderSent
      // @ts-ignore
      await prisma.contactMessage.updateMany({
        where: { id: { in: pendingMessages.map((m: any) => m.id) } },
        data: { reminderSent: true }
      });

      return NextResponse.json({ message: `Đã gửi nhắc nhở cho ${pendingMessages.length} tin nhắn` });
    }

    return NextResponse.json({ message: "Chưa cấu hình SMTP" });
  } catch (error) {
    console.error("Cron Error", error);
    return NextResponse.json({ error: "Lỗi cron job" }, { status: 500 });
  }
}
