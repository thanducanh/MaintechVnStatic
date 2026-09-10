// src/components/PartnersStrip.tsx
"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function PartnersStrip({ partners, config }: { partners?: any[]; config?: any }) {
    const { language } = useLanguage();
    const isVN = language === 'VN';

    const activePartners = (partners || [])
        .filter((p: any) => p.status === "HIỂN THỊ")
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    if (!activePartners || activePartners.length === 0) return null;

    // Resolve CMS properties
    const hasConfig = !!config && !!config.partners;

    const descText = hasConfig
        ? (isVN ? config.partners.desc_vi : config.partners.desc_en)
        : (isVN ? "ĐỒNG HÀNH CÙNG CÁC TẬP ĐOÀN HÀNG ĐẦU THẾ GIỚI" : "PARTNERING WITH LEADING GLOBAL CORPORATIONS");

    // Duplicate for infinite scroll effect
    let doubled = [...activePartners];
    while (doubled.length < 20) {
        doubled = [...doubled, ...activePartners];
    }
    const finalSet = [...doubled, ...doubled];

    return (
        <section className="py-16 bg-white border-y border-slate-100 overflow-hidden font-sans">
            <div className="w-full px-6 md:px-12 lg:px-24 mb-10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {descText && (
                        <p className="text-slate-900 text-[11px] font-bold uppercase tracking-[0.2em]">
                            {descText}
                        </p>
                    )}
                </div>
            </div>

            {/* Scrolling logos */}
            <div className="relative flex overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-20 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
                >
                    {finalSet.map((p: any, idx: number) => {
                        const logoContent = p.imageUrl && (
                            <Image
                                src={p.imageUrl}
                                alt={p.title_vi || p.title || "Partner"}
                                fill
                                className="object-contain mix-blend-multiply transition-transform duration-300 ease-in-out group-hover/logo:scale-110"
                                sizes="200px"
                            />
                        );

                        return p.summary ? (
                            <a
                                key={idx}
                                href={p.summary}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 h-14 w-40 relative flex items-center justify-center transition-all duration-700 cursor-pointer group/logo bg-transparent border-0 shadow-none"
                            >
                                {logoContent}
                            </a>
                        ) : (
                            <div
                                key={idx}
                                className="shrink-0 h-14 w-40 relative flex items-center justify-center transition-all duration-700 group/logo bg-transparent border-0 shadow-none"
                            >
                                {logoContent}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
