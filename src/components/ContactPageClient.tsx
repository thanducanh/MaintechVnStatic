// 📍 File: src/components/AboutPublicContent.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
    Award, ShieldCheck, Target, TrendingUp, Maximize2, 
    X, Users, Briefcase, ChevronRight, CheckCircle2 
} from "lucide-react";
import { useState } from "react";

export default function AboutPublicContent({ data, certs, partners }: any) {
    const [selectedCert, setSelectedCert] = useState<{ img: string, title: string } | null>(null);
    const [activeTab, setActiveTab] = useState<string>("");

    // 🚀 Lấy tất cả tên Tab từ chứng chỉ
    const certCategories = Array.from(new Set(certs?.map((c: any) => c.content_en).filter(Boolean))) as string[];
    const currentTab = activeTab || certCategories[0] || "Chứng chỉ Thiết bị Cảng & Xếp dỡ Container"; 
    const filteredCerts = certs?.filter((c: any) => c.content_en === currentTab) || [];

    return (
        <div className="animate-in fade-in duration-1000 scroll-smooth bg-slate-50">
            
            {/* 🚀 1. HERO SECTION */}
            <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center bg-[#0B1121] text-white overflow-hidden pt-20">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105" style={{ backgroundImage: `url('${data?.hero_bg_path || '/images/hero-bg-default.jpg'}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121]/80 via-[#0B1121]/60 to-[#0B1121]"></div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex flex-col items-center">
                        {/* Logo giống Navbar nhưng to hơn */}
                        <div className="flex items-center gap-2.5 mb-8">
                            <div className="h-10 w-10 shrink-0 overflow-hidden">
                                <img src="/images/site-logo-maintech.png" alt="Maintech Logo" className="w-full h-full object-contain drop-shadow-xl" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                            </div>
                            <div className="flex flex-col leading-none text-left">
                                <div className="font-bold text-[20px] tracking-tight flex items-baseline select-none">
                                    <span className="text-red-600 drop-shadow-md">MAIN</span>
                                    <span className="text-[#0055A5]">TECH</span>
                                    <span className="ml-1.5 text-[17px] font-normal text-white/85">Vietnam</span>
                                </div>
                                <span className="text-[7px] font-medium uppercase tracking-[0.2em] mt-0.5 text-white/50">Industrial Solution</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mb-4 w-full">
                            <span className="w-8 md:w-16 h-px bg-rose-600"></span>
                            <span className="text-rose-600 font-black tracking-[0.4em] uppercase text-xs">CHÚNG TÔI LÀ MAINTECHVN</span>
                            <span className="w-8 md:w-16 h-px bg-rose-600"></span>
                        </div>
                        <h1 className="text-4xl md:text-[4.5rem] font-black uppercase mb-4 tracking-tighter leading-none text-white drop-shadow-2xl">
                            {data?.title || "VỀ MAINTECHVN"}
                        </h1>
                        <p className="text-xs md:text-lg font-medium text-slate-300 tracking-[0.2em] uppercase max-w-4xl mx-auto">
                            {data?.hero_subtitle || "Hành trình phát triển & Khẳng định vị thế"}
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-70">
                    <div className="w-[24px] h-[38px] border-2 border-slate-500 rounded-full flex justify-center p-1">
                        <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-1 h-2 bg-rose-600 rounded-full"></motion.div>
                    </div>
                </div>
            </section>

            {/* 🚀 2. GIỚI THIỆU */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight border-l-8 border-rose-600 pl-6">Giới Thiệu</h2>
                            <div className="space-y-8 text-slate-600 text-lg leading-loose text-justify">
                                <p className="first-letter:text-8xl first-letter:font-black first-letter:text-rose-600 first-letter:mr-4 first-letter:float-left whitespace-pre-wrap">
                                    {data?.intro_lead || "Đang cập nhật đoạn mở đầu..."}
                                </p>
                                {data?.intro_box && (
                                    <div className="border-l-4 border-rose-600 bg-slate-50 p-8 rounded-r-3xl shadow-sm">
                                        <p className="text-xl font-bold text-slate-800 leading-relaxed italic whitespace-pre-wrap">"{data.intro_box}"</p>
                                    </div>
                                )}
                                {data?.intro_footer && (
                                    <p className="whitespace-pre-wrap">{data.intro_footer}</p>
                                )}
                            </div>
                            <button className="text-rose-600 font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                Xem giải pháp <ChevronRight size={16}/>
                            </button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative sticky top-32">
                            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[15px] border-slate-50">
                                <img src={data?.imageUrl || "/images/placeholder.jpg"} alt="Maintech Office" className="w-full h-[500px] object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 bg-rose-600 text-white p-10 rounded-[2.5rem] shadow-2xl">
                                <div className="text-5xl font-black mb-1 tracking-tighter">2020</div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 text-center">Năm thành lập</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 🚀 3. ĐỐI TÁC TIÊU BIỂU */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-rose-600 font-bold uppercase text-xs tracking-[0.2em] block mb-2">Khách hàng</span>
                        <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">Đối Tác Tiêu Biểu</h2>
                    </div>
                    <p className="text-slate-500 max-w-sm text-right text-sm hidden md:block">Đồng hành cùng nhiều thương hiệu lớn trong khu vực và quốc tế.</p>
                </div>
                <div className="flex gap-8 px-6 overflow-x-auto pb-8 no-scrollbar container mx-auto">
                   {partners?.map((p: any) => (
                        <div key={p.id} className="min-w-[200px] h-28 bg-white rounded-3xl flex items-center justify-center p-6 shadow-sm transition-all shrink-0 border border-slate-100 hover:shadow-xl">
                            <img src={p.imageUrl} alt={p.title_vi} className="max-h-full object-contain" />
                        </div>
                   ))}
                </div>
            </section>

            {/* 🚀 4. CHỈ SỐ NĂNG LỰC */}
            <section className="py-24 bg-[url('https://w0.peakpx.com/wallpaper/722/790/HD-wallpaper-factory-bokeh-blurred-lights-bokeh-background.jpg')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-rose-950/90 mix-blend-multiply"></div>
                <div className="container mx-auto px-6 relative z-10 grid grid-cols-2 gap-12 text-center divide-x divide-rose-500/30">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
                        <div className="text-6xl md:text-8xl font-black text-rose-500 mb-4 tracking-tighter drop-shadow-lg">10+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white">Năm Kinh Nghiệm</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="text-6xl md:text-8xl font-black text-rose-500 mb-4 tracking-tighter drop-shadow-lg">500+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white">Dự án hoàn thành</div>
                    </motion.div>
                </div>
            </section>

            {/* 🚀 5. GIẢI PHÁP KỸ THUẬT TOÀN DIỆN */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tighter border-l-8 border-rose-600 pl-6 mb-12">Giải pháp kỹ thuật công nghiệp toàn diện</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6 text-slate-600 leading-relaxed text-justify">
                            <p>Maintech VN mang đến các giải pháp tự động hóa và cơ khí chất lượng cao, đáp ứng các tiêu chuẩn khắt khe nhất trong công nghiệp. Chúng tôi liên tục cập nhật công nghệ mới, tối ưu hóa dây chuyền, đảm bảo sự ổn định và phát triển bền vững cho doanh nghiệp.</p>
                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                                <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><CheckCircle2 size={16} className="text-rose-600"/> Khảo sát & Tư vấn</h4>
                                    <p className="text-sm">Phân tích hệ thống, đánh giá rủi ro và lập phương án kỹ thuật.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><CheckCircle2 size={16} className="text-rose-600"/> Lắp đặt & Bảo trì</h4>
                                    <p className="text-sm">Thi công cơ khí, tự động hóa và hỗ trợ vận hành liên tục 24/7.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                            <Award size={48} className="text-slate-300 mb-6"/>
                            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Cam kết</p>
                            <h3 className="text-xl font-black uppercase text-slate-800">Tiêu chuẩn Đức<br/>Kỹ thuật chuẩn xác</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🚀 6. TẦM NHÌN & SỨ MỆNH */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100">
                        <div className="bg-white p-16 md:p-24 border-r border-slate-50">
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-8"><TrendingUp className="text-rose-600" size={32} /></div>
                            <h3 className="text-4xl font-black uppercase mb-8 tracking-tighter">Tầm nhìn</h3>
                            <p className="text-lg text-slate-500 leading-relaxed italic border-l-4 border-rose-200 pl-8 whitespace-pre-wrap">"{data?.vision}"</p>
                        </div>
                        <div className="bg-[#0B1121] p-16 md:p-24 text-white relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full"></div>
                            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center mb-8 relative z-10"><Target className="text-white" size={32} /></div>
                            <h3 className="text-4xl font-black uppercase mb-8 tracking-tighter relative z-10">Sứ mệnh</h3>
                            <p className="text-lg text-slate-300 leading-relaxed italic border-l-4 border-rose-600 pl-8 whitespace-pre-wrap relative z-10">"{data?.mission}"</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🚀 7. NĂNG LỰC CỐT LÕI & CHỨNG CHỈ (THIẾT KẾ TAB GẠCH CHÂN ĐỎ) */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-rose-600 font-bold uppercase text-xs tracking-[0.4em] block mb-4">Chứng nhận chuyên môn</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Năng Lực Cốt Lõi & Chứng Chỉ Kỹ Thuật Quốc Tế</h2>
                        <p className="mt-4 text-slate-500 max-w-4xl mx-auto text-sm leading-relaxed">
                            Tự hào sở hữu đội ngũ chuyên gia đạt chứng chỉ quốc tế từ các hãng thiết bị hàng đầu như Kalmar, Gottwald và Hänel. Maintech VN cam kết mang đến giải pháp thiết kế, lắp ráp và bảo trì thiết bị cảng, máy móc F&B và hệ thống nâng hạ với độ an toàn và hiệu suất tối ưu nhất.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mb-16 border-b border-slate-100">
                        {certCategories.map((catName) => (
                            <button 
                                key={catName} onClick={() => setActiveTab(catName)} 
                                className={`pb-4 px-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border-b-2 -mb-[1px] ${currentTab === catName ? 'text-rose-600 border-rose-600' : 'text-slate-400 border-transparent hover:text-slate-800'}`}
                            >
                                {catName}
                            </button>
                        ))}
                    </div>

                    {/* Tiêu đề hiển thị tên Tab bên dưới */}
                    <div className="text-center mb-10">
                        <div className="w-8 h-1 bg-rose-600 mx-auto rounded-full mb-4"></div>
                        <h3 className="text-xl font-black text-slate-900">{currentTab}</h3>
                    </div>

                    <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredCerts.map((cert: any) => (
                                <motion.div 
                                    key={cert.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} 
                                    whileHover={{ y: -10 }} 
                                    onClick={() => setSelectedCert({ img: cert.imageUrl, title: cert.title_vi })} 
                                    className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-zoom-in group flex flex-col h-full"
                                >
                                    <div className="aspect-[3/4] mb-5 flex items-center justify-center bg-slate-50 rounded-3xl overflow-hidden p-4 relative border border-slate-50">
                                        <img src={cert.imageUrl} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-sm" alt={cert.title_vi}/>
                                        <div className="absolute inset-0 bg-rose-900/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[1px]">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-xl"><Maximize2 size={20}/></div>
                                        </div>
                                    </div>
                                    {cert.title_vi && cert.title_vi !== "Hồ sơ năng lực" && (
                                        <div className="mt-auto text-center px-2 pb-2">
                                            <p className="text-[11px] font-bold text-slate-800 leading-relaxed line-clamp-2">{cert.title_vi}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* 🚀 LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out" 
                        onClick={() => setSelectedCert(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={48}/></button>
                        <motion.img 
                            initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} 
                            src={selectedCert.img} 
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10" 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}