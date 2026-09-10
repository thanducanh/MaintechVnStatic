"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceDetail {
    title: string;
    desc: string;
    features: string[];
    image: string;
}

export default function ServiceDrawer({
    isOpen,
    onClose,
    service
}: {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceDetail | null
}) {
    const { t } = useLanguage();

    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-abb-dark/60 backdrop-blur-sm z-[110]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[120] overflow-y-auto"
                    >
                        <div className="relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all z-10 backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            <div className="h-80 w-full relative">
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-abb-dark/80 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="eyebrow !bg-white" />
                                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">{service.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="space-y-8">
                                    <section>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-abb-red mb-4">{t("services_data.drawer.overview")}</h3>
                                        <p className="text-abb-gray-medium text-lg leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-abb-red mb-4">{t("services_data.drawer.items_implemented")}</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {(service.features || []).map((feature: string, idx: number) => (
                                                <div key={idx} className="flex items-start p-4 bg-abb-gray-light rounded-sm">
                                                    <Check size={18} className="text-abb-red mt-1 mr-3 flex-shrink-0" />
                                                    <span className="text-abb-dark font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className="bg-abb-dark p-8 text-white">
                                        <h3 className="text-xl font-bold mb-4">{t("services_data.drawer.consult_now")}</h3>
                                        <p className="text-gray-400 mb-6 font-light">{t("services_data.drawer.consult_desc")}</p>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button className="abb-button">{t("services_data.drawer.send_req")}</button>
                                            <button className="abb-button-outline !border-white !text-white hover:!bg-white hover:!text-abb-dark px-6">
                                                Hotline: (+84) 321 456 789
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
