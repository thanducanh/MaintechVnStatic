"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { KeyRound, X, Settings, LogOut } from "lucide-react";
import { changePassword, logout } from "@/actions/auth";
import toast from "react-hot-toast";

export function SettingsDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handlePasswordSubmit(formData: FormData) {
    setLoading(true);
    const res = await changePassword(formData);
    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Đổi mật khẩu thành công!");
      setIsModalOpen(false);
    }
  }

  const openPasswordModal = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
        title="Cài đặt"
      >
        <Settings size={20} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 py-1">
          <button 
            onClick={openPasswordModal}
            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <KeyRound size={16} className="text-slate-500" />
            Đổi mật khẩu
          </button>
          <div className="h-px bg-slate-100 my-1"></div>
          <form action={logout}>
            <button 
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2 font-medium"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          </form>
        </div>
      )}

      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-slate-800">Đổi mật khẩu</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form action={handlePasswordSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu cũ</label>
                  <input 
                    type="password" 
                    name="oldPassword"
                    required
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                >
                  {loading ? "Đang xử lý..." : "Lưu mật khẩu"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
