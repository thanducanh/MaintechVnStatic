"use client";

import React, { useState } from "react";
import { ChevronRight, CheckCircle2, Loader2 } from "lucide-react";


interface ContactFormProps {
    title: string;
    subtitle: string;
    submitText: string;
    successMsg: string;
}

export default function ContactForm({ title, subtitle, submitText, successMsg }: ContactFormProps) {
    const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState("loading");
        try {
            await new Promise(r => setTimeout(r, 1000));
            setFormState("success");
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setFormState("idle"), 8000);
        } catch {
            setFormState("error");
            setErrorMsg("Lỗi kết nối. Vui lòng kiểm tra lại mạng.");
        }
    };

    return (
        <div className="relative">
            {title && (
                <div className="mb-10 text-center">
                    <h3 className="text-slate-900 text-3xl font-bold uppercase tracking-tight mb-3">{title}</h3>
                    {subtitle && <p className="text-slate-500 text-sm font-medium">{subtitle}</p>}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <input name="name" required placeholder="Họ và tên *"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:bg-white px-5 py-4 outline-none text-slate-700 text-sm font-medium transition-all rounded-sm placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <input name="email" type="email" placeholder="Email *" required
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:bg-white px-5 py-4 outline-none text-slate-700 text-sm font-medium transition-all rounded-sm placeholder:text-slate-400" />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <input name="phone" required type="tel" placeholder="Số điện thoại *"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:bg-white px-5 py-4 outline-none text-slate-700 text-sm font-medium transition-all rounded-sm placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <input name="service_interest" placeholder="Dịch vụ quan tâm"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:bg-white px-5 py-4 outline-none text-slate-700 text-sm font-medium transition-all rounded-sm placeholder:text-slate-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <textarea name="message" required rows={5} placeholder="Nội dung yêu cầu *"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:bg-white px-5 py-4 outline-none text-slate-700 text-sm font-medium transition-all rounded-sm resize-none placeholder:text-slate-400" />
                </div>

                {formState === "success" && (
                    <div className="p-4 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-sm border border-emerald-100 flex items-center gap-3">
                        <CheckCircle2 size={18} /> {successMsg}
                    </div>
                )}

                {formState === "error" && (
                    <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-sm border border-red-100">
                        {errorMsg}
                    </div>
                )}

                <div className="flex justify-center pt-4">
                    <button type="submit" disabled={formState === "loading"}
                        className="bg-[#C8102E] hover:bg-slate-900 text-white py-4 px-10 font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-3 rounded-sm disabled:opacity-50"
                    >
                        {formState === "loading" ? "ĐANG XỬ LÝ..." : submitText}
                    </button>
                </div>
            </form>
        </div>
    );
}
