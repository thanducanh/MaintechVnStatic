// 📍 File: src/components/NewsPageClient.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X, Search, Phone, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface Article {
    id: number;
    title: string;
    summary: string | null;
    content: string;
    category: string;
    imageUrl: string | null;
    slug: string;
    createdAt: Date;
    title_en?: string | null;
    summary_en?: string | null;
    content_en?: string | null;
}

const ARTICLES_PER_LOAD = 9;

export default function NewsPageClient({ articles }: { articles: Article[] }) {
    const { language, t } = useLanguage();
    const isVN = language === "VN";
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(isVN ? "Tất cả" : "All");
    const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_LOAD);
    const [loadingMore, setLoadingMore] = useState(false);

    const categories = [
        isVN ? "Tất cả" : "All", 
        ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))
    ];

    const getCategoryName = (cat: string) => {
        if (cat === "Tất cả" || cat === "All") return isVN ? "Tất cả" : "All";
        if (cat === "TIN_TUC") return isVN ? "TIN TỨC" : "NEWS";
        if (cat === "DU_AN") return isVN ? "DỰ ÁN" : "PROJECTS";
        if (cat === "KIEN_THUC") return isVN ? "KIẾN THỨC" : "KNOWLEDGE";
        if (cat === "GIAI_PHAP") return isVN ? "GIẢI PHÁP" : "SOLUTIONS";
        if (cat === "DICH_VU") return isVN ? "DỊCH VỤ" : "SERVICES";
        if (cat === "SAN_PHAM") return isVN ? "SẢN PHẨM" : "PRODUCTS";
        if (cat === "GIOI_THIEU") return isVN ? "GIỚI THIỆU" : "ABOUT US";
        if (cat === "CONG_NGHE") return isVN ? "CÔNG NGHỆ" : "TECHNOLOGY";
        return cat?.replace(/_/g, " ");
    };

    const filtered = articles;

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setVisibleCount(ARTICLES_PER_LOAD);
    };

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setVisibleCount(ARTICLES_PER_LOAD);
    };

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(c => c + ARTICLES_PER_LOAD);
            setLoadingMore(false);
        }, 300);
    };

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString(language === "VN" ? "vi-VN" : "en-US", {
            day: "2-digit", month: "2-digit", year: "numeric",
        });

    return (
        <div className="bg-white">
            {/* FILTER BAR (CLEAN & MINIMAL) */}
            <div className="hidden">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                    
                    {/* Category Tabs */}
                    <div className="flex gap-4 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-2 ${
                                    activeCategory === cat
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-500 border-slate-100 hover:border-slate-900 hover:text-slate-900"
                                }`}
                            >
                                {getCategoryName(cat)}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder={isVN ? "TÌM KIẾM BÀI VIẾT..." : "SEARCH ARTICLES..."}
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-slate-900 focus:bg-white transition-all outline-none text-[11px] font-bold uppercase tracking-wider text-slate-900"
                        />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mx-auto max-w-6xl px-6 py-20 md:px-12">

                <div className="flex items-center justify-between mb-12">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        {filtered.length} {isVN ? "BÀI VIẾT ĐÃ CÔNG BỐ" : "PUBLISHED ARTICLES"}
                    </p>
                </div>

                {visible.length > 0 ? (
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {visible.map((item) => {
                            const titleToDisplay = (!isVN && item.title_en) ? item.title_en : item.title;
                            const summaryToDisplay = (!isVN && item.summary_en) ? item.summary_en : item.summary;
                            const contentToDisplay = (!isVN && item.content_en) ? item.content_en : item.content;

                            return (
                                <Link key={item.id ?? item.slug} href={`/news/${item.slug || item.id}`}>
                                <motion.article
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#C8102E]/40 hover:shadow-xl"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 transition-all duration-700">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                                alt={titleToDisplay}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Tag size={48} className="text-slate-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-premium-red text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                                {getCategoryName(item.category)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            <Calendar size={14} className="text-premium-red" />
                                            {formatDate(item.createdAt)}
                                        </div>
                                        <h3 className="mb-5 line-clamp-2 text-xl font-bold uppercase leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-premium-red">
                                            {titleToDisplay}
                                        </h3>
                                        <p className="mb-8 line-clamp-3 text-sm font-medium leading-relaxed text-slate-500">
                                            {summaryToDisplay || contentToDisplay?.replace(/<[^>]*>/g, "").slice(0, 150)}
                                        </p>
                                        
                                        <div className="mt-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-900 group-hover:gap-5 transition-all">
                                            {isVN ? "CHI TIẾT BÀI VIẾT" : "ARTICLE DETAILS"} <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </motion.article>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-32 text-center border-t border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-wider">{isVN ? "KHÔNG TÌM THẤY BÀI VIẾT PHÙ HỢP" : "NO MATCHING ARTICLES FOUND"}</h3>
                    </div>
                )}

                {/* Load more */}
                {hasMore && (
                    <div className="mt-24 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-slate-900 hover:bg-premium-red text-white px-12 py-5 font-bold uppercase text-[11px] tracking-[0.2em] transition-all duration-300 flex items-center gap-4 rounded-sm"
                        >
                            {isVN ? "XEM THÊM BÀI VIẾT" : "LOAD MORE ARTICLES"}
                            <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}
