"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            
            <div className="flex-1 flex items-center justify-center p-6 pt-32">
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <h1 className="text-[120px] md:text-[180px] font-black text-slate-100 leading-none select-none">
                            404
                        </h1>
                        <div className="relative -mt-16 md:-mt-24">
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
                                Không tìm thấy trang
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base mt-4 max-w-md mx-auto leading-relaxed">
                                Đường dẫn bạn đang truy cập không tồn tại hoặc đã được chuyển sang địa chỉ mới. 
                                Hãy quay lại trang chủ để tiếp tục khám phá.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/"
                            className="w-full sm:w-auto bg-premium-red hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                        >
                            <Home size={18} /> Về trang chủ
                        </Link>
                        <Link
                            href="/products"
                            className="w-full sm:w-auto border-2 border-slate-200 hover:border-premium-red hover:text-premium-red drop-shadow-md text-slate-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95"
                        >
                            <Search size={18} /> Tìm sản phẩm
                        </Link>
                    </motion.div>

                    {/* Technical decorative elements */}
                    <div className="mt-20 flex items-center justify-center gap-8 opacity-20 grayscale">
                        <div className="w-12 h-12 border-2 border-slate-300 rounded-lg flex items-center justify-center font-bold text-slate-400">MT</div>
                        <div className="w-px h-8 bg-slate-300"></div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Maintech Industrial Systems</div>
                    </div>
                </div>
            </div>

        </main>
    );
}
