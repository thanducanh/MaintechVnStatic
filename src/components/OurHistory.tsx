"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRef, useState } from "react";

export default function OurHistory({ config }: { config?: any }) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    const rawHistory = config?.history || config?.ourHistory || config?.our_history;
    const history = rawHistory
        ? {
            ...rawHistory,
            desc_vi: rawHistory.desc_vi || rawHistory.description_vi || "",
            desc_en: rawHistory.desc_en || rawHistory.description_en || "",
            image: rawHistory.posterUrl || rawHistory.image || rawHistory.imageUrl || rawHistory.thumbnail || "",
            button_vi: rawHistory.button_vi || rawHistory.cta_text_vi || "",
            button_en: rawHistory.button_en || rawHistory.cta_text_en || "",
            button_link: rawHistory.button_link || rawHistory.cta_link || "/about",
            backgroundImage: rawHistory.backgroundImage || rawHistory.background_image || "",
            videoSource: rawHistory.videoSource || rawHistory.videoUrl || rawHistory.video_url || "",
            overlayOpacity: Number.isFinite(Number(rawHistory.overlayOpacity)) ? Number(rawHistory.overlayOpacity) : 85,
        }
        : null;
    if (!history) return null;
    const hasTextContent = [history.title_vi, history.title_en, history.desc_vi, history.desc_en]
        .some((value) => typeof value === "string" && value.trim() !== "");
    if (!hasTextContent) return null;

    const title = isVN ? history.title_vi : (history.title_en || history.title_vi);
    const description = isVN ? history.desc_vi : (history.desc_en || history.desc_vi);
    const button = isVN ? history.button_vi : (history.button_en || history.button_vi);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoStarted, setIsVideoStarted] = useState(false);
    const hasVideo = typeof history.videoSource === "string" && history.videoSource.trim() !== "";
    const posterImage = typeof history.image === "string" ? history.image.trim() : "";

    return (
        <section id="history" className="relative overflow-hidden bg-[#0B0F19] py-16 text-white md:py-20">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${history.backgroundImage || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80"})` }} />
            <div className="absolute inset-0 bg-black" style={{ opacity: Math.min(100, Math.max(0, history.overlayOpacity)) / 100 }} />
            <div className="relative mx-auto grid max-w-screen-2xl items-center gap-10 px-6 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-16">
                <div className="mx-auto max-w-xl text-center">
                    <div className="mb-5 block text-sm font-bold uppercase tracking-wider text-[#C8102E]">{isVN ? history.badge_vi : (history.badge_en || history.badge_vi)}</div>
                    <h2 className="mx-auto max-w-lg text-3xl font-black uppercase leading-[1.08] text-white sm:text-4xl">{title}</h2>
                    <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-slate-300">{description}</p>
                    {button && <Link href={history.button_link || "/about"} className="mt-8 inline-flex items-center gap-3 border-2 border-[#C8102E] px-7 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#C8102E] hover:text-white">{button}<ArrowRight size={16} /></Link>}
                </div>
                <div className="relative mx-auto min-h-[360px] w-full max-w-3xl lg:min-h-[440px]">
                    <div className="history-media group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border-2 border-[#C8102E] bg-slate-900 shadow-2xl" onClick={() => { if (hasVideo && !isVideoStarted) setIsVideoStarted(true); }}>
                        {hasVideo ? (
                            <video ref={videoRef} src={history.videoSource} poster={posterImage || undefined} preload="metadata" autoPlay={isVideoStarted} controls={isVideoStarted} playsInline className={`h-full w-full object-cover ${isVideoStarted ? "" : "invisible"}`} onPlay={() => { setIsVideoStarted(true); setIsVideoPlaying(true); }} onPause={() => setIsVideoPlaying(false)} />
                        ) : (
                            posterImage ? <Image src={posterImage} alt={title || "Our History"} fill className="object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-slate-900 text-xs text-slate-500">Chưa có nội dung media</div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-black/20" />
                        {hasVideo && !isVideoStarted && <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                            {posterImage ? <Image src={posterImage} alt={title || "Our History poster"} fill className="pointer-events-none object-cover" /> : <div className="h-full w-full bg-slate-900" />}
                            <div className="pointer-events-none absolute inset-0 bg-black/20" />
                            <button type="button" aria-label="Phát video" onClick={() => { setIsVideoStarted(true); void videoRef.current?.play(); }} className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#C8102E] shadow-2xl transition-transform group-hover:scale-110"><Play fill="currentColor" size={28} /></button>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
