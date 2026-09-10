"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer({ config, contactData }: { config?: any; contactData?: any }) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    const footer = config?.footer || {};
    const phone = footer.phone || contactData?.phone || "+84 918 458 399";
    const email = footer.email || contactData?.email || "maintechvietnam@gmail.com";

    const zaloValue = typeof footer.zalo === "string" ? footer.zalo.trim() : "";
    const zaloNumber = footer.zalo || "84918458399";
    const zaloHref = /^https?:\/\//i.test(zaloValue)
        ? zaloValue
        : `https://zalo.me/${String(zaloNumber).replace(/[^\d]/g, "")}`;

    const waValue = typeof footer.whatsapp === "string" ? footer.whatsapp.trim() : "";
    const waNumber = waValue || footer.hotline || phone || "84918458399";
    const cleanWaNumber = String(waNumber).replace(/[^\d+]/g, "");
    const whatsappHref = /^https?:\/\//i.test(waValue)
        ? waValue
        : cleanWaNumber.length > 10
            ? `https://wa.me/${cleanWaNumber.replace(/^\+/, "")}`
            : `tel:${cleanWaNumber}`;

    const twitterValue = typeof footer.twitter === "string" ? footer.twitter.trim() : "";
    const twitterHref = /^https?:\/\//i.test(twitterValue)
        ? twitterValue
        : `https://twitter.com/${twitterValue || "maintech"}`;



    const services = isVN ? ["Bảo trì cẩu trục", "Lắp đặt máy móc F&B", "Hệ thống điện điều khiển", "Cung cấp phụ tùng"] : ["Crane maintenance", "F&B machinery installation", "Electrical control systems", "Spare parts supply"];
    const navigation = [
        { label: isVN ? "Về chúng tôi" : "About us", href: "/about" },
        { label: isVN ? "Dịch vụ" : "Services", href: "/services" },
        { label: isVN ? "Tin tức" : "News", href: "/news" },
        { label: isVN ? "Liên hệ" : "Contact", href: "/contact" },
    ];
    const socials = [
        { label: "Zalo", href: zaloHref, external: true, content: <span className="text-base font-black">Z</span> },
        { label: "WhatsApp", href: whatsappHref, external: !whatsappHref.startsWith("tel:"), content: <MessageCircle size={21} /> },
        { label: "X", href: twitterHref, external: true, content: <Twitter size={21} /> },
    ];

    return (
        <footer id="footer-contact" className="w-full overflow-hidden border-t border-[#C8102E]/40 bg-[#070910] py-16 font-sans text-white lg:py-20">
            <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
                    <div>
                        <Link href="/" className="mb-6 inline-flex items-baseline"><span className="text-3xl font-bold text-[#C8102E]">MAIN</span><span className="text-3xl font-bold text-[#0055A5]">TECH</span><span className="ml-2 text-3xl font-bold text-white">VIETNAM</span></Link>
                        <p className="max-w-sm text-sm leading-7 text-slate-400">{isVN ? (footer.slogan_vi || "Chuyên gia kỹ thuật công nghiệp và giải pháp thiết bị toàn diện cho nhà máy.") : (footer.slogan_en || "Industrial engineering experts delivering complete equipment solutions for factories.")}</p>
                        <div className="mt-7 flex gap-3">
                            {socials.map((social) => <a key={social.label} href={social.href} {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0a0f1d] text-slate-400 transition-all duration-300 hover:bg-[#C8102E] hover:text-white hover:shadow-[0_0_18px_rgba(200,16,46,0.35)]">{social.content}</a>)}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">{isVN ? "Dịch vụ" : "Services"}</h4>
                        <ul className="space-y-4">{services.map((item) => <li key={item}><Link href="/services" className="text-sm text-slate-400 transition-colors hover:text-[#C8102E]">{item}</Link></li>)}</ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">{isVN ? "Điều hướng" : "Navigation"}</h4>
                        <ul className="space-y-4">{navigation.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-slate-400 transition-colors hover:text-[#C8102E]">{item.label}</Link></li>)}</ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">Newsletter</h4>
                        <p className="mb-5 text-sm leading-6 text-slate-400">{isVN ? "Đăng ký để nhận thông tin kỹ thuật mới nhất từ Maintech." : "Subscribe for the latest industrial updates from Maintech."}</p>
                        <form className="flex w-full border border-slate-700"><input type="email" required placeholder={isVN ? "Email của bạn" : "Your email"} className="min-w-0 flex-1 bg-[#0a0f1d] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[#C8102E]" /><button type="submit" aria-label="Subscribe" className="bg-[#C8102E] px-4 text-lg font-bold text-white transition-colors hover:bg-[#A00D25]">→</button></form>
                        <div className="mt-7 space-y-4"><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-[#C8102E]"><Phone size={18} className="text-[#C8102E]" />{phone}</a><a href={`mailto:${email}`} className="flex items-center gap-3 break-all text-sm text-slate-300 transition-colors hover:text-[#C8102E]"><Mail size={18} className="shrink-0 text-[#C8102E]" />{email}</a></div>
                    </div>
                </div>
                <div className="mt-14 flex w-full flex-col items-center justify-center gap-2 border-t border-slate-800 py-6 text-center text-slate-500"><p className="text-[11px] uppercase tracking-wider">© {footer.copyright_year || "2026"} MAINTECH VIETNAM. {isVN ? "MỌI QUYỀN ĐƯỢC BẢO LƯU." : "ALL RIGHTS RESERVED."}</p><p className="text-[10px] uppercase tracking-wider text-slate-600">{isVN ? `MST: ${footer.tax_id || "3702888448"} | Đại diện: ${footer.representative_vi || "Nguyễn Đình Thanh"}` : `Tax ID: ${footer.tax_id || "3702888448"} | Representative: ${footer.representative_en || "Nguyen Dinh Thanh"}`}</p></div>
            </div>
        </footer>
    );
}
