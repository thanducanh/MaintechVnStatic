import { getSession, logout } from "@/actions/auth";
import { cleanupTrash } from "@/actions/contact";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LogOut, Users, Mail, Calendar, BarChart3, Globe, Trash2 } from "lucide-react";
import { startOfDay, startOfMonth, startOfYear } from "date-fns";
import Link from "next/link";
import { MessageRow } from "./MessageRow";
import { SettingsDropdown } from "./SettingsDropdown";
import { NotificationBell } from "./NotificationBell";

export default async function AdminDashboard(props: { searchParams?: Promise<{ filter?: string }> }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const searchParams = props.searchParams ? await props.searchParams : {};
  const filter = searchParams.filter || "all";

  const now = new Date();
  await cleanupTrash();

  // Determine message where clause
  let messageWhere: any = { deletedAt: null };
  if (filter === "pending") {
    messageWhere.status = { not: "Đã xử lý" };
  } else if (filter === "resolved") {
    messageWhere.status = "Đã xử lý";
  }
  
  // Dashboard Stats
  const [
    todayVisits,
    monthVisits,
    yearVisits,
    totalMessages,
    recentMessages,
    pendingMessages
  ] = await Promise.all([
    prisma.visitorLog.count({
      where: { visitedAt: { gte: startOfDay(now) } }
    }),
    prisma.visitorLog.count({
      where: { visitedAt: { gte: startOfMonth(now) } }
    }),
    prisma.visitorLog.count({
      where: { visitedAt: { gte: startOfYear(now) } }
    }),
    // @ts-ignore
    prisma.contactMessage.count({ where: messageWhere }),
    // @ts-ignore
    prisma.contactMessage.findMany({
      where: messageWhere,
      orderBy: { createdAt: 'desc' },
      take: 20
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
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<Users className="text-blue-500" />} title="Truy cập hôm nay" value={todayVisits} />
            <StatCard icon={<Calendar className="text-green-500" />} title="Truy cập tháng này" value={monthVisits} />
            <StatCard icon={<BarChart3 className="text-purple-500" />} title="Truy cập năm nay" value={yearVisits} />
            <StatCard icon={<Mail className="text-[#C8102E]" />} title="Tổng tin nhắn" value={totalMessages} />
          </div>

          {/* Messages Table */}
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-slate-800">Tin nhắn liên hệ mới nhất</h2>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <Link href="/admin?filter=all" className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>Tất cả</Link>
                  <Link href="/admin?filter=pending" className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === 'pending' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}>Chờ xử lý</Link>
                  <Link href="/admin?filter=resolved" className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === 'resolved' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Đã xử lý</Link>
                </div>
              </div>
              <Link href="/admin/trash" className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors bg-slate-100 px-3 py-1.5 rounded-md">
                <Trash2 size={16} /> Thùng rác
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-3 font-medium">Khách hàng</th>
                    <th className="px-6 py-3 font-medium">SĐT / Email</th>
                    <th className="px-6 py-3 font-medium">Nội dung</th>
                    <th className="px-6 py-3 font-medium">Thời gian</th>
                    <th className="px-6 py-3 font-medium w-16 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentMessages.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Chưa có tin nhắn nào</td></tr>
                  ) : (
                    recentMessages.map((msg: any) => (
                      <MessageRow key={msg.id} msg={msg} />
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

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: number }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="rounded-full bg-slate-50 p-3">{icon}</div>
      <div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
