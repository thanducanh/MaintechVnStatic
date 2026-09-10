/**
 * TIỆN ICH THÔNG BÁO QUẢN TRỊ CAO CẤP (TELEGRAM)
 * Thiết kế chuẩn Industrial Excellence cho Maintech
 */

export async function sendTelegramMessage(message: string) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn("⚠️ Telegram Bot chưa được cấu hình (Thiếu TOKEN hoặc CHAT_ID)");
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error("❌ Lỗi Telegram:", error);
        return false;
    }
}

/**
 * 1. 📝 ĐIỀU PHỐI CÔNG VIỆC (KANBAN)
 */
export function formatKanbanMessage(action: string, taskTitle: string, user: string, column?: string, priority?: string) {
    const prioEmoji = priority === "URGENT" ? "🚨" : priority === "HIGH" ? "🔥" : "🔵";
    return [
        `📝 <b>THÔNG BÁO CÔNG VIỆC</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `⚡ <b>Hành động:</b> <code>${action}</code>`,
        `📌 <b>Nội dung:</b> <b>${taskTitle}</b>`,
        `👤 <b>Người thực hiện:</b> ${user}`,
        column ? `📂 <b>Phân loại:</b> <code>${column}</code>` : "",
        priority ? `${prioEmoji} <b>Ưu tiên:</b> ${priority}` : "",
        `━━━━━━━━━━━━━━━━━━━━`,
        `🕒 <i>${new Date().toLocaleString("vi-VN")}</i>`
    ].filter(Boolean).join("\n");
}

/**
 * 2. 📄 BÁO GIÁ & ĐẤU THẦU (QUOTES)
 */
export function formatQuoteMessage(code: string, customer: string, amount: string, user: string, status: string, title: string) {
    const statusEmoji = status === "WON" ? "✅" : status === "DRAFT" ? "⏳" : "📄";
    return [
        `${statusEmoji} <b>BÁO GIÁ & ĐẤU THẦU</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🔢 <b>Mã số:</b> <code>${code}</code>`,
        `📋 <b>Dự án:</b> ${title}`,
        `🏢 <b>Khách hàng:</b> ${customer}`,
        `💰 <b>Giá trị:</b> <pre>${amount}</pre>`,
        `👤 <b>Người lập:</b> ${user}`,
        `📊 <b>Trạng thái:</b> <b>${status}</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        status === "WON" ? `🎊 <b>CHÚC MỪNG:</b> <i>Đã chốt thành công!</i>` : `🕒 <i>Thời gian: ${new Date().toLocaleString("vi-VN")}</i>`
    ].join("\n");
}

/**
 * 3. 🏗️ DỰ ÁN & TIẾN ĐỘ (PROJECTS)
 */
export function formatProjectMessage(code: string, name: string, progress: number, status: string, manager: string) {
    const progressBar = "▓".repeat(Math.floor(progress / 10)) + "░".repeat(10 - Math.floor(progress / 10));
    return [
        `🏗️ <b>TIẾN ĐỘ CÔNG TRÌNH</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🏗️ <b>Dự án:</b> <b>${name}</b>`,
        `🆔 <b>Mã DA:</b> <code>${code}</code>`,
        `📈 <b>Tiến độ:</b> [${progressBar}] <b>${progress}%</b>`,
        `👤 <b>Chỉ huy:</b> ${manager}`,
        `🚩 <b>Trạng thái:</b> <code>${status}</code>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `📢 <i>Yêu cầu giám sát theo dõi sát sao!</i>`
    ].join("\n");
}

/**
 * 4. 💸 TÀI CHÍNH - THU CHI (TRANSACTIONS)
 */
export function formatTransactionMessage(type: "THU" | "CHI", amount: string, category: string, user: string, desc: string) {
    const emoji = type === "THU" ? "💰" : "💸";
    const prefix = type === "THU" ? "➕ NHẬN TIỀN" : "➖ CHI TIỀN";
    return [
        `${emoji} <b>KẾ TOÁN - ${prefix}</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `💵 <b>Số tiền:</b> <b>${amount} VNĐ</b>`,
        `📂 <b>Danh mục:</b> ${category}`,
        `📝 <b>Nội dung:</b> ${desc}`,
        `👤 <b>Người thực hiện:</b> ${user}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `📊 <i>Cập nhật vào sổ quỹ công ty.</i>`
    ].join("\n");
}

/**
 * 5. 🏦 BẢNG LƯƠNG & NHÂN SỰ (SALARY)
 */
export function formatSalaryMessage(month: number, year: number, user: string, total: string, status: string) {
    return [
        `🏦 <b>QUẢN TRỊ NHÂN SỰ</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `📅 <b>Kỳ lương:</b> Tháng ${month}/${year}`,
        `👤 <b>Nhân viên:</b> <b>${user}</b>`,
        `💰 <b>Thực nhận:</b> <pre>${total} VNĐ</pre>`,
        `📊 <b>Trạng thái:</b> ${status === "PAID" ? "✅ ĐÃ CHI TRẢ" : "⏳ CHỜ DUYỆT"}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `💡 <i>Vui lòng kiểm tra email để xem chi tiết.</i>`
    ].join("\n");
}

/**
 * 6. 🤝 HỢP ĐỒNG KINH TẾ (ECONOMIC CONTRACTS)
 */
export function formatContractMessage(code: string, title: string, customer: string, value: string, date: string) {
    return [
        `🤝 <b>HỢP ĐỒNG KINH TẾ</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🔢 <b>Mã HĐ:</b> <code>${code}</code>`,
        `📜 <b>Tên:</b> ${title}`,
        `🏢 <b>Đối tác:</b> ${customer}`,
        `💰 <b>Giá trị:</b> <b>${value} VNĐ</b>`,
        `📅 <b>Ngày ký:</b> ${date}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `✅ <i>Hợp đồng đã được lưu trữ hệ thống.</i>`
    ].join("\n");
}

/**
 * 7. ⚙️ HỆ THỐNG
 */
export function formatSystemMessage(title: string, details: string[]) {
    return [
        `⚙️ <b>HỆ THỐNG QUẢN TRỊ</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🔔 <b>Thông báo:</b> ${title}`,
        ...details.map(d => `• ${d}`),
        `━━━━━━━━━━━━━━━━━━━━`,
        `🕒 <i>${new Date().toLocaleString("vi-VN")}</i>`
    ].join("\n");
}
