"use client";

import Image from "next/image";
import Link from "next/link";
import { Cog, Factory, Gauge, Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const icons = [Wrench, Cog, Factory, Gauge];
const iconMap: Record<string, any> = { wrench: Wrench, cog: Cog, settings: Cog, factory: Factory, gauge: Gauge };

export default function Services({ services = [], config }: { services?: any[]; config?: any }) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    // The public homepage and /services must use the same live CMS records.
    // Do not prepend legacy JSON cards: they caused stale/duplicate services.
    const items = services;
    const hasConfig = Boolean(config?.services);
    const badge = hasConfig
        ? ((isVN ? config.services.badge_vi : config.services.badge_en) || (isVN ? "Dịch vụ kỹ thuật" : "What We Offer"))
        : (isVN ? "Dịch vụ kỹ thuật" : "What We Offer");
    const title = hasConfig
        ? (isVN ? config.services.title_vi : config.services.title_en)
        : (isVN ? "Dịch vụ kỹ thuật nổi bật" : "Our Services");
    const description = hasConfig
        ? (isVN ? config.services.desc_vi : config.services.desc_en)
        : "Giải pháp kỹ thuật chuyên sâu cho thiết bị công nghiệp và nhà máy.";

    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragScrollLeft = useRef(0);
    const wasDragged = useRef(false);
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        wasDragged.current = false;
        dragStartX.current = event.pageX - sliderRef.current.offsetLeft;
        dragScrollLeft.current = sliderRef.current.scrollLeft;
    };
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !sliderRef.current) return;
        event.preventDefault();
        const x = event.pageX - sliderRef.current.offsetLeft;
        if (Math.abs(x - dragStartX.current) > 5) wasDragged.current = true;
        sliderRef.current.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
    };
    const stopDragging = () => {
        setIsDragging(false);
        window.setTimeout(() => { wasDragged.current = false; }, 0);
    };
    const loopItems = items;
    useEffect(() => {
        if (sliderRef.current && items.length > 0) sliderRef.current.scrollLeft = sliderRef.current.scrollWidth / 3;
    }, [items.length]);
    const handleLoopScroll = () => {
        // Cards are rendered once from CMS data; no artificial loop duplicates.
    };

    if (items.length === 0) return null;

    return (
        <section id="services" className="border-t border-slate-200 bg-white py-24 font-[var(--font-be-vietnam)] lg:py-32">
            <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <SectionHeading eyebrow={badge || (isVN ? "Dịch vụ kỹ thuật" : "What We Offer")} title={title || (isVN ? "Dịch vụ kỹ thuật nổi bật" : "Our Services")} description={description} />
                </div>

                <div ref={sliderRef} onScroll={handleLoopScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopDragging} onMouseLeave={stopDragging} onTouchEnd={stopDragging} className="flex flex-nowrap select-none cursor-default gap-6 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {loopItems.map((service, index) => {
                        const Icon = iconMap[String(service.icon || "").toLowerCase()] || icons[index % icons.length];
                        const serviceTitle = isVN ? (service.title_vi || service.title) : (service.title_en || service.title_vi || service.title);
                        const serviceDescription = isVN
                            ? (service.summary || service.desc_vi || service.content || "")
                            : (service.summary_en || service.desc_en || service.summary || service.content || "");

                        return (
                            <article key={`${service.id || "service"}-${index}`} className="group relative flex min-h-[510px] w-[320px] min-w-[320px] flex-none snap-start select-none flex-col overflow-hidden border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(200,16,46,0.16)] [perspective:1000px] sm:w-[350px] sm:min-w-[350px] md:w-[380px] md:min-w-[380px] lg:w-[calc((100%_-_4.5rem)/4)] lg:min-w-[calc((100%_-_4.5rem)/4)]">
                                <div className="relative h-64 overflow-hidden bg-slate-900">
                                    <Image draggable={false} src={service.imageUrl && !service.imageUrl.startsWith("/uploads/") ? service.imageUrl : "/images/maintech-page-banner.png"} alt={serviceTitle || "Maintech service"} fill sizes="(max-width: 768px) 100vw, 380px" onError={(event) => { event.currentTarget.src = "/images/maintech-page-banner.png"; }} className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    <div className="pointer-events-none absolute bottom-[10px] left-[10px] right-[10px] top-[17px] border border-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    <span className="absolute right-5 top-4 text-5xl font-black leading-none text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)] [-webkit-text-stroke:1px_rgba(7,27,73,0.75)]">{String((index % items.length) + 1).padStart(2, "0")}</span>
                                </div>

                                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-14 text-slate-900">
                                    <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center bg-[#C8102E] text-white shadow-lg transition-colors duration-500 group-hover:bg-[#A50D25] [transform-style:preserve-3d]">
                                        <Icon size={22} strokeWidth={1.8} className="transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" />
                                    </div>
                                    <h3 className="min-h-[3.1rem] text-xl font-black uppercase leading-tight text-[#0B1221]"><Link href={`/services/${service.slug || service.id}`} onClick={(event) => { if (wasDragged.current) event.preventDefault(); }} className="line-clamp-2 transition-colors hover:text-[#C8102E]">{serviceTitle}</Link></h3>
                                    <p className="mt-3 min-h-[4.5rem] line-clamp-3 flex-1 text-sm leading-6 text-slate-500">{serviceDescription}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
