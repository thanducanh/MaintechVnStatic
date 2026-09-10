"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function AboutWorkflowSection({ workflow }: { workflow?: any }) {
  const { language } = useLanguage();
  const en = String(language).toLowerCase() === "en";
  const header = workflow?.header || {};
  const steps = Array.isArray(workflow?.steps) && workflow.steps.length ? workflow.steps : [
    { step: "01", title_vi: "Khảo sát & tư vấn", title_en: "Survey & consulting", desc_vi: "Tiếp nhận nhu cầu, khảo sát hiện trạng và đề xuất giải pháp phù hợp.", desc_en: "Understand requirements, survey the site and recommend the right solution." },
    { step: "02", title_vi: "Thiết kế kỹ thuật", title_en: "Technical design", desc_vi: "Xây dựng phương án kỹ thuật, lựa chọn thiết bị và lập kế hoạch triển khai.", desc_en: "Develop the engineering solution, select equipment and plan the implementation." },
    { step: "03", title_vi: "Thi công & lắp đặt", title_en: "Construction & installation", desc_vi: "Lắp đặt, tích hợp thiết bị và kiểm soát an toàn trong suốt quá trình thi công.", desc_en: "Install and integrate equipment while maintaining strict safety control." },
    { step: "04", title_vi: "Kiểm định & bàn giao", title_en: "Inspection & handover", desc_vi: "Kiểm tra kỹ lưỡng, vận hành thử và bàn giao kèm chế độ bảo hành.", desc_en: "Inspect, test and hand over the system with warranty support." },
    { step: "05", title_vi: "Nghiệm thu & bàn giao", title_en: "Acceptance & handover", desc_vi: "Nghiệm thu chất lượng và hoàn tất bàn giao cho khách hàng.", desc_en: "Complete quality acceptance and deliver the project." },
    { step: "06", title_vi: "Bảo trì & đồng hành", title_en: "Maintenance & support", desc_vi: "Tiếp tục bảo trì, hỗ trợ và đồng hành lâu dài.", desc_en: "Continue maintenance, support and long-term partnership." },
  ];
  const pick = (vi: any, enValue: any) => String((en ? enValue || vi : vi || enValue) || "");
  const singleTitle = pick(header.title_vi, header.title_en) || [pick(header.title_line1_vi, header.title_line1_en), pick(header.title_line2_vi, header.title_line2_en)].filter(Boolean).join(" ");

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-12 lg:px-24">
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-[#C8102E]">
            {pick(header.badge_vi, header.badge_en) || (en ? "OUR PROCESS" : "QUY TRÌNH")}
          </p>
          <h2 className="text-center text-3xl font-black uppercase leading-tight tracking-tight text-slate-900 md:text-4xl">
            {singleTitle || (en ? "PROFESSIONAL WORK PROCESS" : "QUY TRÌNH LÀM VIỆC CHUYÊN NGHIỆP")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-slate-500">{pick(header.desc_vi, header.desc_en) || (en ? "A clear process from survey to long-term technical support." : "Quy trình rõ ràng từ khảo sát đến hỗ trợ kỹ thuật lâu dài.")}</p>
        </header>

        {steps.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step: any, index: number) => (
              <article key={`${step.step || index}-${index}`} className="group relative min-h-[170px] rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C8102E]/40 hover:shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
                <div className="text-3xl font-black text-slate-200 transition-colors duration-300 group-hover:text-[#C8102E]/25">{step.step || String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-5 text-base font-black uppercase leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#C8102E]">{pick(step.title_vi, step.title_en)}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">{pick(step.desc_vi, step.desc_en)}</p>
                {step.image && <img src={step.image} alt={pick(step.title_vi, step.title_en)} className="mt-4 h-16 w-full rounded-xl object-cover opacity-90 shadow-sm transition duration-500 group-hover:scale-[1.02]" />}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
