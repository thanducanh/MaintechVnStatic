"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Clock } from "lucide-react";
import { markAllAsResolved } from "@/actions/contact";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function NotificationBell({ messages = [] }: { messages: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const count = messages.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await markAllAsResolved();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Đã đánh dấu tất cả là đã xử lý!");
      setIsOpen(false);
      router.refresh();
    }
  };

  const handleMessageClick = () => {
    setIsOpen(false);
    // Navigate to pending filter to view them
    router.push("/admin?filter=pending");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
            <h4 className="font-semibold text-slate-800">Thông báo chờ xử lý</h4>
            {count > 0 && (
              <button 
                onClick={handleMarkAll}
                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
              >
                <CheckCheck size={14} /> Đã đọc tất cả
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {count === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                Không có tin nhắn nào chờ xử lý
              </div>
            ) : (
              <div className="divide-y">
                {messages.slice(0, 10).map((msg) => (
                  <div 
                    key={msg.id} 
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={handleMessageClick}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-slate-800 line-clamp-1">{msg.name}</span>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{msg.message}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 inline-flex px-2 py-0.5 rounded-md">
                      <Clock size={12} /> Chờ xử lý
                    </div>
                  </div>
                ))}
                {count > 10 && (
                  <div 
                    className="px-4 py-3 text-center text-sm text-blue-600 font-medium hover:bg-slate-50 cursor-pointer"
                    onClick={handleMessageClick}
                  >
                    Xem tất cả {count} tin nhắn...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
