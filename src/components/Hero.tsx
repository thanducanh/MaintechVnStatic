// 📍 File: src/components/Hero.tsx
"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown, Cpu, Wrench, Package, Globe, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SolutionExplorer from "./SolutionExplorer";
import { useLanguage } from "@/context/LanguageContext";


export default function Hero({ config }: { config?: any }) {
    const [isExplorerOpen, setIsExplorerOpen] = useState(false);
    const { language, t } = useLanguage();
    const isVN = language === "VN";
    // Keep SSR and the first client render deterministic; load the banner after mount.
    const [currentBg, setCurrentBg] = useState<string>("");

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        // Fallback for now if no config provided
        setCurrentBg("");
    }, []);

    // Resolve CMS properties
    const hasConfig = !!config && !!config.hero;
    
    const badgeText = hasConfig 
        ? ((isVN ? config.hero.badge_vi : config.hero.badge_en) || ("MAINTECH INDUSTRIAL SOLUTIONS"))
        : ("MAINTECH INDUSTRIAL SOLUTIONS");

    const title1 = hasConfig 
        ? (isVN ? config.hero.title1_vi : config.hero.title1_en)
        : "Nâng tầm hiệu suất";

    const title2 = hasConfig 
        ? (isVN ? config.hero.title2_vi : config.hero.title2_en)
        : "Công nghiệp hiện đại";

    const description = hasConfig 
        ? (isVN ? config.hero.desc_vi : config.hero.desc_en)
        : "MAINTECHVN - Đối tác tin cậy trong cung cấp thiết bị, giải pháp kỹ thuật và dịch vụ bảo trì cho các ngành công nghiệp.";

    const btn1Text = hasConfig 
        ? (isVN ? config.hero.btn1_text_vi : config.hero.btn1_text_en)
        : t("hero.explore");

    const btn1Link = hasConfig ? config.hero.btn1_link : "";

    const btn2Text = hasConfig 
        ? (isVN ? config.hero.btn2_text_vi : config.hero.btn2_text_en)
        : t("nav.about");

    const btn2Link = hasConfig ? (config.hero.btn2_link || "/about") : "/about";

    // Resolve background image
    const cmsBgImage = hasConfig && config.hero.backgroundImage ? config.hero.backgroundImage : null;
    const bgImageToUse = cmsBgImage || currentBg || "/images/maintech-page-banner.png";

    // Resolve overlay opacity
    const overlayOpacity = hasConfig && typeof config.hero.overlayOpacity === 'number'
        ? config.hero.overlayOpacity
        : 0.6; // default 0.6

    // Resolve background video
    const videoUrl = hasConfig && config.hero.videoUrl ? config.hero.videoUrl : null;
    const showVideo = !!videoUrl && !videoError;
    const sliderImages = hasConfig && Array.isArray(config.hero.sliderImages)
        ? config.hero.sliderImages.filter(Boolean).slice(0, 5)
        : [];
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (showVideo || sliderImages.length < 2) return;
        const timer = window.setInterval(() => setActiveSlide((index) => (index + 1) % sliderImages.length), 5000);
        return () => window.clearInterval(timer);
    }, [showVideo, sliderImages.length]);

    const togglePlayPause = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(err => console.error("Video playback failed", err));
            setIsPlaying(true);
        }
    };

    const safeTitle1 =
      typeof title1 === "string" && title1.trim().length > 0
        ? title1
        : "KỸ THUẬT CHUYÊN BIỆT";

    const safeTitle2 =
      typeof title2 === "string" && title2.trim().length > 0
        ? title2
        : "HIỆU SUẤT TỐI ƯU";

    return (
        <section className="relative flex h-screen min-h-[750px] flex-col items-center justify-center overflow-hidden bg-[#0B0F19]">

            {/* 🚀 BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    {showVideo ? (
                        <motion.div
                            key="video-banner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <video
                                ref={videoRef}
                                src={videoUrl}
                                poster={bgImageToUse || undefined}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onError={() => setVideoError(true)}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Premium left-to-right gradient overlay matching PageBanner style for maximum readability & aesthetic balance */}
                            <div 
                                className="absolute inset-0 transition-all duration-500 z-10 pointer-events-none" 
                                style={{
                                    background: `linear-gradient(to bottom, rgba(2,6,23,${Math.min(0.96, overlayOpacity * 1.45)}) 0%, rgba(2,6,23,${Math.min(0.86, overlayOpacity * 0.95)}) 100%)`,
                                }}
                            />
                        </motion.div>
                    ) : sliderImages.length > 0 ? (
                        <AnimatePresence mode="sync">
                            <motion.div key={sliderImages[activeSlide]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
                                <Image src={sliderImages[activeSlide]} alt="Maintech Industrial" fill priority={activeSlide === 0} className="object-cover" />
                                <div className="absolute inset-0 transition-all duration-500 z-10 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(2,6,23,${Math.min(0.96, overlayOpacity * 1.45)}) 0%, rgba(2,6,23,${Math.min(0.86, overlayOpacity * 0.95)}) 100%)` }} />
                            </motion.div>
                        </AnimatePresence>
                    ) : bgImageToUse ? (
                        <motion.div
                            key="banner"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={bgImageToUse}
                                alt="Maintech Global"
                                fill
                                priority
                                className="object-cover"
                            />
                            {/* Premium left-to-right gradient overlay matching PageBanner style for maximum readability & aesthetic balance */}
                            <div 
                                className="absolute inset-0 transition-all duration-500 z-10 pointer-events-none" 
                                style={{
                                    background: `linear-gradient(to bottom, rgba(2,6,23,${Math.min(0.96, overlayOpacity * 1.45)}) 0%, rgba(2,6,23,${Math.min(0.86, overlayOpacity * 0.95)}) 100%)`,
                                }}
                            />
                        </motion.div>
                    ) : (
                        <div className="absolute inset-0 bg-slate-900" />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
            </div>

            {/* 🚀 CONTENT LAYER */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto flex max-w-5xl flex-col items-center text-center"
                >
                    {/* Top Accent */}
                    {badgeText && (
                        <div className="mb-8 text-center">
                            <span className="block text-sm font-bold uppercase tracking-wider text-white">
                                {badgeText}
                            </span>
                        </div>
                    )}

                    {/* Headline */}
                    <div className="relative mb-10">
                        <h1 className="text-[26px] md:text-[38px] lg:text-[46px] xl:text-[54px] font-black text-white leading-[1.02] tracking-[-0.03em] max-w-5xl [text-shadow:_0_2px_4px_rgba(0,0,0,0.15)]">
                            {safeTitle1.split(" ").map((word: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block mr-[0.2em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                            {safeTitle2 && (
                                <>
                                    <br />
                                    <span className="text-[#C8102E] block mt-2 font-black">
                                        {safeTitle2.split(" ").map((word: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                                className="inline-block mr-[0.2em]"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </span>
                                </>
                            )}
                        </h1>
                    </div>

                    {/* Subheadline */}
                    {description && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-white/80 text-sm md:text-[17px] font-normal max-w-2xl mb-12 leading-relaxed tracking-normal"
                        >
                            {description}
                        </motion.p>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap justify-center gap-5">
                        {btn1Text && (
                            btn1Link ? (
                                <Link
                                    href={btn1Link}
                                    className="flex items-center gap-3 rounded-md bg-[#C8102E] px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#A00D25] group"
                                >
                                    {btn1Text}
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setIsExplorerOpen(true)}
                                    className="bg-[#C8102E] hover:bg-[#b00e28] text-white px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-3 group"
                                >
                                    {btn1Text}
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            )
                        )}

                        {btn2Text && (
                            <Link
                                href={btn2Link}
                                className="bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/10 backdrop-blur-md px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-3"
                            >
                                {btn2Text}
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Play/Pause Button for background video */}
            {showVideo && (
                <div className="absolute bottom-10 right-10 z-30 flex items-center justify-center">
                    <button
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? "Tạm dừng video nền" : "Phát video nền"}
                        className="w-12 h-12 rounded-full bg-[#C8102E] hover:bg-[#b00e28] text-white flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/10"
                    >
                        {isPlaying ? (
                            <Pause size={20} className="fill-current stroke-[1.5]" />
                        ) : (
                            <Play size={20} className="fill-current translate-x-[1px] stroke-[1.5]" />
                        )}
                    </button>
                </div>
            )}

            {/* Solution Explorer Modal */}
            <SolutionExplorer isOpen={isExplorerOpen} onClose={() => setIsExplorerOpen(false)} />
        </section>
    );
}
