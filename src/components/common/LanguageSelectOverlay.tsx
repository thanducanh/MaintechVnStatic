"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelectOverlay() {
    const { setLanguage } = useLanguage();
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const hasChosen = localStorage.getItem("language");
        if (!hasChosen) {
            setVisible(true);
        }
        setChecked(true);
    }, []);

    const choose = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        setVisible(false);
    };

    if (!checked) return null;
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-md p-8 text-center">
                <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-1">
                    Chọn ngôn ngữ / Select language
                </h2>
                <p className="text-xs text-slate-500 font-medium mb-6">
                    Bạn có thể đổi lại bất cứ lúc nào ở góc trên website.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => choose("VN")}
                        className="flex flex-col items-center gap-2 py-6 rounded-2xl border-2 border-slate-100 hover:border-[#C8102E] hover:bg-red-50/50 transition-all group cursor-pointer"
                    >
                        <span className="text-4xl">🇻🇳</span>
                        <span className="text-sm font-black uppercase tracking-wide text-slate-800 group-hover:text-[#C8102E]">
                            Tiếng Việt
                        </span>
                    </button>
                    <button
                        onClick={() => choose("EN")}
                        className="flex flex-col items-center gap-2 py-6 rounded-2xl border-2 border-slate-100 hover:border-[#C8102E] hover:bg-red-50/50 transition-all group cursor-pointer"
                    >
                        <span className="text-4xl">🇬🇧</span>
                        <span className="text-sm font-black uppercase tracking-wide text-slate-800 group-hover:text-[#C8102E]">
                            English
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
