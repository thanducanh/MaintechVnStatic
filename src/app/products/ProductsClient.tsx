// 📍 File: src/app/products/ProductsClient.tsx
"use client";

import { useState, useMemo } from "react";
import { ArrowRight, X, Phone, Search, Package, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import { useLanguage } from "@/context/LanguageContext";

interface ProductsClientProps {
    initialProducts: any[];
    pageConfig: any;
}

export default function ProductsClient({ initialProducts = [], pageConfig = {} }: ProductsClientProps) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    const [searchTerm, setSearchTerm] = useState("");
    const [activeIndustry, setActiveIndustry] = useState("Tất cả");
    const [activeNature, setActiveNature] = useState("Tất cả");
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const industryMap: { [key: string]: string } = {
        "Tất cả": isVN ? "Tất cả" : "All",
        "THIET_BI_FB": isVN ? "Thiết bị F&B" : "F&B Equipment",
        "THIET_BI_CAU": isVN ? "Thiết bị cẩu" : "Crane Equipment",
        "THIET_BI_NANG_HA": isVN ? "Thiết bị nâng hạ" : "Lifting Equipment",
        "LINH_KIEN_PHU_KIEN": isVN ? "Linh kiện & phụ kiện" : "Components & Accessories"
    };

    const subcategoryMap: { [key: string]: string } = {
        "Tất cả": isVN ? "Tất cả" : "All",
        // F&B
        "BOM_THUC_PHAM": isVN ? "Bơm thực phẩm" : "Food Pumps",
        "VAN_VI_SINH": isVN ? "Van vi sinh" : "Sanitary Valves",
        "BON_CHUA": isVN ? "Bồn chứa" : "Storage Tanks",
        "DUONG_ONG_INOX": isVN ? "Đường ống inox" : "Stainless Steel Pipes",
        "MAY_CHIET_ROT": isVN ? "Máy chiết rót" : "Filling Machines",
        // Cẩu
        "CAU_TRUC": isVN ? "Cẩu trục" : "Overhead Crane",
        "PALANG": isVN ? "Palang" : "Hoist",
        "RAY_DIEN": isVN ? "Ray điện" : "Conductor Rails",
        "TOI_NANG": isVN ? "Tời nâng" : "Winches",
        "BIEN_TAN": isVN ? "Biến tần" : "Inverters",
        // Nâng hạ
        "XE_NANG_TAY": isVN ? "Xe nâng tay" : "Hand Pallet Trucks",
        "XE_NANG_DIEN": isVN ? "Xe nâng điện" : "Electric Forklifts",
        "BAN_NANG": isVN ? "Bàn nâng" : "Lift Tables",
        "DOCK_LEVELER": isVN ? "Dock leveler" : "Dock Levelers",
        "LIFT_TABLE": isVN ? "Lift table" : "Lift Tables (High)",
        // Linh kiện
        "MOTOR": isVN ? "Motor" : "Motors",
        "PLC": isVN ? "PLC" : "PLCs",
        "CAM_BIEN": isVN ? "Cảm biến" : "Sensors",
        "BAC_DAN": isVN ? "Bạc đạn" : "Bearings",
        "DAY_CAP": isVN ? "Dây cáp" : "Cables",
    };

    const industries = ["Tất cả", "THIET_BI_FB", "THIET_BI_CAU", "THIET_BI_NANG_HA", "LINH_KIEN_PHU_KIEN"];

    // Dynamically build nature choices based on selected industry
    const natures = useMemo(() => {
        const list = ["Tất cả"];
        if (activeIndustry === "Tất cả") {
            return list; // Hide subcategory selectors when showing all industries
        }
        initialProducts.forEach(p => {
            const parts = (p.category || "").split(":");
            if (parts[0] === activeIndustry && parts[1]) {
                if (!list.includes(parts[1])) {
                    list.push(parts[1]);
                }
            }
        });
        return list;
    }, [activeIndustry, initialProducts]);

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(p => {
            const parts = (p.category || "").split(":");
            let industry = parts[0] || "";
            const nature = parts[1] || "";

            // Backward compatibility checks for legacy database values
            if (industry === "SẢN PHẨM NÂNG HẠ" || industry === "PHỤ TÙNG VẬT TƯ") industry = "THIET_BI_NANG_HA";
            if (industry === "MÁY MÓC XÂY DỰNG") industry = "LINH_KIEN_PHU_KIEN";

            const title = isVN ? p.title_vi : (p.title_en || p.title_vi);
            const matchesSearch = title?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesIndustry = activeIndustry === "Tất cả" || industry === activeIndustry;
            const matchesNature = activeNature === "Tất cả" || nature === activeNature;

            return matchesSearch && matchesIndustry && matchesNature;
        });
    }, [initialProducts, searchTerm, activeIndustry, activeNature, isVN]);

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">

            {/* DYNAMIC DATABASE BANNER HERO SECTION */}
            <PageBanner
                pageKey="BANNER_PRODUCTS"
                customImage={pageConfig?.backgroundImage || undefined}
                overlayOpacity={(pageConfig?.overlayOpacity ?? 100) / 100}
                vi={{
                    badge: pageConfig?.badgeVi || "SẢN PHẨM",
                    titleTop: (!pageConfig?.titleVi || pageConfig.titleVi === "SẢN PHẨM & THIẾT BỊ") ? "Sản phẩm & thiết bị" : undefined,
                    titleHighlight: (!pageConfig?.titleVi || pageConfig.titleVi === "SẢN PHẨM & THIẾT BỊ") ? "Công nghiệp" : undefined,
                    title: pageConfig?.titleVi || "SẢN PHẨM & THIẾT BỊ",
                    desc: pageConfig?.descVi || "Cung cấp thiết bị chuyên dụng chất lượng cao"
                }}
                en={{
                    badge: pageConfig?.badgeEn || "PRODUCTS",
                    titleTop: (!pageConfig?.titleEn || pageConfig.titleEn === "PRODUCTS & EQUIPMENT") ? "Products & Equipment" : undefined,
                    titleHighlight: (!pageConfig?.titleEn || pageConfig.titleEn === "PRODUCTS & EQUIPMENT") ? "Industrial" : undefined,
                    title: pageConfig?.titleEn || "PRODUCTS & EQUIPMENT",
                    desc: pageConfig?.descEn || "Providing high quality industrial equipment"
                }}
            />

            {/* SEARCH & FILTER BAR */}
            <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
                <div className="w-full px-6 md:px-12 py-4 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16">
                    
                    {/* Compact Search Container */}
                    <div className="relative w-full lg:max-w-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-premium-red drop-shadow-md transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder={isVN ? "TÌM KIẾM SẢN PHẨM..." : "SEARCH PRODUCTS..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-16 py-2.5 bg-slate-50/50 border border-slate-100 focus:border-premium-red/20 focus:bg-white transition-all outline-none text-[10px] font-black uppercase tracking-widest text-slate-900 rounded"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                             <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                {filteredProducts.length}
                            </span>
                        </div>
                    </div>

                    {/* Compact Filter Architecture */}
                    <div className="flex-1 w-full flex flex-col gap-3">
                        {/* Industry Selector */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] min-w-[70px]">{isVN ? "NGÀNH HÀNG" : "INDUSTRY"}</span>
                            {industries.map((ind) => (
                                <button
                                    key={ind}
                                    onClick={() => { setActiveIndustry(ind); setActiveNature("Tất cả"); }}
                                    className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300 rounded border ${
                                        activeIndustry === ind
                                            ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                                            : "bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600"
                                    }`}
                                >
                                    {industryMap[ind] || ind}
                                </button>
                            ))}
                        </div>

                        {/* Nature (Subcategory) Selector */}
                        {activeIndustry !== "Tất cả" && natures.length > 1 && (
                            <div className="flex items-center gap-2 flex-wrap animate-in slide-in-from-left-2 duration-300">
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] min-w-[70px]">{isVN ? "PHÂN NHÓM" : "SUBCATEGORY"}</span>
                                {natures.map((nat) => (
                                    <button
                                        key={nat}
                                        onClick={() => setActiveNature(nat)}
                                        className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all duration-300 rounded border ${
                                            activeNature === nat
                                                ? "bg-premium-red text-white border-premium-red shadow-md shadow-red-900/10"
                                                : "bg-slate-50/50 text-slate-450 border-transparent hover:bg-slate-100 hover:text-slate-600"
                                        }`}
                                    >
                                        {subcategoryMap[nat] || nat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* PRODUCT GRID IN CARDS */}
            <section className="py-12 flex-1 bg-slate-50/30">
                <div className="w-full px-4 md:px-8">
                    
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
                            {filteredProducts.length} {isVN ? "SẢN PHẨM PHÙ HỢP" : "MATCHING PRODUCTS"}
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filteredProducts.map((item) => {
                                const parts = (item.category || "").split(":");
                                let industry = parts[0] || "";
                                const nature = parts[1] || "";

                                if (industry === "SẢN PHẨM NÂNG HẠ" || industry === "PHỤ TÙNG VẬT TƯ") industry = "THIET_BI_NANG_HA";
                                if (industry === "MÁY MÓC XÂY DỰNG") industry = "LINH_KIEN_PHU_KIEN";

                                const title = isVN ? item.title_vi : (item.title_en || item.title_vi);

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        onClick={() => setSelectedItem(item)}
                                        className="group cursor-pointer flex flex-col h-full bg-white border border-slate-100 hover:border-slate-900 transition-all duration-500 shadow-sm hover:shadow-lg"
                                    >
                                        {/* Image Container */}
                                        <div className="aspect-square relative overflow-hidden bg-slate-50 p-6 transition-all duration-500">
                                            {item.imageUrl ? (
                                                <img
                                                    src={item.imageUrl}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                                    alt={title}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package size={32} className="text-slate-200" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3">
                                                <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 group-hover:text-premium-red drop-shadow-md transition-colors">
                                                    {item.supplier || "Maintech"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-4 flex flex-col flex-1 border-t border-slate-100">
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                <span className="bg-slate-900 text-white text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                                                    {industryMap[industry] || industry}
                                                </span>
                                                {nature && (
                                                    <span className="bg-premium-red/10 text-premium-red drop-shadow-md text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                                                        {subcategoryMap[nature] || nature}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight leading-snug mb-3 group-hover:text-premium-red drop-shadow-md transition-colors line-clamp-2">
                                                {title}
                                            </h3>
                                            
                                            <div className="mt-auto flex items-center justify-between">
                                                {item.price ? (
                                                    <p className="text-[10px] font-bold text-slate-800 font-mono">{item.price}</p>
                                                ) : (
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest italic">{isVN ? "Liên hệ" : "Contact"}</p>
                                                )}
                                                <ArrowRight size={12} className="text-slate-300 group-hover:text-premium-red drop-shadow-md group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-32 text-center border-t border-slate-100 w-full">
                            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">{isVN ? "KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP" : "NO MATCHING PRODUCTS FOUND"}</h3>
                        </div>
                    )}
                </div>
            </section>

            {/* PRODUCT DETAIL OVERLAY MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-slate-900/90 backdrop-blur-md"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            className="bg-white w-full max-w-[1100px] max-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl relative border border-slate-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 text-slate-450 hover:text-slate-900 transition-colors z-20"
                            >
                                <X size={24} />
                            </button>

                            {/* Image side */}
                            <div className="relative bg-slate-50 flex items-center justify-center p-12 md:p-16 border-b md:border-b-0 md:border-r border-slate-100 min-h-[300px]">
                                {selectedItem.imageUrl ? (
                                    <img
                                        src={selectedItem.imageUrl}
                                        alt={isVN ? selectedItem.title_vi : (selectedItem.title_en || selectedItem.title_vi)}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                ) : (
                                    <Package size={80} className="text-slate-100" />
                                )}
                                <div className="absolute top-6 left-6 bg-premium-red text-white px-3 py-1.5 text-[8px] font-black uppercase tracking-widest">
                                    {selectedItem.supplier || "Original Equipment"}
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="p-8 md:p-12 overflow-y-auto flex flex-col justify-center bg-white">
                                <div className="flex items-center gap-2 mb-4">
                                    {(() => {
                                        const parts = (selectedItem.category || "").split(":");
                                        let ind = parts[0] || "";
                                        const nat = parts[1] || "";
                                        if (ind === "SẢN PHẨM NÂNG HẠ" || ind === "PHỤ TÙNG VẬT TƯ") ind = "THIET_BI_NANG_HA";
                                        return (
                                            <>
                                                <span className="bg-slate-900 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-sm">
                                                    {industryMap[ind] || ind}
                                                </span>
                                                {nat && (
                                                    <span className="bg-premium-red text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-sm">
                                                        {subcategoryMap[nat] || nat}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 mb-4 tracking-tight leading-tight">
                                    {isVN ? selectedItem.title_vi : (selectedItem.title_en || selectedItem.title_vi)}
                                </h3>
                                
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">
                                    {isVN ? "HÃNG SẢN XUẤT:" : "BRAND MANUFACTURER:"} <span className="text-slate-700 font-extrabold">{selectedItem.supplier || "Maintech VN"}</span>
                                </p>

                                <p className="text-lg font-bold text-premium-red drop-shadow-md mb-6 font-mono">
                                    {selectedItem.price ? selectedItem.price : (isVN ? "Liên hệ nhận báo giá" : "Contact for quote")}
                                </p>
 
                                <div className="bg-slate-50 p-4 border border-slate-100 rounded-lg mb-6">
                                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">{isVN ? "Tóm tắt" : "Summary"}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                        {isVN ? selectedItem.summary : (selectedItem.summary_en || selectedItem.summary)}
                                    </p>
                                </div>

                                <div className="text-slate-600 text-xs font-medium leading-relaxed mb-8 prose prose-slate max-w-none">
                                    <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1">{isVN ? "Thông số chi tiết" : "Technical Specs"}</h4>
                                    <div dangerouslySetInnerHTML={{ __html: (isVN ? selectedItem.desc_vi : (selectedItem.desc_en || selectedItem.desc_vi))?.replace(/\n/g, "<br/>") || "" }} />
                                </div>
 
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-150">
                                    <a
                                        href="tel:+84918458399"
                                        className="bg-premium-red hover:bg-black text-white px-8 py-3.5 font-bold uppercase text-[9px] tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                                    >
                                        <Phone size={14} /> {isVN ? "Đường dây nóng" : "Hotline Contact"}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
