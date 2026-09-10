// 📍 File: src/components/ContactPublicContent.tsx
"use client";

import React, { useState } from "react";
import PageBanner from "@/components/PageBanner";
import {
    Phone, Mail, MessageCircle,
    MapPin, Send, Loader2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";

export default function ContactPublicContent({ data }: { data: any }) {
    const { language, t } = useLanguage();
    const isVN = language === "VN";
    const currentLocale = isVN ? "vi" : "en";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.target as HTMLFormElement;
        
        // Simulating the action locally via mailto
        const email = data.contactInfo?.emails?.[0] || "mtv@maintechvn.com.vn";
        window.location.href = `mailto:${email}?subject=Liên hệ từ website`;
        
        setIsSubmitting(false);
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const handleCallClick = () => {
        // tracking removed for static version
    };

    const resolveLocalized = (value: any, locale: "vi" | "en", fallback = "") => {
        if (!value) return fallback;
        if (typeof value === "string") return value || fallback;
        return value?.[locale] || value?.vi || value?.en || fallback;
    };

    const rawPhone = ((data.contactInfo?.hotlines && data.contactInfo.hotlines[0]) || data.contactInfo?.hotline || "0918 458 399").replace(/[^0-9+]/g, "");

    const getSocialLink = (type: string) => {
        const channel = data.quickChannels[type];
        if (!channel?.enabled) return null;
        const val = channel.value || rawPhone;
        if (type === "zalo") return `https://zalo.me/${val}`;
        if (type === "whatsapp") return `https://wa.me/${val.replace('+', '')}`;
        if (type === "telegram") return `https://t.me/${val}`;
        if (type === "twitter") return `https://x.com/${val}`;
        return "#";
    };

    const currentTitle = resolveLocalized(data.pageContent?.title, currentLocale, isVN ? "CHÚNG TÔI LUÔN SẴN SÀNG LẮNG NGHE" : "WE ARE ALWAYS READY TO LISTEN");

    return (
        <div className="flex flex-col flex-1">
            {/* BANNER (ABB STYLE) */}
     <PageBanner 
       pageKey="BANNER_CONTACT" 
       centered
      customImage="/images/maintech-page-banner.png"
                overlayOpacity={data.hero.overlayOpacity}
                vi={{
                    badge: resolveLocalized(data.pageContent?.subtitle, "vi", "KẾT NỐI"),
          title: resolveLocalized(data.hero.title, "vi", t("contact_page.hero.title")),
      desc: ""
                }}
                en={{
                    badge: resolveLocalized(data.pageContent?.subtitle, "en", "CONNECT"),
          title: resolveLocalized(data.hero.title, "en", t("contact_page.hero.title")),
      desc: ""
                }}
            />

            {/* GRID 4 CỘT */}
            <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white relative z-10">
                <div className="mx-auto w-full max-w-[1400px] px-6">
                    {/* INFO CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
                        {/* Address */}
                        <div className="h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400 group-hover:text-[#C8102E] transition-colors">
                                <MapPin size={24} className="text-[#C8102E]" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">{isVN ? "Địa Chỉ" : "Address"}</h3>
                            {data.addresses?.list?.map((addr: string, i: number) => (
                                <p key={i} className={`text-slate-500 text-sm leading-relaxed ${i > 0 ? "mt-2" : ""}`}>{addr}</p>
                            ))}
                        </div>
                        {/* Email */}
                        <div className="h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Mail size={24} className="text-[#C8102E]" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">{isVN ? "Gửi Email" : "Email Us"}</h3>
                            {data.contactInfo?.emails?.map((email: string, i: number) => (
                                <p key={i} className={`text-slate-500 text-sm leading-relaxed ${i > 0 ? "mt-2" : ""}`}>{email}</p>
                            ))}
                        </div>
                        {/* Phone */}
                        <div className="h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Phone size={24} className="text-[#C8102E]" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">{isVN ? "Gọi Ngay" : "Call Now"}</h3>
                            {data.contactInfo?.hotlines?.map((phone: string, i: number) => (
                                <a key={i} href={`tel:${phone.replace(/[^0-9+]/g, "")}`} onClick={handleCallClick} className={`text-slate-500 text-sm leading-relaxed hover:text-[#C8102E] ${i > 0 ? "mt-2" : ""}`}>{phone}</a>
                            ))}
                        </div>
                        {/* Social Networks */}
                        <div className="h-full bg-white rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 p-10 flex flex-col items-center text-center transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <MessageCircle size={24} className="text-[#C8102E]" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">{isVN ? "Kênh Trực Tuyến" : "Online Channels"}</h3>
                            <div className="flex flex-col gap-2 w-full">
                                {["zalo", "whatsapp", "telegram"].map((key) => {
                                    const channel = data.quickChannels?.[key];
                                    if (!channel?.enabled) return null;
                                    return (
                                        <a key={key} href={getSocialLink(key) || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#C8102E] text-sm leading-relaxed transition-colors font-medium">
                                            {channel.label || key}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORM SECTION (NẰM PHÍA TRÊN MAP) */}
            <section className="w-full bg-white pb-16 md:pb-24 pt-4 md:pt-8 flex justify-center">
                <div className="w-full max-w-4xl px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1930] mb-4 tracking-tight">
                            {resolveLocalized(data.pageContent?.title, currentLocale, isVN ? "Bạn Cần Hỗ Trợ?" : "Have Any Question?")}
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            {resolveLocalized(data.pageContent?.description, currentLocale, isVN ? "Hãy để lại thông tin, đội ngũ kỹ thuật của Maintech sẽ liên hệ và tư vấn giải pháp tối ưu nhất cho bạn." : "Regardless of your request for maintenance, spare parts or advice on new solutions, Maintech's engineering team is always ready to accompany your business.")}
                        </p>
                    </div>

                    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-12 w-full rounded-sm">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-12 text-green-600">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Send size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">{isVN ? "Gửi Thành Công!" : "Successfully Sent!"}</h3>
                                <p className="text-slate-500 mt-2 text-center">
                                    {isVN ? "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất." : "We will get back to you as soon as possible."}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required 
                                        placeholder={isVN ? "Tên của bạn *" : "Your Name *"} 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required 
                                        placeholder={isVN ? "Email của bạn *" : "Your Email *"} 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        name="phone"
                                        required
                                        placeholder={isVN ? "Số điện thoại *" : "Phone Number *"} 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700"
                                    />
                                </div>
                                <div>
                                    <select name="service_interest" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all text-slate-500 appearance-none">
                                        <option value="">{isVN ? "Dịch vụ quan tâm" : "Services"}</option>
                                        <option value="Bảo trì & Sửa chữa">{isVN ? "Bảo trì & Sửa chữa" : "Maintenance & Repair"}</option>
                                        <option value="Cung cấp phụ tùng">{isVN ? "Cung cấp phụ tùng" : "Spare Parts"}</option>
                                        <option value="Giải pháp tự động hóa">{isVN ? "Giải pháp tự động hóa" : "Automation Solutions"}</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <textarea 
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder={isVN ? "Nội dung tin nhắn..." : "Message..."} 
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] outline-none transition-all placeholder:text-slate-400 text-slate-700 resize-none"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 flex justify-center mt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="bg-[#C8102E] hover:bg-[#9a0c22] text-white px-10 py-4 font-bold uppercase tracking-wider transition-colors min-w-[200px] flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            isVN ? "Gửi Liên Hệ" : "Get In Touch"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="h-[500px] border-t border-slate-100">
                <iframe
                    src={data.addresses.mapUrl || "https://maps.google.com/maps?q=Maintech+Vietnam+%C4%90%E1%BB%93ng+Nai&output=embed&z=15"}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Maintech Vietnam Locations"
                    className="grayscale hover:grayscale-0 transition-all duration-1000"
                />
            </section>
        </div>
    );
}
