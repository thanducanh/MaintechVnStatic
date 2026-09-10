"use client";

import { useLanguage } from "@/context/LanguageContext";

interface LocalizedBannerContentProps {
    vi: {
        badge: string;
        title: string;
        desc: string;
    };
    en: {
        badge: string;
        title: string;
        desc: string;
    };
}

export default function LocalizedBannerContent({ vi, en }: LocalizedBannerContentProps) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    const data = isVN ? vi : en;

    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-premium-red" />
                <span className="text-premium-red drop-shadow-md text-[10px] font-black uppercase tracking-[0.5em]">{data.badge}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">{data.title}</h1>
            <p className="text-slate-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase opacity-90 max-w-xl">{data.desc}</p>
        </div>
    );
}
