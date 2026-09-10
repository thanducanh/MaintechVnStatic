"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Terminal, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";


export default function SolutionExplorer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();



    const interactiveSolutions = [
        {
            id: "port",
            title: t("solution_explorer.items.port.title"),
            features: [t("solution_explorer.items.port.features.0"), t("solution_explorer.items.port.features.1"), t("solution_explorer.items.port.features.2")],
            tech: "ABB Ability™ compatible"
        },
        {
            id: "fb",
            title: t("solution_explorer.items.fb.title"),
            features: [t("solution_explorer.items.fb.features.0"), t("solution_explorer.items.fb.features.1"), t("solution_explorer.items.fb.features.2")],
            tech: "Industry 4.0 Ready"
        },
        {
            id: "lifting",
            title: t("solution_explorer.items.lifting.title"),
            features: [t("solution_explorer.items.lifting.features.0"), t("solution_explorer.items.lifting.features.1"), t("solution_explorer.items.lifting.features.2")],
            tech: "Smart Lifting Tech"
        }
    ];

    const [activeTab, setActiveTab] = useState(interactiveSolutions[0].id);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-abb-dark/90 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-white w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]"
                >
                    {/* Sidebar */}
                    <div className="w-full md:w-72 bg-abb-gray-light p-8 flex flex-col">
                        <h3 className="text-abb-red font-bold uppercase tracking-widest text-sm mb-8 flex items-center">
                            <Zap size={16} className="mr-2" /> {t("solution_explorer.search")}
                        </h3>
                        <div className="space-y-2 flex-grow">
                            {interactiveSolutions.map((sol) => (
                                <button
                                    key={sol.id}
                                    onClick={() => setActiveTab(sol.id)}
                                    className={`w-full text-left px-4 py-3 font-bold transition-all ${activeTab === sol.id
                                        ? "bg-abb-red text-white translate-x-1"
                                        : "hover:bg-gray-200 text-abb-dark/60"
                                        }`}
                                >
                                    {sol.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-8 md:p-12 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-abb-gray-medium hover:text-abb-red transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {interactiveSolutions.map((sol) => sol.id === activeTab && (
                            <motion.div
                                key={sol.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="h-full flex flex-col"
                            >
                                {/* <div className="flex items-center space-x-2 text-abb-gray-medium mb-4">
                                    <Terminal size={14} />
                                    <span className="text-xs font-mono uppercase tracking-widest">{sol.tech}</span>
                                </div> */}
                                <h2 className="text-4xl font-bold mb-6">{sol.title}</h2>
                                <p className="text-abb-gray-medium text-lg mb-8 leading-relaxed">
                                    {t("solution_explorer.desc")}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-auto">
                                    {sol.features.map((feature, i) => (
                                        <div key={i} className="flex items-center space-x-3 p-4 bg-abb-gray-light/50 border-l-4 border-abb-red">
                                            <CheckCircle2 size={18} className="text-abb-red flex-shrink-0" />
                                            <span className="font-medium text-abb-dark/80">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
                                    <div className="text-sm text-abb-gray-medium">
                                        {t("solution_explorer.custom")}
                                    </div>
                                    <button
                                        className="abb-button"
                                        onClick={() => window.location.href = 'mailto:mtv@maintechvn.com.vn'}
                                    >
                                        {t("solution_explorer.quote_btn")}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
