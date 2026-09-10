// 📍 File: src/components/NewsSection.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, User, X, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

export default function NewsSection({ articles, config }: { articles: any[]; config?: any }) {
    const { language, t } = useLanguage();
    const isVN = language === 'VN';
    const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

    const formatDate = (date: Date) => {
        const value = new Date(date);
        if (Number.isNaN(value.getTime())) return "";
        const day = String(value.getUTCDate()).padStart(2, "0");
        const month = String(value.getUTCMonth() + 1).padStart(2, "0");
        const year = value.getUTCFullYear();
        return isVN ? `${day}/${month}/${year}` : `${month}/${day}/${year}`;
    };

    // Resolve CMS properties
    const hasConfig = !!config && !!config.news;

    const badgeText = hasConfig
        ? (isVN ? config.news.badge_vi : config.news.badge_en)
        : (t("news.latest_badge") || (isVN ? "CẬP NHẬT MỚI NHẤT" : "LATEST UPDATES"));

    const titleText = hasConfig
        ? (isVN ? config.news.title_vi : config.news.title_en)
        : "";

    const fallbackArticles = [
        { id: "fallback-1", slug: "maintech-industrial-updates", title: isVN ? "Cập nhật hoạt động kỹ thuật Maintech" : "Maintech Industrial Updates", title_en: "Maintech Industrial Updates", summary: isVN ? "Những thông tin mới nhất về giải pháp kỹ thuật và hoạt động dự án." : "The latest updates on engineering solutions and project activities.", summary_en: "The latest updates on engineering solutions and project activities.", content: isVN ? "Maintech Vietnam liên tục nâng cao năng lực khảo sát, thiết kế, lắp đặt và bảo trì thiết bị nâng hạ, thiết bị cảng và dây chuyền F&B công nghiệp." : "Maintech Vietnam continuously strengthens its capabilities in surveying, designing, installing, and maintaining lifting equipment, port equipment, and industrial F&B production lines.", createdAt: new Date("2024-05-01T00:00:00Z"), category: "TIN_TUC", imageUrl: "/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png" },
        { id: "fallback-2", slug: "engineering-solutions", title: isVN ? "Giải pháp kỹ thuật công nghiệp" : "Industrial Engineering Solutions", title_en: "Industrial Engineering Solutions", summary: isVN ? "Khám phá năng lực triển khai và bảo trì thiết bị công nghiệp của Maintech." : "Discover Maintech's industrial equipment deployment and maintenance capabilities.", summary_en: "Discover Maintech's industrial equipment deployment and maintenance capabilities.", createdAt: new Date("2024-04-15T00:00:00Z"), category: "KIEN_THUC", imageUrl: "/uploads/services/1778675523223_BaoTriThietBiCang.png" },
        { id: "fallback-3", slug: "maintech-projects", title: isVN ? "Dự án tiêu biểu" : "Featured Projects", title_en: "Featured Projects", summary: isVN ? "Các dự án tiêu biểu thể hiện tiêu chuẩn và kinh nghiệm của đội ngũ Maintech." : "Selected projects highlighting Maintech's standards and expertise.", summary_en: "Selected projects highlighting Maintech's standards and expertise.", createdAt: new Date("2024-03-20T00:00:00Z"), category: "DU_AN", imageUrl: "/uploads/services/1778675416166_BaoTriThietBiNganhCang.png" },
        { id: "fallback-4", slug: "f-and-b-equipment-maintenance", title: isVN ? "Bảo trì thiết bị ngành F&B" : "F&B Equipment Maintenance", title_en: "F&B Equipment Maintenance", summary: isVN ? "Khảo sát và tối ưu dây chuyền thiết bị cho nhà máy sữa, thực phẩm và đồ uống." : "Survey and optimize equipment lines for dairy, food, and beverage factories.", summary_en: "Survey and optimize equipment lines for dairy, food, and beverage factories.", content: isVN ? "Đội ngũ kỹ thuật Maintech hỗ trợ khảo sát, sửa chữa, thay thế linh kiện và nâng cấp dây chuyền F&B, giúp nhà máy vận hành ổn định, an toàn và hiệu quả." : "Maintech engineers support inspection, repair, component replacement, and F&B line upgrades for stable, safe, and efficient factory operations.", createdAt: new Date("2024-02-20T00:00:00Z"), category: "TIN_TUC", imageUrl: "/uploads/services/1778675445942_BaoTriThietBiNganhFB.png" },
    ];
    const existingSlugs = new Set((articles || []).map((item: any) => item.slug));
    const displayArticles = [...(articles || []), ...fallbackArticles.filter((item) => !existingSlugs.has(item.slug))].slice(0, 4);

    return (
        <section className="relative overflow-hidden bg-white py-20 font-sans lg:py-28">
            <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-16">
                
                {/* HEADER */}
                <div className="mb-16 flex flex-col items-center justify-between gap-8 px-0 pb-10 md:flex-row md:items-center">
                    <motion.div 
                        className="mx-auto text-center"
                        initial={{ opacity: 0, x: -20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionHeading
                            eyebrow={badgeText}
                            title={hasConfig ? titleText : (isVN ? "TIN TỨC" : "NEWS")}
                            highlight="&"
                            titleClassName="md:!text-4xl"
                        />
                    </motion.div>

                </div>

                {/* GRID BÀI VIẾT */}
                <div className="grid grid-cols-1 gap-6 px-0 md:grid-cols-2 lg:grid-cols-4 md:gap-7">
                    {displayArticles.map((item, idx) => {
                            const title = isVN ? item.title : (item.title_en || item.title);
                            const summary = isVN ? (item.summary || item.intro_lead) : (item.summary_en || item.intro_lead_en || item.summary || item.intro_lead);

                            return (
                                <motion.article 
                                    key={item.id} 
                                    initial={{ opacity: 0, y: 24 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ duration: 0.5, delay: idx * 0.1 }} 
                                    className="group flex min-h-[549px] cursor-pointer flex-col overflow-visible rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                                    onClick={() => setSelectedArticle(item)}
                                >
                                    <div className="relative w-full overflow-visible aspect-[16/10] max-h-[309px] bg-slate-50">
                                        {item.imageUrl ? (
                                            <div className="absolute inset-0 overflow-hidden">
                                                <Image 
                                                    src={item.imageUrl} 
                                                    alt={`Maintech Project: ${title}`} 
                                                    fill
                                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full bg-slate-200" />
                                        )}
                                        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-[#C8102E] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                                            {formatDate(item.publishedAt || item.createdAt)} &nbsp;•&nbsp; By: {item.author || item.authorName || "Maintech Vietnam"}
                                        </div>
                                    </div>

                                    <div className="h-0 overflow-hidden opacity-0">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-premium-red" />
                                            {formatDate(item.createdAt)}
                                        </div>
                                        <div className="w-px h-2.5 bg-slate-200" />
                                        <div className="flex items-center gap-1.5">
                                            <User size={12} className="text-premium-red" />
                                            ADMIN
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <h3 className="mb-3 text-base font-bold leading-[1.45] tracking-tight text-[#0f2747] md:text-lg">
                                            <Link
                                                href={`/news/${item.slug || item.id}`}
                                                onClick={(event) => event.stopPropagation()}
                                                className="line-clamp-2 uppercase transition-colors group-hover:text-[#C8102E] hover:text-[#C8102E]"
                                            >
                                                {title}
                                            </Link>
                                        </h3>
                                        
                                        <p className="text-sm leading-[1.6] text-slate-600 md:text-sm line-clamp-3 font-medium flex-1 mb-5">
                                            {summary || (isVN ? "Nhấn vào để xem nội dung chi tiết bài viết..." : "Click to view article details...")}
                                        </p>
                                        
                                        <Link
                                            href={`/news/${item.slug || item.id}`}
                                            onClick={(event) => event.stopPropagation()}
                                            className="mt-auto flex items-center gap-2 pt-4 text-[10px] font-semibold uppercase tracking-wide text-[#0f2747] transition-colors hover:text-[#C8102E]"
                                        >
                                            <span>{isVN ? "XEM THÊM" : "READ MORE"}</span>
                                            <ArrowRight size={14} className="text-[#C8102E] transition-transform duration-300 group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                </div>
            </div>

            {/* MODAL CHI TIẾT TIN TỨC */}
            <AnimatePresence>
                {selectedArticle && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedArticle(null)}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-sm w-full max-w-5xl h-fit max-h-[92vh] flex flex-col md:flex-row overflow-hidden shadow-md relative border border-slate-200"
                        >
                            <button 
                                onClick={() => setSelectedArticle(null)} 
                                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-[#C8102E] hover:text-white text-slate-800 rounded-full transition-all z-20 shadow-sm"
                            >
                                <X size={18} />
                            </button>

                            <div className="w-full md:w-[42%] relative min-h-[200px] md:min-h-full overflow-hidden bg-slate-50">
                                {selectedArticle.imageUrl ? (
                                    <img 
                                        src={selectedArticle.imageUrl} 
                                        alt={isVN ? selectedArticle.title : (selectedArticle.title_en || selectedArticle.title)} 
                                        onError={(e) => { e.currentTarget.style.display = "none" }}
                                        className="absolute inset-0 w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="absolute inset-0 w-full h-full bg-slate-200" />
                                )}
                            </div>

                            <div className="w-full md:w-[58%] flex flex-col justify-center bg-white overflow-y-auto max-h-[60vh] md:max-h-[92vh]">
                                <div className="p-8 md:p-12 lg:p-14">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span className="inline-block px-3 py-1 bg-[#C8102E] text-white text-[9px] font-medium uppercase tracking-wider rounded-sm">
                                            {t(`categories.${selectedArticle.category}`) || selectedArticle.category?.replace(/_/g, " ")}
                                        </span>
                                        <span className="text-slate-500 text-[10px] font-medium uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#C8102E]" />
                                            {formatDate(selectedArticle.createdAt)}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-tight text-slate-900 mb-6 leading-tight">
                                        {isVN ? selectedArticle.title : (selectedArticle.title_en || selectedArticle.title)}
                                    </h3>
                                    
                                    <div 
                                        className="w-full text-slate-600 text-xs md:text-sm leading-[1.7] space-y-4 prose prose-slate max-w-none prose-p:mb-3 prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg"
                                        dangerouslySetInnerHTML={{ __html: (isVN ? selectedArticle.content : (selectedArticle.content_en || selectedArticle.content)) || "" }}
                                    />

                                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                        <a href="tel:+84918458399" className="flex-1 bg-[#C8102E] hover:bg-[#b00e28] text-white py-3 px-6 rounded-sm flex items-center justify-center gap-2 font-semibold transition-all uppercase text-xs tracking-wide active:scale-95">
                                            <Phone size={15} /> {isVN ? "LIÊN HỆ TƯ VẤN" : "CONSULT NOW"}
                                        </a>
                                        <Link 
                                            href="/contact" 
                                            className="flex-1 border border-slate-200 text-slate-800 hover:border-[#C8102E] hover:text-[#C8102E] py-3 px-6 rounded-sm flex items-center justify-center font-semibold transition-all uppercase text-xs tracking-wide active:scale-95"
                                        >
                                            {isVN ? "CHI TIẾT LIÊN HỆ" : "CONTACT DETAILS"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-50/20 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
