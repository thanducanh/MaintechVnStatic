"use client";

import { motion } from "framer-motion";
import { Search, Cog, Truck, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Search, Cog, Truck, ShieldCheck, Cog, ShieldCheck];

export default function Process({ config }: { config?: any }) {
    const { t, language } = useLanguage();
    const isVN = String(language).toUpperCase() === "VN";
    const cmsSteps = Array.isArray(config?.process?.steps) ? config.process.steps : [];
    const defaults = [
        { title: t("process.steps.1.title"), desc: t("process.steps.1.desc") },
        { title: t("process.steps.2.title"), desc: t("process.steps.2.desc") },
        { title: t("process.steps.3.title"), desc: t("process.steps.3.desc") },
        { title: t("process.steps.4.title"), desc: t("process.steps.4.desc") },
        { title: isVN ? "Nghiệm thu & Bàn giao" : "Acceptance & Handover", desc: isVN ? "Nghiệm thu chất lượng và hoàn tất bàn giao cho khách hàng." : "Complete quality acceptance and deliver the project." },
        { title: isVN ? "Bảo trì & Đồng hành" : "Maintenance & Support", desc: isVN ? "Tiếp tục bảo trì, hỗ trợ và đồng hành lâu dài." : "Continue maintenance, support and long-term partnership." },
    ];
    const source = cmsSteps.length ? [...cmsSteps, ...defaults.slice(cmsSteps.length)].slice(0, 6) : defaults;
    const steps = source.map((item: any, index: number) => ({
        step: String(index + 1).padStart(2, "0"),
        title: cmsSteps.length ? (isVN ? item.title_vi : item.title_en) || "" : item.title,
        desc: cmsSteps.length ? (isVN ? item.desc_vi : item.desc_en) || "" : item.desc,
        Icon: icons[index % icons.length],
    }));

    return (
        <section className="relative overflow-hidden border-y border-slate-200/80 bg-[#f7f9fc] py-16 font-sans lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
                <header className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="mb-3 block text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#C8102E]">
                        {isVN ? (config?.process?.badge_vi || "QUY TRÌNH CHUYÊN NGHIỆP") : (config?.process?.badge_en || "PROFESSIONAL PROCESS")}
                    </span>
                    <h2 className="text-3xl font-extrabold uppercase leading-[1.15] tracking-[-0.02em] text-[#071b49] md:text-4xl">
                        {isVN ? (config?.process?.title_vi || "QUY TRÌNH LÀM VIỆC CHUYÊN NGHIỆP") : (config?.process?.title_en || "PROFESSIONAL WORK PROCESS")}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                        {isVN ? (config?.process?.desc_vi || t("process.desc")) : (config?.process?.desc_en || t("process.desc"))}
                    </p>
                </header>

                <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {steps.map((step: any, index: number) => {
                        const Icon = step.Icon;
                        return (
                            <motion.article key={`${step.step}-${index}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="group relative min-h-[190px] rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_5px_18px_rgba(7,27,73,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-[0_12px_28px_rgba(7,27,73,0.10)]">
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[#071b49] px-2 text-sm font-extrabold tracking-wide text-white shadow-sm">{step.step}</span>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C8102E]/15 bg-[#fff5f7] text-[#C8102E] transition-all duration-300 group-hover:bg-[#C8102E] group-hover:text-white"><Icon size={18} strokeWidth={1.8} /></span>
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-extrabold uppercase leading-[1.35] tracking-[0.01em] text-[#071b49] transition-colors group-hover:text-[#C8102E]">{step.title}</h3>
                                    <p className="mt-3 text-[12px] leading-5 text-slate-500">{step.desc}</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
