"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Mission({ aboutData, config, homeImageUrl }: { aboutData?: any; config?: any; homeImageUrl?: string | null }) {
  const { language } = useLanguage();
  const isVN = language === "VN";
  const intro = config?.intro;
  const title = (isVN ? intro?.title_vi : intro?.title_en) || (isVN ? "Giải pháp kỹ thuật phù hợp cho doanh nghiệp" : "Technical solutions for your business");
  const badge = (isVN ? intro?.badge_vi : intro?.badge_en) || (isVN ? "VỀ CHÚNG TÔI" : "ABOUT COMPANY");
  const lead = (isVN ? intro?.lead_vi : intro?.lead_en) || (isVN ? "Maintech Vietnam cung cấp thiết bị, phụ tùng và dịch vụ kỹ thuật cho cảng biển, nhà máy và ngành công nghiệp." : "Maintech Vietnam provides equipment, spare parts and technical services for ports, factories and industrial facilities.");
  const desc = (isVN ? intro?.desc_vi : intro?.desc_en) || (isVN ? "Từ tư vấn, khảo sát, thiết kế đến lắp đặt, vận hành và bảo trì, đội ngũ kỹ sư đồng hành cùng khách hàng bằng giải pháp an toàn, đúng tiến độ và phù hợp thực tế." : "From consulting and surveying to design, installation, commissioning and maintenance, our engineers deliver safe, practical and on-schedule solutions.");
  const directorName = (isVN ? intro?.director_name : intro?.director_name_en) || (isVN ? "Nguyễn Đình Thanh" : "Nguyen Dinh Thanh");
  const directorRole = (isVN ? intro?.director_role : intro?.director_role_en) || (isVN ? "Tổng giám đốc (CEO)" : "Chief Executive Officer (CEO)");
  const image = intro?.main_image || homeImageUrl || aboutData?.imageUrl || "/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png";

  const hasIntroContent = Boolean(
    intro && [
      intro.badge_vi, intro.badge_en, intro.title_vi, intro.title_en,
      intro.lead_vi, intro.lead_en, intro.desc_vi, intro.desc_en,
      intro.director_name, intro.director_name_en, intro.director_role,
      intro.director_role_en, intro.signature_text, intro.main_image, intro.badge_image,
    ].some((value) => typeof value === "string" && value.trim().length > 0)
  );

  if (config?.intro && !hasIntroContent) return null;

  return (
    <section id="about" className="overflow-hidden border-t border-slate-100 bg-white font-sans">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 items-center gap-16 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-24">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="order-2 mx-auto max-w-2xl self-center text-center lg:order-2">
          <div className="mb-6 block text-sm font-bold uppercase tracking-wider text-[#C8102E]">
            <span>{badge}</span>
          </div>
          <h2 className="mx-auto max-w-xl text-2xl font-black uppercase leading-[1.05] tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            {title || "We Are Solving All of Your Business Problem"}
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-base leading-8 text-slate-600 md:text-lg">
            <p>{lead || "Our industry's business policy encompasses the strategies, guidelines, and practices that technology companies use to achieve their goals and objectives. The policies may vary depending on the company's size, market position, and competitive landscape. Commodo erat amet vitae consectetur consectetur feugiat."}</p>
            <p>{desc || "Tellus viverra eu risus ut ipsum magna sed odio elit. Sed sem purus tincidunt condimentum amet condimentum massa. Nunc vel nascetur id cras."}</p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 border-t border-slate-200 pt-5">
            <div>
              <p className="text-lg font-bold text-slate-950">{directorName === "Savannah Nguyen" ? (isVN ? "Nguyễn Đình Thanh" : "Nguyen Dinh Thanh") : directorName}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{directorRole === "CEO & Founder of Manit" ? (isVN ? "Tổng giám đốc (CEO)" : "Chief Executive Officer (CEO)") : directorRole}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative order-1 h-[620px] lg:order-1 lg:h-[760px]">
          <div className="absolute -left-4 -top-4 h-full w-full border-4 border-[#C8102E]" />
          <div className="relative h-full w-full overflow-hidden bg-slate-100 shadow-xl">
            <Image src={image} alt="Maintech engineering team" fill className="object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
