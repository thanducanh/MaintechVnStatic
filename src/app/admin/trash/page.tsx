import { getSession } from "@/actions/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Globe, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { MessageRow } from "../MessageRow";
import { SettingsDropdown } from "../SettingsDropdown";
import { NotificationBell } from "../NotificationBell";

export default async function TrashPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [deletedMessages, pendingMessages] = await Promise.all([
    // @ts-ignore
    prisma.contactMessage.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { deletedAt: 'desc' },
      take: 50
    }),
    // @ts-ignore
    prisma.contactMessage.findMany({
      where: { deletedAt: null, status: { not: "Đã xử lý" } },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
        <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative h-8 w-8 shrink-0">
            <img src="/images/site-logo-maintech.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="hidden sm:flex items-baseline select-none text-lg font-bold tracking-tight md:text-xl">
            <span className="text-[#C8102E]">MAIN</span>
            <span className="text-[#00A3FF]">TECH</span>
            <span className="ml-1 text-slate-900">VIETNAM</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors whitespace-nowrap"
            title="Quay lại trang web"
          >
            <Globe size={16} /> <span className="hidden md:inline">Quay lại web</span>
          </Link>
          <span className="hidden lg:inline text-sm font-medium text-slate-600 whitespace-nowrap">Xin chào, Admin</span>
          <NotificationBell messages={pendingMessages} />
          <SettingsDropdown />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          
          <div className="flex items-center justify-between">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg border shadow-sm hover:shadow"
            >
              <ArrowLeft size={16} /> Quay lại danh sách
            </Link>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <p className="text-sm">
              Tin nhắn trong thùng rác sẽ tự động bị xóa vĩnh viễn sau 30 ngày kể từ ngày chuyển vào đây. 
              Bạn có thể hoàn tác hoặc xóa vĩnh viễn ngay bây giờ.
            </p>
          </div>

          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 bg-white">
              <h2 className="text-lg font-semibold text-slate-800">Tin nhắn đã xóa</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-3 font-medium">Khách hàng</th>
                    <th className="px-6 py-3 font-medium">SĐT / Email</th>
                    <th className="px-6 py-3 font-medium">Nội dung</th>
                    <th className="px-6 py-3 font-medium">Ngày xóa</th>
                    <th className="px-6 py-3 font-medium w-24 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {deletedMessages.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">Thùng rác trống</td></tr>
                  ) : (
                    deletedMessages.map((msg: any) => (
                      <MessageRow key={msg.id} msg={msg} isTrash={true} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
