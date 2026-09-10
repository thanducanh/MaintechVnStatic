// 📍 File: src/components/FeaturedProducts.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProducts({ products, config, defaultFallbackImage }: { products: any[], config?: any, defaultFallbackImage: string }) {
    const { language, t } = useLanguage();
    const isVN = language === "VN";

    const industryMap: { [key: string]: string } = {
        "THIET_BI_NANG_HA": isVN ? "Thiết bị nâng hạ" : "Lifting Equipment",
        "THIET_BI_FB": isVN ? "Thiết bị F&B" : "F&B Equipment",
        "THIET_BI_NGANH_CANG": isVN ? "Thiết bị ngành cảng" : "Port Equipment",
        "SẢN PHẨM NÂNG HẠ": isVN ? "Thiết bị nâng hạ" : "Lifting Equipment",
    };

    const natureMap: { [key: string]: string } = {
        "THIET_BI": isVN ? "Thiết bị" : "Equipment",
        "PHU_TUNG": isVN ? "Phụ tùng" : "Spare Parts",
        "LINH_KIEN": isVN ? "Linh kiện" : "Components",
        "KHAC": isVN ? "Khác" : "Others"
    };

    if (products.length === 0) return null;

    // Resolve CMS properties
    const hasConfig = !!config && !!config.products;

    const badgeText = hasConfig
        ? (isVN ? config.products.badge_vi : config.products.badge_en)
        : (isVN ? "DANH MỤC SẢN PHẨM" : "Maintech Portfolio");

    const titleText = hasConfig
        ? (isVN ? config.products.title_vi : config.products.title_en)
        : "";

    const descText = hasConfig
        ? (isVN ? config.products.desc_vi : config.products.desc_en)
        : (isVN 
            ? "Thiết bị kỹ thuật công nghiệp chính hãng, đa dạng chủng loại phục vụ mọi nhu cầu sản xuất của doanh nghiệp toàn cầu."
            : "Genuine industrial technical equipment, diverse types serving all production needs of global enterprises.");

    return (
            <section className="border-y border-slate-800 bg-[#0e1626] py-24 font-sans lg:py-32">
            <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-16">
                
                {/* 🚀 HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        {badgeText && (
                            <span className="mb-3 block text-sm font-bold uppercase tracking-wider text-red-500 opacity-90">
                                {badgeText}
                            </span>
                        )}
                        <h2 className="text-[28px] font-black uppercase leading-[1.02] tracking-[-0.03em] text-white md:text-[40px] lg:text-[52px]">
                            {hasConfig ? titleText : (
                                isVN ? (
                                    <>SẢN PHẨM <span className="text-[#C8102E] font-black">& THIẾT BỊ</span></>
                                ) : (
                                    <>PRODUCTS <span className="text-[#C8102E] font-black">& EQUIPMENT</span></>
                                )
                            )}
                        </h2>
                        {descText && (
                            <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-400 md:text-[15px]">
                                {descText}
                            </p>
                        )}
                    </div>
                    
                    <Link href="/products" className="group flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#b00e28] transition-all bg-[#C8102E] px-8 py-4 rounded-sm shrink-0 active:scale-95">
                        {isVN ? "KHÁM PHÁ KHO HÀNG" : "EXPLORE INVENTORY"} 
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-white/95" />
                    </Link>
                </div>

                {/* 🚀 PRODUCTS GRID */}
                    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((prod) => {
                        let [ind, nat] = (prod.category || "").includes(":") ? prod.category.split(":") : [prod.category, ""];
                        if (ind === "SẢN PHẨM NÂNG HẠ" || ind === "PHỤ TÙNG VẬT TƯ") ind = "THIET_BI_NANG_HA";
                        
                        const title = isVN ? prod.title_vi : (prod.title_en || prod.title_vi);
                        const desc = isVN ? prod.desc_vi : (prod.desc_en || prod.desc_vi);

                        return (
                            <Link href={`/products`} key={prod.id} className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20">
                                <div className="relative flex h-60 w-full items-center justify-center overflow-hidden border-b border-slate-800 bg-slate-950 p-6">
                                    <Image
                                        src={prod.imageUrl || defaultFallbackImage}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        alt={title}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6 text-slate-200">
                                    <div className="flex items-center gap-1.5 mb-3.5">
                                        <span className="text-[9px] font-medium text-[#0055A5] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-sm">
                                            {t(`categories.${ind}`) || ind || (isVN ? "SẢN PHẨM" : "PRODUCT")}
                                        </span>
                                        {nat && (
                                            <span className="text-[9px] font-medium text-[#C8102E] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-sm">
                                                {t(`categories.${nat}`) || nat}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-sm md:text-base text-slate-800 group-hover:text-premium-red transition-colors line-clamp-2 mb-3 leading-snug tracking-tight">
                                        {title}
                                    </h4>
                                    <p className="text-xs md:text-sm font-medium text-slate-500 line-clamp-3 mt-auto leading-relaxed">
                                        {desc}
                                    </p>
                                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[10px] font-medium text-[#C8102E] uppercase tracking-wider">{isVN ? "Xem chi tiết" : "View Details"}</span>
                                        <ArrowRight size={15} className="text-[#C8102E] group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
