"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await login(formData);
    
    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Đăng nhập thành công!");
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/services-hero-bg.jpg')] bg-cover bg-center p-4 relative">
      {/* Overlay to dim background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md">
        <div className="bg-[#0a0f1d] px-8 py-8 text-center text-white border-b-4 border-[#C8102E]">
          <div className="mb-4 flex justify-center">
             <div className="relative h-14 w-14 rounded-full bg-white p-2 shadow-lg">
                <Image
                  src="/images/site-logo-maintech.png"
                  alt="Maintech Logo"
                  fill
                  className="object-contain p-2"
                />
             </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight">MAINTECH VIETNAM</h1>
          <p className="mt-1 text-sm text-slate-400">Hệ thống quản trị nội dung (CMS)</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email (Tài khoản)</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="Nhập email quản trị..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-[#C8102E] focus:bg-white focus:ring-2 focus:ring-[#C8102E]/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Mật khẩu</label>
              <div className="relative">
                <style dangerouslySetInnerHTML={{__html: `
                  input[type="password"]::-ms-reveal,
                  input[type="password"]::-ms-clear {
                    display: none;
                  }
                `}} />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="Nhập mật khẩu..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition-all focus:border-[#C8102E] focus:bg-white focus:ring-2 focus:ring-[#C8102E]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 group">
                <div className="relative flex items-center">
                  <input type="checkbox" name="remember" className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-300 bg-white transition-all checked:border-[#C8102E] checked:bg-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20" />
                  <svg className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-600 transition-colors group-hover:text-slate-900">Lưu đăng nhập</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#e01435] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#C8102E]/40 disabled:pointer-events-none disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Đăng Nhập Hệ Thống
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="relative z-10 mt-8 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Maintech Vietnam. All rights reserved.
      </div>
    </div>
  );
}
