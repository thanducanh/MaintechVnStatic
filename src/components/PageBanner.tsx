// 📍 File: src/components/PageBanner.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface PageBannerProps {
    pageKey?: "BANNER_ABOUT" | "BANNER_SERVICES" | "BANNER_PRODUCTS" | "BANNER_NEWS" | "BANNER_CONTACT";
    children?: React.ReactNode;
    isLight?: boolean;
    overlayColor?: string;
    customImage?: string;
    overlayOpacity?: number;
    centered?: boolean;
    vi?: { badge: string; titleTop?: string; titleHighlight?: string; title?: string; desc: string; breadcrumb?: string };
    en?: { badge: string; titleTop?: string; titleHighlight?: string; title?: string; desc: string; breadcrumb?: string };
}

export default function PageBanner({ 
    pageKey, 
    children, 
    isLight = false, 
    overlayColor,
    customImage,
    overlayOpacity,
    centered = false,
    vi,
    en
}: PageBannerProps) {
    const defaultAboutBackground = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85";
    const [bg, setBg] = useState<string>(
        customImage !== undefined
            ? (customImage || "")
            : (pageKey === "BANNER_ABOUT" ? defaultAboutBackground : "")
    );
    const { language } = useLanguage();
    const isVN = language === "VN";
    const data = isVN ? vi : en;
    const isAbout = pageKey === "BANNER_ABOUT";
    const isCentered = centered || isAbout;

    const getSplitTitle = (currentData: typeof vi | typeof en) => {
        if (!currentData) return { top: "", highlight: "" };
        // Centered page banners use one CMS title, matching the About banner.
        if (isCentered && currentData.title && !currentData.titleTop && !currentData.titleHighlight) {
            return { top: "", highlight: currentData.title };
        }
        if (currentData.titleTop || currentData.titleHighlight) {
            return { 
                top: currentData.titleTop || "", 
                highlight: currentData.titleHighlight || "" 
            };
        }
        
        const title = currentData.title || "";
        const lowerTitle = title.toLowerCase();

        // 🚀 SMART SPLITTING ALGORITHM FOR BACKWARD COMPATIBILITY / CMS STRINGS
        if (lowerTitle.includes("về chúng tôi") || lowerTitle.includes("giới thiệu") || lowerTitle.includes("about us")) {
            if (isAbout) return { top: "", highlight: title || (isVN ? "Về Chúng Tôi" : "About Us") };
            return isVN 
                ? { top: "Chúng tôi là", highlight: "Maintech Việt Nam" }
                : { top: "We are", highlight: "Maintech Vietnam" };
        }
        if (lowerTitle.includes("dịch vụ") || lowerTitle.includes("services")) {
            return isVN 
                ? { top: "Dịch vụ chuyên biệt", highlight: "Giải pháp tối ưu" }
                : { top: "Specialized Services", highlight: "Optimal Solutions" };
        }
        if (lowerTitle.includes("sản phẩm") || lowerTitle.includes("products")) {
            return isVN 
                ? { top: "Sản phẩm & thiết bị", highlight: "Công nghiệp" }
                : { top: "Products & Equipment", highlight: "Industrial" };
        }
        if (lowerTitle.includes("tin tức") || lowerTitle.includes("news")) {
            return isVN 
                ? { top: "Tin tức kỹ thuật", highlight: "Dự án Maintech" }
                : { top: "Technical News", highlight: "Maintech Projects" };
        }
        if (lowerTitle.includes("liên hệ") || lowerTitle.includes("contact")) {
            return isVN 
                ? { top: "Liên hệ", highlight: "Maintech Việt Nam" }
                : { top: "Contact", highlight: "Maintech Vietnam" };
        }

        // Standard spacing based fallback
        const words = title.split(" ");
        if (words.length > 2) {
            return {
                top: words.slice(0, words.length - 2).join(" "),
                highlight: words.slice(words.length - 2).join(" ")
            };
        } else if (words.length === 2) {
            return { top: words[0], highlight: words[1] };
        }
        return { top: "", highlight: title };
    };

    useEffect(() => {
        if (customImage !== undefined) {
            setBg(customImage || "");
        } else {
            setBg(isAbout ? defaultAboutBackground : "");
        }
    }, [pageKey, customImage, isAbout]);

    const parsedOpacity = Number(overlayOpacity);
    const opacityValue = Number.isFinite(parsedOpacity) ? Math.min(1, Math.max(0, parsedOpacity)) : (isLight ? 0.2 : 1.0);
    const routeInfo = {
        BANNER_ABOUT: { vi: "Về chúng tôi", en: "About", href: "/about" },
        BANNER_SERVICES: { vi: "Dịch vụ", en: "Services", href: "/services" },
        BANNER_PRODUCTS: { vi: "Sản phẩm", en: "Products", href: "/products" },
        BANNER_NEWS: { vi: "Tin tức", en: "News", href: "/news" },
        BANNER_CONTACT: { vi: "Liên hệ", en: "Contact", href: "/contact" }
    } as const;
    const currentRoute = pageKey ? routeInfo[pageKey] : undefined;

    const { top: titleTop, highlight: titleHighlight } = getSplitTitle(data);

    return (
        <section className={`relative w-full min-h-[350px] md:min-h-[380px] flex items-center justify-center overflow-hidden ${isLight ? 'bg-white' : 'bg-[#050505]'}`}>
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0">
                {bg && (
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <img
                            src={bg}
                            alt="Banner Background"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
                
                {/* GRID OVERLAY */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} 
                />

                {/* GRADIENT / OPACITY OVERLAY */}
                <div 
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: isLight 
                            ? 'rgba(255, 255, 255, 0.2)' 
                            : `linear-gradient(to right, rgba(2,6,23,${opacityValue * 0.9 > 0.95 ? 0.95 : opacityValue * 0.9}) 0%, rgba(2,6,23,${opacityValue * 0.35}) 100%)`,
                        opacity: 1
                    }}
                />
                
                {/* NAV PROTECTION TOP GRADIENT */}
                {!isLight && (
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/95 to-transparent z-10 pointer-events-none" />
                )}
            </div>

            {/* ACCENT BAR DƯỚI CÙNG */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C8102E] z-20" />

            {/* NỘI DUNG CHỮ - LEFT ALIGNMENT & MAX-WIDTH CHUẨN NAVBAR */}
            <div className={`relative z-10 mx-auto w-full ${isCentered ? "max-w-none" : "max-w-[1400px]"} px-4 pt-20 md:px-8 md:pt-28 ${isCentered ? "text-center" : ""}`}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`flex w-full flex-col ${isCentered ? "items-center text-center" : "items-start text-left"}`}
                >
                    {data ? (
                        <>
                            {false && data?.badge && (
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-1 bg-[#C8102E]" />
                                    <span className={`${isAbout ? "text-white text-sm md:text-base font-semibold" : "text-white text-[12px] font-medium"} uppercase tracking-[0.2em]`}>{data?.badge}</span>
                                </div>
                            )}
                            <h1 className={`whitespace-nowrap ${isCentered ? "text-3xl sm:text-4xl lg:text-5xl" : "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"} mb-8 font-semibold tracking-tight leading-[1.1]`}>
                                {false && titleTop && <span className="text-white block mb-2">{titleTop}</span>}
                                {isCentered ? (
                                    <span className="block w-max max-w-none whitespace-nowrap text-white">
                                        {titleHighlight.split(/(maintech)/gi).map((part, index) =>
                                            part.toLowerCase() === "maintech" ? <span key={index} className="text-[#C8102E]">{part}</span> : part
                                        )}
                                    </span>
                                ) : (
                                    <span className="block text-[#C8102E]">{titleHighlight}</span>
                                )}
                            </h1>
                            {currentRoute && (
                                <nav aria-label="Breadcrumb" className="mt-0 mb-6 text-xs font-semibold uppercase tracking-widest text-white/80">
                                    <Link href="/" className="text-white/80 transition-colors hover:text-white">
                                        {isVN ? "Trang chủ" : "Home"}
                                    </Link>
                                    <span className="mx-3 text-base font-bold leading-none text-white/80">/</span>
                                    <Link href={currentRoute.href} className="text-white/80 transition-colors hover:text-white">
                                        {isVN ? currentRoute.vi : currentRoute.en}
                                    </Link>
                                </nav>
                            )}
                            {data.desc && (
                                <p className="text-base md:text-lg text-white/80 font-medium tracking-wide max-w-[640px] leading-relaxed">
                                    {data.desc === "Trang chủ / Tin tức" ? (
                                        <>
                                            <Link href="/" className="hover:text-white transition-colors hover:underline">Trang chủ</Link>
                                            {" / "}
                                            <Link href="/news" className="hover:text-white transition-colors hover:underline">Tin tức</Link>
                                        </>
                                    ) : data.desc === "Home / News" ? (
                                        <>
                                            <Link href="/" className="hover:text-white transition-colors hover:underline">Home</Link>
                                            {" / "}
                                            <Link href="/news" className="hover:text-white transition-colors hover:underline">News</Link>
                                        </>
                                    ) : (
                                        data.desc
                                    )}
                                </p>
                            )}
                        </>
                    ) : (
                        children
                    )}
                </motion.div>
            </div>
        </section>
    );
}
