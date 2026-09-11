"use server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const company = formData.get("company") as string || "";
    const service_interest = formData.get("service_interest") as string || "";

    if (!name || !email || !phone || !company || !service_interest || !message) {
      return { error: "Vui lòng nhập đủ các thông tin bắt buộc (*)" };
    }

    const fullMessage = service_interest ? `[Dịch vụ quan tâm: ${service_interest}]\n\n${message}` : message;

    // Save to database
    await prisma.contactMessage.create({
      data: { name, email, phone, company, message: fullMessage }
    });

    // Send Email using Nodemailer
    // You need to set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env file
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

      const mailOptions = {
        from: `Maintech Website <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER, // Send to the admin email itself
        subject: `[Maintech Website] Liên hệ mới từ ${name}`,
        html: `
          <h2>Thông báo liên hệ mới từ Website Maintech</h2>
          <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
              <th style="background-color: #f8f9fa; text-align: left; width: 150px;">Họ tên:</th>
              <td>${name}</td>
            </tr>
            <tr>
              <th style="background-color: #f8f9fa; text-align: left;">Số điện thoại:</th>
              <td><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <th style="background-color: #f8f9fa; text-align: left;">Email:</th>
              <td>${email ? `<a href="mailto:${email}">${email}</a>` : 'Không có'}</td>
            </tr>
            <tr>
              <th style="background-color: #f8f9fa; text-align: left;">Công ty:</th>
              <td>${company || 'Không có'}</td>
            </tr>
            <tr>
              <th style="background-color: #f8f9fa; text-align: left;">Dịch vụ quan tâm:</th>
              <td>${service_interest || 'Không chọn'}</td>
            </tr>
            <tr>
              <th style="background-color: #f8f9fa; text-align: left; vertical-align: top;">Nội dung:</th>
              <td style="white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">Tin nhắn này được gửi tự động từ hệ thống website Maintech Vietnam.</p>
        `,
      };

      await transporter.sendMail(mailOptions).catch((err) => {
        console.error("Nodemailer send error:", err);
        // We don't fail the submission if email fails, because it's already in the DB.
      });
    } else {
      console.warn("SMTP settings are missing in .env. Email was not sent.");
    }

    return { success: true };
  } catch (error) {
    console.error("Contact Form Error:", error);
    return { error: "Có lỗi xảy ra, vui lòng thử lại sau" };
  }
}

export async function deleteMessage(id: number) {
  try {
    // @ts-ignore
    await prisma.contactMessage.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
    return { success: true };
  } catch (error) {
    return { error: "Không thể xóa tin nhắn" };
  }
}

export async function restoreMessage(id: number) {
  try {
    // @ts-ignore
    await prisma.contactMessage.update({
      where: { id },
      data: { deletedAt: null }
    });
    return { success: true };
  } catch (error) {
    return { error: "Không thể khôi phục tin nhắn" };
  }
}

export async function permanentlyDeleteMessage(id: number) {
  try {
    await prisma.contactMessage.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    return { error: "Không thể xóa vĩnh viễn" };
  }
}

export async function cleanupTrash() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    // @ts-ignore
    await prisma.contactMessage.deleteMany({
      where: {
        deletedAt: {
          lt: thirtyDaysAgo
        }
      }
    });
  } catch (error) {
    console.error("Cleanup error", error);
  }
}

export async function toggleMessageStatus(id: number, newStatus: string) {
  try {
    // @ts-ignore
    await prisma.contactMessage.update({
      where: { id },
      data: { status: newStatus }
    });
    return { success: true };
  } catch (error) {
    return { error: "Không thể cập nhật trạng thái" };
  }
}

export async function markAllAsResolved() {
  try {
    // @ts-ignore
    await prisma.contactMessage.updateMany({
      where: { status: { not: "Đã xử lý" }, deletedAt: null },
      data: { status: "Đã xử lý" }
    });
    return { success: true };
  } catch (error) {
    return { error: "Lỗi hệ thống" };
  }
}
