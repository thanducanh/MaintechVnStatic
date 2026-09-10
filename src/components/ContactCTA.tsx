"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactCTA({ data }: { data: any }) {
  const { language } = useLanguage();
  const en = language === "EN";
  const text = (vi: any, valueEn: any, fallbackVi: string, fallbackEn = fallbackVi) => String((en ? valueEn || fallbackEn : vi || fallbackVi) || fallbackVi);
  const title = data?.cta_title || data?.cta_title_en
    ? text(data?.cta_title, data?.cta_title_en, "Sẵn sàng hợp tác cùng Maintech", "Ready to work with Maintech")
    : [text(data?.cta_title_line1, data?.cta_title_line1_en, "Sẵn sàng hợp tác cùng", "Ready to work with"), text(data?.cta_title_line2, data?.cta_title_line2_en, "Maintech", "Maintech")].filter(Boolean).join(" ");

  return (
    <section className="bg-white px-6 py-20 text-center md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <p className="mb-2 block text-center text-xs font-bold uppercase tracking-wider text-red-600 md:text-sm">
          {text(data?.cta_badge, data?.cta_badge_en, "Đồng hành cùng Maintech", "Partner with Maintech")}
        </p>
        <h2 className="font-black uppercase leading-tight tracking-tight">
          <span className="text-3xl md:text-4xl" style={{ color: "#0f172a", fontSize: "36px" }}>{title}</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500">
          {text(data?.cta_desc, data?.cta_desc_en, "Hãy để lại thông tin để chúng tôi liên hệ và đồng hành cùng doanh nghiệp.", "Leave your details and our team will contact you to support your business.")}
        </p>
        <Link href={data?.cta_btn_link || "/contact"} className="mt-10 inline-flex items-center justify-center rounded-sm bg-[#C8102E] px-10 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#a80d26] hover:shadow-lg">
          {text(data?.cta_btn_text, data?.cta_btn_text_en, "Liên hệ ngay", "Contact us")}
        </Link>
      </div>
    </section>
  );
}
