"use client";

import { CheckCircle2, Users, ShieldCheck, Wrench, Layers3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function CompanyCapabilities() {
  const { language } = useLanguage();
  const vi = language === "VN";
  const items = vi ? [
    [Users, "15 nhân sự chính", "5 chuyên gia kỹ thuật, 6 kỹ thuật viên và 4 nhân sự vận hành."],
    [Wrench, "Triển khai thực tế", "Khảo sát, thiết kế, lắp đặt, chạy thử và bàn giao thiết bị."],
    [ShieldCheck, "An toàn & đúng tiến độ", "Quy trình kỹ thuật rõ ràng, ưu tiên an toàn và hiệu quả vận hành."],
    [Layers3, "Đa ngành công nghiệp", "Cảng biển, nhà máy, F&B, kho tự động và thiết bị nâng hạ."],
  ] : [
    [Users, "15 core employees", "5 technical experts, 6 skilled technicians and 4 operation staff."],
    [Wrench, "Field implementation", "Survey, design, installation, commissioning and handover."],
    [ShieldCheck, "Safe & on schedule", "Clear engineering processes focused on safety and uptime."],
    [Layers3, "Cross-industry expertise", "Ports, factories, F&B, automated warehouses and lifting equipment."],
  ];
  return <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }} className="bg-white px-6 py-20 text-center md:px-12 lg:px-16"><div className="mx-auto max-w-screen-2xl"><div className="mx-auto mb-10 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C8102E]">{vi ? "Năng lực Maintech" : "Maintech capability"}</p><h2 className="text-3xl font-black uppercase tracking-tight text-[#071b49] md:text-4xl">{vi ? "Nền tảng kỹ thuật đáng tin cậy" : "A reliable technical foundation"}</h2><p className="mt-4 leading-7 text-slate-600">{vi ? "Được xây dựng từ kinh nghiệm triển khai thiết bị cảng, thiết bị công nghiệp và dây chuyền nhà máy." : "Built from hands-on experience in port equipment, industrial systems and factory production lines."}</p></div><div className="grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">{items.map(([Icon, title, text], index) => <motion.div key={title as string} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><Icon size={25} className="text-[#C8102E]" /><h3 className="mt-5 font-bold text-[#071b49]">{title as string}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text as string}</p><CheckCircle2 size={16} className="mt-5 text-[#C8102E]" /></motion.div>)}</div></div></motion.section>;
}
