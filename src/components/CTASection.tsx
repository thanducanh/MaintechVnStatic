// src/components/CTASection.tsx
"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection({ config }: { config?: any }) {
    const { t, language } = useLanguage();
    const isVN = language === "VN";

    // Resolve CMS properties
    const hasConfig = !!config && !!config.cta;

    const badgeText = hasConfig
        ? (isVN ? config.cta.badge_vi : config.cta.badge_en)
        : (t("home.cta.badge") || (isVN ? "Sẵn sàng hợp tác" : "Ready to partner"));

    const titleText = hasConfig
        ? (isVN ? config.cta.title_vi : config.cta.title_en)
        : t("home.cta.title");

    const descText = hasConfig
        ? (isVN ? config.cta.desc_vi : config.cta.desc_en)
        : t("home.cta.desc");

    const btnText = hasConfig
        ? (isVN ? config.cta.btn_text_vi : config.cta.btn_text_en)
        : t("home.cta.contact_btn");

    const btnLink = hasConfig ? (config.cta.btn_link || "mailto:mtv@maintechvn.com.vn") : "mailto:mtv@maintechvn.com.vn";
    const phone = hasConfig ? (config.cta.phone || "0918 458 399") : "0918 458 399";

    // Custom trusts list
    let trustsList: string[] = [];
    if (hasConfig) {
      const list = isVN ? config.cta.trusts_vi : config.cta.trusts_en;
      if (Array.isArray(list)) {
        trustsList = list;
      } else if (typeof list === "string") {
        try {
          trustsList = JSON.parse(list);
        } catch (e) {
          trustsList = list.split(",").map((s: string) => s.trim()).filter(Boolean);
        }
      }
    }
    if (trustsList.length === 0) {
      trustsList = [
        t("home.cta.trust1") || (isVN ? "Báo giá miễn phí" : "Free Quote"),
        t("home.cta.trust2") || (isVN ? "Kỹ sư chứng chỉ quốc tế" : "International Certified Engineers"),
        t("home.cta.trust3") || (isVN ? "Hỗ trợ 24/7" : "24/7 Support"),
        t("home.cta.trust4") || (isVN ? "Bảo hành chính hãng" : "Genuine Warranty"),
      ];
    }

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden font-sans" style={{ background: "linear-gradient(135deg, #090B11 0%, #131722 45%, #0D0F16 100%)" }}>
            {/* Lưới kỹ thuật trang trí */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />
            {/* Ánh sáng đỏ mờ */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#C8102E]/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#C8102E]/8 blur-[90px] pointer-events-none" />

            <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

                    {/* Left: text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        {badgeText && (
                            <span className="mb-4 block text-sm font-bold uppercase tracking-wider text-[#C8102E]">
                                {badgeText}
                            </span>
                        )}
                        {titleText && (
                            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-white mb-4 uppercase tracking-tight leading-[1.1]">
                                {titleText}
                            </h2>
                        )}
                        {descText && (
                            <p className="text-white/60 text-xs md:text-sm font-medium leading-relaxed">
                                {descText}
                            </p>
                        )}
                    </motion.div>

                    {/* Right: actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0"
                    >
                        {btnText && (
                            <a
                                href={btnLink}
                                className="group bg-[#C8102E] hover:bg-[#b00e28] text-white px-8 py-4 rounded-sm text-xs font-semibold uppercase tracking-wide transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 active:scale-95 border border-[#C8102E] hover:border-[#b00e28]"
                            >
                                <Mail size={15} />
                                {btnText}
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        )}

                        {phone && (
                            <a
                                href={`tel:${phone.replace(/\s+/g, "")}`}
                                className="group border border-white/10 hover:border-white/20 text-white/95 hover:bg-white/5 px-8 py-4 rounded-sm text-xs font-semibold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95"
                            >
                                <Phone size={15} />
                                {phone}
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Bottom trust bar */}
                {trustsList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-6 text-white/40 text-[10px] font-bold uppercase tracking-wider"
                    >
                        {trustsList.map((trust, idx) => (
                            <div key={idx} className="flex items-center gap-6">
                                <span className="text-[#C8102E]">✓ <span className="text-white/40">{trust}</span></span>
                                {idx < trustsList.length - 1 && (
                                    <span className="hidden sm:block w-px h-3 bg-white/10" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
