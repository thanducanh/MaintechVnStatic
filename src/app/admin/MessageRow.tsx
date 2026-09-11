"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DeleteMessageButton, TrashActions } from "./MessageActions";
import { X, CheckCircle, Clock } from "lucide-react";
import { toggleMessageStatus } from "@/actions/contact";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function MessageRow({ msg, isTrash = false }: { msg: any, isTrash?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isResolved = msg.status === "Đã xử lý";

  const handleToggleStatus = async () => {
    const newStatus = isResolved ? "Mới" : "Đã xử lý";
    const res = await toggleMessageStatus(msg.id, newStatus);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(isResolved ? "Đã chuyển về Chờ xử lý" : "Đã đánh dấu Đã xử lý");
      router.refresh();
    }
  };

  return (
    <>
      <tr className={`group cursor-pointer transition-colors ${isResolved && !isTrash ? 'bg-slate-100/50 opacity-75' : 'hover:bg-slate-50'}`} onClick={() => setIsOpen(true)}>
        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
          {!isTrash && (
            <div title={isResolved ? "Đã xử lý" : "Chờ xử lý"}>
              {isResolved ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <Clock size={16} className="text-amber-500" />
              )}
            </div>
          )}
          {msg.name}
        </td>
        <td className="px-6 py-4">
          <div className="text-slate-900 font-medium">{msg.phone}</div>
          <div className="text-slate-500 text-xs">{msg.email}</div>
          {msg.company && <div className="text-slate-400 text-xs mt-1">CTY: {msg.company}</div>}
        </td>
        <td className="px-6 py-4 text-slate-700 max-w-xs truncate">{msg.message}</td>
        <td className={`px-6 py-4 font-medium ${isTrash ? 'text-red-500' : 'text-slate-500'}`}>
          {new Date(isTrash ? msg.deletedAt : msg.createdAt).toLocaleString("vi-VN")}
        </td>
        <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
            {!isTrash && (
              <button 
                onClick={handleToggleStatus} 
                className={isResolved ? "text-amber-500 hover:text-amber-700 p-1" : "text-green-500 hover:text-green-700 p-1"} 
                title={isResolved ? "Đánh dấu chờ xử lý" : "Đánh dấu đã xử lý"}
              >
                {isResolved ? <Clock size={18} /> : <CheckCircle size={18} />}
              </button>
            )}
            {isTrash ? <TrashActions id={msg.id} /> : <DeleteMessageButton id={msg.id} />}
          </div>
        </td>
      </tr>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-800">Chi tiết tin nhắn</h3>
                {!isTrash && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isResolved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isResolved ? "Đã xử lý" : "Chờ xử lý"}
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Khách hàng</p>
                  <p className="font-medium text-slate-900">{msg.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Thời gian</p>
                  <p className="font-medium text-slate-900">{new Date(msg.createdAt).toLocaleString("vi-VN")}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Số điện thoại</p>
                  <p className="font-medium text-slate-900"><a href={`tel:${msg.phone}`} className="hover:text-blue-600">{msg.phone}</a></p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium text-slate-900">{msg.email ? <a href={`mailto:${msg.email}`} className="hover:text-blue-600">{msg.email}</a> : "Không có"}</p>
                </div>
                {msg.company && (
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Công ty</p>
                    <p className="font-medium text-slate-900">{msg.company}</p>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nội dung</p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.message}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t bg-slate-50 flex justify-between items-center">
              {!isTrash ? (
                <button 
                  onClick={handleToggleStatus} 
                  className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors text-sm ${isResolved ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  {isResolved ? <Clock size={16} /> : <CheckCircle size={16} />}
                  {isResolved ? "Đánh dấu chờ xử lý" : "Đánh dấu đã xử lý"}
                </button>
              ) : (
                <div />
              )}
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors text-sm">
                Đóng
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
