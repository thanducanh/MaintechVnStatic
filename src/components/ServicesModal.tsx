"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Anchor, Beef, Construction, Settings, Hammer, Shield } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { t } = useLanguage();

    const allServices = [
        {
            id: "thiet-ke-cang",
            title: t("services_data.items.thiet-ke-cang.title"),
            category: t("services_data.items.thiet-ke-cang.category") || "Ngành Cảng",
            icon: <Anchor size={24} className="text-abb-red" />,
            desc: t("services_data.items.thiet-ke-cang.desc")
        },
        {
            id: "thiet-ke-f-b",
            title: t("services_data.items.thiet-ke-f-b.title"),
            category: "F&B",
            icon: <Beef size={24} className="text-abb-red" />,
            desc: t("services_data.items.thiet-ke-f-b.desc")
        },
        {
            id: "thiet-ke-nang-ha",
            title: t("services_data.items.thiet-ke-nang-ha.title"),
            category: "Nâng Hạ",
            icon: <Construction size={24} className="text-abb-red" />,
            desc: t("services_data.items.thiet-ke-nang-ha.desc")
        },
        {
            id: "bao-tri-cang",
            title: t("services_data.items.bao-tri-cang.title"),
            category: "Ngành Cảng",
            icon: <Settings size={24} className="text-abb-red" />,
            desc: t("services_data.items.bao-tri-cang.desc")
        },
        {
            id: "bao-tri-f-b",
            title: t("services_data.items.bao-tri-f-b.title"),
            category: "F&B",
            icon: <Hammer size={24} className="text-abb-red" />,
            desc: t("services_data.items.bao-tri-f-b.desc")
        },
        {
            id: "bao-tri-nang-ha",
            title: t("services_data.items.bao-tri-nang-ha.title"),
            category: "Nâng Hạ",
            icon: <Settings size={24} className="text-abb-red" />,
            desc: t("services_data.items.bao-tri-nang-ha.desc")
        },
        {
            id: "cung-cap-xay-dung",
            title: t("services_data.items.cung-cap-xay-dung.title"),
            category: "Xây Dựng",
            icon: <Construction size={24} className="text-abb-red" />,
            desc: t("services_data.items.cung-cap-xay-dung.desc")
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-abb-dark/95 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <span className="eyebrow" />
                                <h2 className="text-3xl font-bold">{t("services_data.modal.title")}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-abb-gray-medium"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-grow overflow-y-auto p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {allServices.map((service, idx) => (
                                    <Link key={idx} href={`/services/${service.id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group border border-gray-100 p-8 hover:border-abb-red transition-all cursor-pointer bg-abb-gray-light/30 hover:bg-white hover:shadow-xl h-full"
                                        >
                                            <div className="mb-6 flex justify-between items-start">
                                                <div className="p-3 bg-white shadow-sm rounded-lg group-hover:bg-abb-red group-hover:text-white transition-colors">
                                                    {service.icon}
                                                </div>
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-abb-gray-medium">{service.category}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 group-hover:text-abb-red transition-colors">{service.title}</h3>
                                            <p className="text-abb-gray-medium text-sm leading-relaxed mb-6">
                                                {service.desc}
                                            </p>
                                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-abb-red opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t("services_data.modal.learn_more")} <ArrowRight size={14} className="ml-2" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-abb-gray-light border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-abb-gray-medium font-medium">{t("services_data.modal.not_found")}</p>
                            <button className="abb-button" onClick={onClose}>{t("services_data.modal.custom_consult")}</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
