// 📍 File: src/components/AboutPublicContent.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck, Target, TrendingUp, Maximize2,
    X, Users, Briefcase, Award, Scale, ChevronRight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PartnersStrip from "./PartnersStrip";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node || started) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setStarted(true);
            observer.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                if (progress < 1) {
                    setValue(Math.round(target * eased));
                    requestAnimationFrame(tick);
                } else {
                    setValue(target);
                }
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.35 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [duration, started, target]);

    return <span ref={ref}>{value}</span>;
}

function safeCssColor(value: unknown, fallback: string) {
    return typeof value === "string" && (/^#[0-9a-f]{3,8}$/i.test(value) || /^(rgb|hsl)a?\(/i.test(value)) ? value : fallback;
}

export default function AboutPublicContent({ data, certs, partners, categories }: any) {
    const { language, t } = useLanguage();
    const isVN = language === "VN";
    const fallbackIntroImage = "/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png";
    const [introImage, setIntroImage] = useState(data?.imageUrl || fallbackIntroImage);
    const [selectedCert, setSelectedCert] = useState<{ img: string; title: string } | null>(null);
    const [activeTab, setActiveTab] = useState<string>("");

    const sortedCerts = [...(certs || [])]
        .filter((c: any) => c.status === "HIỂN THỊ")
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    // Get categories that actually have active certificates, in their database order
    const activeCats = (categories || [])
        .filter((cat: any) => {
            return sortedCerts.some((c: any) => c.desc_vi === cat.title_vi);
        });

    const certCategories = activeCats.map((cat: any) => {
        return isVN ? cat.title_vi : (cat.title_en || cat.title_vi);
    });

    const currentTab = activeTab || certCategories[0] || "";

    const currentCatObj = activeCats.find((cat: any) => {
        const catName = isVN ? cat.title_vi : (cat.title_en || cat.title_vi);
        return catName === currentTab;
    });

    const filteredCerts = sortedCerts.filter((c: any) => c.desc_vi === currentCatObj?.title_vi);

    // 🚀 ĐỒNG BỘ TRÁNH FALLBACK NẾU CMS ĐÃ CÓ DỮ LIỆU
    const titleVal = ((data ? (isVN ? (data.title ?? "") : (data.title_en ?? data.title ?? "")) : "") || "").trim() || (isVN ? "Giải pháp kỹ thuật phù hợp cho doanh nghiệp" : "Technical solutions for your business");
    const introBadgeVal = ((data ? (isVN ? (data.intro_badge ?? "") : (data.intro_badge_en ?? data.intro_badge ?? "")) : "") || "").trim() || (isVN ? "GIỚI THIỆU" : "ABOUT US");

    const content1Val = ((data ? (isVN ? (data.intro_content_1 ?? "") : (data.intro_content_1_en ?? data.intro_content_1 ?? "")) : "") || "").trim() || (isVN ? "Maintech Vietnam cung cấp thiết bị, phụ tùng và dịch vụ kỹ thuật cho cảng biển, nhà máy và các lĩnh vực công nghiệp." : "Maintech Vietnam provides equipment, spare parts and technical services for ports, factories and industrial facilities.");
    const content2Val = ((data ? (isVN ? (data.intro_content_2 ?? "") : (data.intro_content_2_en ?? data.intro_content_2 ?? "")) : "") || "").trim() || (isVN ? "Từ khảo sát, tư vấn, thiết kế đến lắp đặt, chạy thử và bảo trì, đội ngũ kỹ sư Maintech đồng hành cùng khách hàng bằng giải pháp an toàn, phù hợp thực tế và tối ưu hiệu quả vận hành." : "From survey and consulting to design, installation, commissioning and maintenance, Maintech engineers deliver safe, practical solutions that improve operational performance.");

    const visionVal = data ? (isVN ? (data.vision ?? "") : (data.vision_en ?? data.vision ?? "")) : "";

    const missionVal = data ? (isVN ? (data.mission ?? "") : (data.mission_en ?? data.mission ?? "")) : "";

    let legalInfo = { 
        tax_id: "370288844", representative_name: "Nguyễn Đình Thanh", representative_title: "Giám đốc", representative_name_en: "Nguyen Dinh Thanh", representative_title_en: "Director",
        partners_desc_vi: "", partners_desc_en: "",
        stat_years: 15, stat_projects: 500,
        core_values: "", core_values_en: "", legal_desc: "", legal_desc_en: "", established_year: "2020", core_business: "Dịch vụ kỹ thuật công nghiệp", core_business_en: "Industrial Technical Services", compliance_title: "Tuân thủ & Trách nhiệm", compliance_title_en: "Compliance & Responsibility", compliance_desc: "", compliance_desc_en: "", compliance_hotline: "tel:0918458399", section_badge_color: "#0f172a", legal_badge: "", legal_badge_en: "", legal_title: "", legal_title_en: "", legal_badge_visible: true,
        cta_active: false, cta_badge: "", cta_badge_en: "", cta_title: "", cta_title_en: "",
        cta_desc: "", cta_desc_en: "", cta_btn_text: "", cta_btn_text_en: "", cta_btn_link: ""
    };

    let scrollSpeed = 60;

    if (data) {
        try {
            if (data.content) {
                const parsed = JSON.parse(data.content);
                legalInfo.tax_id = String(parsed.tax_id || legalInfo.tax_id);
                legalInfo.representative_name = String(parsed.representative_name || legalInfo.representative_name);
                legalInfo.representative_title = String(parsed.representative_title || legalInfo.representative_title);
                legalInfo.representative_name_en = String(parsed.representative_name_en || legalInfo.representative_name_en);
                legalInfo.representative_title_en = String(parsed.representative_title_en || legalInfo.representative_title_en);
                legalInfo.partners_desc_vi = parsed.partners_desc_vi ?? "";
                legalInfo.partners_desc_en = parsed.partners_desc_en ?? "";
                legalInfo.stat_years = Number(parsed.stat_years) || 15;
                legalInfo.stat_projects = Number(parsed.stat_projects) || 500;
                legalInfo.core_values = parsed.core_values ?? "";
                legalInfo.core_values_en = parsed.core_values_en ?? "";
                legalInfo.legal_desc = parsed.legal_desc ?? "";
                legalInfo.legal_desc_en = parsed.legal_desc_en ?? "";
                legalInfo.legal_badge = parsed.legal_badge ?? "";
                legalInfo.legal_badge_en = parsed.legal_badge_en ?? "";
                legalInfo.legal_title = parsed.legal_title ?? "";
                legalInfo.legal_title_en = parsed.legal_title_en ?? "";
                legalInfo.cta_active = parsed.cta_active !== undefined ? parsed.cta_active : true;
                legalInfo.cta_badge = parsed.cta_badge ?? "";
                legalInfo.cta_badge_en = parsed.cta_badge_en ?? "";
                legalInfo.cta_title = parsed.cta_title ?? "";
                legalInfo.cta_title_en = parsed.cta_title_en ?? "";
                legalInfo.cta_desc = parsed.cta_desc ?? "";
                legalInfo.cta_desc_en = parsed.cta_desc_en ?? "";
                legalInfo.cta_btn_text = parsed.cta_btn_text ?? "";
                legalInfo.cta_btn_text_en = parsed.cta_btn_text_en ?? "";
                legalInfo.cta_btn_link = parsed.cta_btn_link ?? "";
                
                if (parsed.partner_scroll_speed) {
                    scrollSpeed = Math.min(Math.max(Number(parsed.partner_scroll_speed), 20), 150);
                }
            }
        } catch (e) {
            console.error("Failed to parse data.content:", e);
        }
    }

    const validPartners = (partners || [])
        .filter((p: any) => p.status === "HIỂN THỊ")
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    let singleSet = [...validPartners];
    if (validPartners.length > 0) {
        while (singleSet.length < 10) singleSet = [...singleSet, ...validPartners];
    }
    const displayPartners = [...singleSet, ...singleSet];

    /*
        t("about_page.badges.iso") || "ISO 9001:2015",
        t("about_page.badges.kalmar") || (isVN ? "Chứng chỉ Kalmar" : "Kalmar Certificate"),
        t("about_page.badges.gottwald") || (isVN ? "Chứng chỉ Gottwald" : "Gottwald Certificate"),
        t("about_page.badges.vcci") || (isVN ? "Thành viên VCCI" : "VCCI Member")
    ]; */

    return (
        <div className="bg-white font-sans">

            {/* ── 1. GIỚI THIỆU (ABB STYLE) ─────────────────────────────────────── */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                        {/* Text Content */}
                        <motion.div className="order-2 text-center lg:order-1" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <div className="mb-6">
                                <span className="mb-2 block text-center text-xs font-bold uppercase tracking-wider text-red-600 md:text-sm">{introBadgeVal || (isVN ? "GIỚI THIỆU" : "ABOUT US")}</span>
                            </div>
                            
                            <h2 className="mb-8 text-center text-2xl font-black uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                {titleVal}
                            </h2>

                            <div className="mx-auto mb-12 max-w-2xl space-y-6 text-center text-lg font-medium leading-relaxed text-slate-500">
                                {content1Val && <p className="whitespace-pre-wrap">{content1Val}</p>}
                                {content2Val && <p className="whitespace-pre-wrap">{content2Val}</p>}
                                {(isVN ? legalInfo.representative_name : (legalInfo.representative_name_en || legalInfo.representative_name)) && (
                                    <p className="pt-4 text-sm font-bold text-slate-900">
                                        {isVN ? legalInfo.representative_name : (legalInfo.representative_name_en || legalInfo.representative_name)}
                                        {(isVN ? legalInfo.representative_title : (legalInfo.representative_title_en || legalInfo.representative_title)) && <span className="ml-2 font-medium text-slate-400">— {isVN ? legalInfo.representative_title : (legalInfo.representative_title_en || legalInfo.representative_title)}</span>}
                                    </p>
                                )}
                            </div>

                            {false && <Link href="/contact" className="group flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-slate-900 hover:text-[#C8102E] transition-colors border-b-2 border-slate-900 hover:border-[#C8102E] pb-2 w-fit">
                                {isVN ? "LIÊN HỆ" : "CONTACT US"} <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </Link>}
                        </motion.div>

                        {/* Image & Stats Overlay */}
                        <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative order-1 lg:order-2 min-h-[420px] md:min-h-[520px] p-4">
                            <div className="absolute inset-4 border-2 border-[#C8102E]/70 rounded-[2rem] translate-x-4 translate-y-4 pointer-events-none" />
                            <div className="relative z-10 h-full min-h-[420px] md:min-h-[520px] overflow-hidden rounded-[2rem] group bg-slate-100 shadow-2xl">
                                    {introImage && (
                                        <Image
                                            src={introImage}
                                            alt={isVN ? "Đội ngũ Maintech triển khai thiết bị cảng" : "Maintech port equipment engineering team"}
                                            fill
                                            onError={() => setIntroImage(fallbackIntroImage)}
                                            className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                                        />
                                    )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            </div>

                            {/* Floating High-Impact Stat */}
                            <div className="absolute -bottom-8 -left-2 md:-left-8 z-20 rounded-2xl border border-slate-100 bg-white p-5 md:p-7 shadow-2xl">
                                <div className="grid grid-cols-2 gap-5 md:gap-8">
                                    <div>
                                        <p className="text-5xl font-semibold text-[#C8102E] tracking-tighter leading-none"><AnimatedCounter target={15} />+</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-2">{isVN ? "NĂM KINH NGHIỆM" : "YEARS OF EXPERIENCE"}</p>
                                    </div>
                                    <div>
                                        <p className="text-5xl font-semibold text-slate-900 tracking-tighter leading-none"><AnimatedCounter target={500} />+</p>
                                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-2">{isVN ? "DỰ ÁN HOÀN THÀNH" : "COMPLETED PROJECTS"}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 🚀 ĐỐI TÁC CHIẾN LƯỢC — Khẳng định vị thế */}
                {Array.isArray(partners) && partners.length > 0 && <div className="mt-20 border-y border-slate-100">
                    <PartnersStrip partners={partners} config={{ partners: { desc_vi: legalInfo.partners_desc_vi || "ĐỒNG HÀNH CÙNG CÁC TẬP ĐOÀN HÀNG ĐẦU THẾ GIỚI", desc_en: legalInfo.partners_desc_en || "PARTNERING WITH LEADING GLOBAL CORPORATIONS" } }} />
                </div>}
            </section>

            {/* ── 2. VISION & VALUES (GRID STYLE) ──────────────────── */}
            <section className="bg-[#f8fafc] py-24 md:py-28">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
                        {[
                            { icon: <TrendingUp size={24} />, label: isVN ? "Tầm nhìn" : "Vision", text: visionVal || (isVN ? "Trở thành đối tác kỹ thuật tin cậy, dẫn đầu về chất lượng và năng lực trong lĩnh vực công nghiệp." : "To become a trusted technical partner, leading in quality and capability across industrial sectors.") },
                            { icon: <Target size={24} />, label: isVN ? "Sứ mệnh" : "Mission", text: missionVal || (isVN ? "Mang đến giải pháp kỹ thuật an toàn, hiệu quả và bền vững cho khách hàng." : "Deliver safe, efficient and sustainable technical solutions for every customer.") },
                            { icon: <ShieldCheck size={24} />, label: isVN ? "Giá trị cốt lõi" : "Core Values", text: (isVN ? legalInfo.core_values : (legalInfo.core_values_en || legalInfo.core_values)) || (isVN ? "An toàn — Tin cậy — Đổi mới — Hiệu suất" : "Safety — Reliability — Innovation — Performance") },
                        ].map((box, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_6px_20px_rgba(7,27,73,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-[0_14px_30px_rgba(7,27,73,0.09)] md:p-8">
                                <div className="absolute left-0 top-0 h-1 w-16 bg-[#C8102E] transition-all duration-300 group-hover:w-24" />
                                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8102E]/15 bg-[#fff5f7] text-[#C8102E] transition-transform duration-300 group-hover:scale-105">
                                    {box.icon}
                                </div>
                                <div>
                                    <h4 className="mb-3 text-[17px] font-extrabold uppercase tracking-[0.02em] text-[#071b49]">{box.label}</h4>
                                    <p className="text-[14px] leading-7 text-slate-600">{box.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. LEGAL & CORPORATE ──────────────────────────── */}
            <section className="relative overflow-hidden bg-white py-20">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                        
                        <div className="mx-auto w-full max-w-4xl lg:col-span-12">
                            <div className="mb-6 flex items-center justify-center text-center">
                                {legalInfo.legal_badge_visible !== false && (isVN ? legalInfo.legal_badge : (legalInfo.legal_badge_en || legalInfo.legal_badge)) && <span className="mb-2 block text-center text-xs font-bold uppercase tracking-wider text-red-600 md:text-sm">{isVN ? legalInfo.legal_badge : (legalInfo.legal_badge_en || legalInfo.legal_badge)}</span>}
                                </div>
                            {(isVN ? legalInfo.legal_title : (legalInfo.legal_title_en || legalInfo.legal_title)) && <h3 className="mb-10 text-center text-3xl font-black uppercase leading-tight tracking-tight text-slate-900 md:text-4xl">{isVN ? legalInfo.legal_title : (legalInfo.legal_title_en || legalInfo.legal_title)}</h3>}

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {[
                                    { title: isVN ? "Mã số thuế" : "Tax ID", value: legalInfo.tax_id },
                                    { title: isVN ? "Đại diện pháp luật" : "Legal Representative", value: isVN ? legalInfo.representative_name : "Mr. Nguyen Dinh Thanh", subtitle: isVN ? legalInfo.representative_title : "Director" },
                                    { title: isVN ? "Năm thành lập" : "Year Established", value: legalInfo.established_year },
                                    { title: isVN ? "Lĩnh vực cốt lõi" : "Core Business", value: isVN ? legalInfo.core_business : legalInfo.core_business_en },
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex min-h-[125px] h-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-md">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#C8102E] text-white transition-transform duration-300 group-hover:scale-105">{(() => { const Icon = [ShieldCheck, Users, Target, Briefcase][idx] || ShieldCheck; return <Icon size={22} strokeWidth={1.8} />; })()}</div>
                                        <div className="min-w-0">
                                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">{item.title}</p>
                                        <p className="break-words text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-[#C8102E]">{item.value || "—"}</p>
                                        {item.subtitle && <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#C8102E]">{item.subtitle}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C8102E]/20 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
                            <div className="relative z-10">
                                <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C8102E]/30 bg-[#C8102E]/15 text-[#ff536b] shadow-[0_0_28px_rgba(200,16,46,0.3)]"><span className="absolute inset-2 rounded-xl bg-[#C8102E]/10 blur-md" /><Scale size={32} className="relative" /></div>
                                <h4 className="mb-5 max-w-xs text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl">
                                    {(isVN ? legalInfo.compliance_title : legalInfo.compliance_title_en) || (isVN ? "Tuân thủ & Trách nhiệm" : "Compliance & Responsibility")}
                                </h4>
                                <p className="mb-8 max-w-md text-sm font-medium leading-7 text-slate-400 whitespace-pre-wrap">
                                    {(isVN ? (legalInfo.compliance_desc || legalInfo.legal_desc) : (legalInfo.compliance_desc_en || legalInfo.legal_desc_en || legalInfo.legal_desc)) || (isVN ? "Chúng tôi cam kết tuân thủ mọi quy định pháp luật và tiêu chuẩn kỹ thuật an toàn lao động nghiêm ngặt nhất." : "We are committed to complying with all laws and the most stringent occupational safety technical standards.")}
                                </p>
                                <div className="hidden">
                                    {isVN ? "Hotline pháp lý" : "Legal Hotline"}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 4. CHỨNG CHỈ (MODERN GRID) ─────────────────────────────────────── */}
            {certCategories.length > 0 && (
                <section className="py-32 bg-white">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                        
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <span className="mb-2 block text-center text-xs font-bold uppercase tracking-wider text-red-600 md:text-sm">
                                {isVN ? "CHỨNG NHẬN CHUYÊN MÔN" : "PROFESSIONAL CERTIFICATIONS"}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-8">
                                {isVN ? "Năng Lực Cốt Lõi & Chứng Chỉ Kỹ Thuật Quốc Tế" : "Core Competencies & International Technical Certificates"}
                            </h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-3xl mx-auto">
                                {isVN 
                                    ? "Tự hào sở hữu đội ngũ chuyên gia đạt chứng chỉ quốc tế từ các hãng thiết bị hàng đầu như Kalmar, Gottwald và Hänel. Maintech VN cam kết mang đến giải pháp thiết kế, lắp ráp và bảo trì thiết bị cảng, máy móc F&B và hệ thống nâng hạ với độ an toàn và hiệu suất tối ưu nhất."
                                    : "Proudly owning a team of experts with international certificates from leading equipment manufacturers such as Kalmar, Gottwald, and Hänel. Maintech VN is committed to providing design, assembly, and maintenance solutions for port equipment, F&B machinery, and lifting systems with the highest safety and optimal performance."
                                }
                            </p>
                        </div>

                        {/* Tab Bar (Centered ABB Style) */}
                        <div className="flex flex-wrap justify-center gap-2 mb-16">
                                {certCategories.map((cat) => (
                                    <button key={cat} onClick={() => setActiveTab(cat)}
                                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                                            currentTab === cat
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredCerts.map((cert: any) => (
                                    <motion.div key={cert.id} layout
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        onClick={() => setSelectedCert({ img: cert.imageUrl, title: isVN ? cert.title_vi : (cert.title_en || cert.title_vi) })}
                                        className="rounded-2xl bg-white p-5 md:p-7 border border-slate-200 hover:border-[#C8102E]/40 transition-all duration-300 cursor-zoom-in group shadow-sm hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="aspect-[3/4] mb-5 relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-4">
                                            {cert.imageUrl && (
                                                <Image
                                                    src={cert.imageUrl}
                                                    alt={isVN ? cert.title_vi : (cert.title_en || cert.title_vi)}
                                                    fill
                                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center group-hover:text-slate-900 transition-colors">{isVN ? cert.title_vi : (cert.title_en || cert.title_vi)}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>
            )}
            {/* ── 5. CTA TIẾP CẬN ────────────────────────────────────────── */}
            {false && legalInfo.cta_active !== false && (legalInfo.cta_btn_text || legalInfo.cta_btn_text_en) && (
                <section className="py-32 bg-white border-t border-slate-100">
                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-premium-red text-[11px] font-medium uppercase tracking-[0.2em] mb-6 block">
                                {isVN ? legalInfo.cta_badge : (legalInfo.cta_badge_en || legalInfo.cta_badge)}
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 max-w-4xl mx-auto uppercase">
                                {isVN ? legalInfo.cta_title : (legalInfo.cta_title_en || legalInfo.cta_title)}
                            </h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-12">
                                {isVN ? legalInfo.cta_desc : (legalInfo.cta_desc_en || legalInfo.cta_desc)}
                            </p>
                            <Link href={legalInfo.cta_btn_link || "/contact"} className="inline-flex items-center gap-3 bg-[#C8102E] hover:bg-[#b00e28] text-white font-semibold text-xs uppercase tracking-wide px-10 py-5 rounded-sm shadow-md transition-all hover:scale-105 active:scale-95 group">
                                {isVN ? legalInfo.cta_btn_text : (legalInfo.cta_btn_text_en || legalInfo.cta_btn_text)}
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
                        onClick={() => setSelectedCert(null)}
                    >
                        <button className="absolute top-10 right-10 text-white hover:text-premium-red drop-shadow-md transition-colors">
                            <X size={48} />
                        </button>
                        <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            src={selectedCert.img}
                            className="max-w-full max-h-full object-contain shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
