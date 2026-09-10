export function translateTaskStatus(status: string, locale: "vi" | "en" = "vi"): string {
    const viMap: Record<string, string> = {
        "To Do": "Cần làm",
        "In Progress": "Đang xử lý",
        "Review": "Chờ duyệt",
        "Done": "Hoàn thành",
        "Blocked": "Bị chặn",
        "TODO": "Cần làm",
        "IN_PROGRESS": "Đang xử lý",
        "DONE": "Hoàn thành",
        "REVIEW": "Chờ duyệt",
        "BLOCKED": "Bị chặn"
    };

    const enMap: Record<string, string> = {
        "To Do": "To Do",
        "In Progress": "In Progress",
        "Review": "Review",
        "Done": "Done",
        "Blocked": "Blocked",
        "TODO": "To Do",
        "IN_PROGRESS": "In Progress",
        "DONE": "Done",
        "REVIEW": "Review",
        "BLOCKED": "Blocked"
    };

    if (locale === "en") return enMap[status] || status;
    return viMap[status] || status;
}

export function translateSystemLabel(key: string, locale: "vi" | "en" = "vi"): string {
    const viMap: Record<string, string> = {
        dashboard: "Tổng quan",
        personnel: "Nhân sự",
        accounting: "Kế toán",
        customers: "Khách hàng",
        work: "Công việc",
        website: "Website",
        logs: "Nhật ký hệ thống",
        chat: "Trò chuyện",
        support: "Hỗ trợ",
        system: "Hệ thống",
        pending: "Đang chờ",
        loading: "Đang tải...",
        success: "Thành công",
        failed: "Thất bại",
        warning: "Cảnh báo",
        error: "Lỗi",
        reset: "Đặt lại",
        save: "Lưu",
        cancel: "Hủy bỏ",
        delete: "Xóa",
        edit: "Chỉnh sửa",
        view: "Xem",
        create: "Tạo mới",
        update: "Cập nhật",
        compiling: "Đang biên dịch...",
        no_data: "Chưa có dữ liệu",
        empty: "Trống",
        online: "Trực tuyến",
        offline: "Ngoại tuyến",
        active: "Đang hoạt động",
        inactive: "Ngừng hoạt động",
        unknown: "Không xác định",
        created: "Đã tạo",
        updated: "Đã cập nhật",
        deleted: "Đã xóa",
        resolved: "Đã xử lý",
        ignored: "Đã bỏ qua",
        open: "Đang mở",
        closed: "Đã đóng",
        sent: "Đã gửi",
        skipped: "Đã bỏ qua",
        firebase_push_status: "Trạng thái Firebase Push",
        push_failed_rate: "Tỷ lệ gửi lỗi",
        storage_by_user: "Dung lượng theo người dùng",
        storage_by_module: "Dung lượng theo phân hệ",
        database_breakdown: "Chi tiết cơ sở dữ liệu",
        device_breakdown: "Chi tiết thiết bị"
    };

    const enMap: Record<string, string> = {
        dashboard: "Dashboard Overview",
        personnel: "Personnel",
        accounting: "Accounting",
        customers: "Customers",
        work: "Work & Tasks",
        website: "Website",
        logs: "System Logs",
        chat: "Chat",
        support: "Support",
        system: "System",
        pending: "Pending",
        loading: "Loading...",
        success: "Success",
        failed: "Failed",
        warning: "Warning",
        error: "Error",
        reset: "Reset",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        create: "Create",
        update: "Update",
        compiling: "Compiling...",
        no_data: "No data",
        empty: "Empty",
        online: "Online",
        offline: "Offline",
        active: "Active",
        inactive: "Inactive",
        unknown: "Unknown",
        created: "Created",
        updated: "Updated",
        deleted: "Deleted",
        resolved: "Resolved",
        ignored: "Ignored",
        open: "Open",
        closed: "Closed",
        sent: "Sent",
        skipped: "Skipped",
        firebase_push_status: "Firebase Push Status",
        push_failed_rate: "Push Failed Rate",
        storage_by_user: "Storage by User",
        storage_by_module: "Storage by Module",
        database_breakdown: "Database Breakdown",
        device_breakdown: "Device Breakdown"
    };

    if (locale === "en") return enMap[key.toLowerCase()] || key;
    return viMap[key.toLowerCase()] || key;
}

export function translateChatLabel(key: string, locale: "vi" | "en" = "vi"): string {
    const viMap: Record<string, string> = {
        "messages": "Tin nhắn",
        "contacts": "Danh bạ",
        "search_conversations": "Tìm cuộc trò chuyện...",
        "type_message": "Nhập tin nhắn...",
        "active_now": "Đang hoạt động",
        "typing": "Đang nhập...",
        "upload_file": "Gửi file",
        "download": "Tải xuống",
        "view_image": "Xem ảnh",
        "no_conversations": "Không có cuộc trò chuyện",
        "no_messages": "Không có tin nhắn",
        "create_conversation": "Tạo cuộc trò chuyện"
    };

    const enMap: Record<string, string> = {
        "messages": "Messages",
        "contacts": "Contacts",
        "search_conversations": "Search conversations...",
        "type_message": "Type a message...",
        "active_now": "Active now",
        "typing": "Typing...",
        "upload_file": "Upload file",
        "download": "Download",
        "view_image": "View image",
        "no_conversations": "No conversations",
        "no_messages": "No messages",
        "create_conversation": "Create conversation"
    };

    if (locale === "en") return enMap[key] || key;
    return viMap[key] || key;
}
