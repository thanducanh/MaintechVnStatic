"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  ["/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png", "Thiết kế & lắp đặt thiết bị cảng", "Port equipment design & installation"],
  ["/uploads/services/1787306644290_service1.jpg", "Bảo trì thiết bị nâng hạ", "Lifting equipment maintenance"],
  ["/uploads/services/1778675382663_ThietKeLapDatNganhFB.png", "Thiết bị & dây chuyền F&B", "F&B equipment & production lines"],
  ["/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png", "Khảo sát và thiết kế kỹ thuật", "Technical survey & design"],
];

export default function AboutProjectGallery() {
  const { language } = useLanguage();
  const vi = language === "VN";
  const [selected, setSelected] = useState<string | null>(null);
  return <section className="bg-white px-6 py-20 md:px-12 lg:px-16">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C8102E]">{vi ? "Kinh nghiệm thực tế" : "Field experience"}</p>
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#071b49] md:text-4xl">{vi ? "Thư viện dự án" : "Project gallery"}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">{vi ? "Một số hình ảnh triển khai, bảo trì và cung cấp giải pháp kỹ thuật của Maintech Vietnam." : "Selected projects, maintenance work and engineering solutions delivered by Maintech Vietnam."}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map(([image, titleVi, titleEn], index) => <motion.button type="button" key={`project-card-${index}`} onClick={() => setSelected(image)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.07 }} className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="relative aspect-[4/3] overflow-hidden"><Image src={image} alt={vi ? titleVi : titleEn} fill className="object-cover transition duration-700 group-hover:scale-105" /></div>
          <figcaption className="p-4 text-sm font-bold text-[#071b49]">{vi ? titleVi : titleEn}</figcaption>
        </motion.button>)}
      </div>
    </div>
    {selected && <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 pt-14 md:p-8 md:pt-16" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-2xl leading-none text-white shadow-lg transition hover:bg-[#C8102E]" aria-label={vi ? "Đóng thư viện" : "Close gallery"}>×</button>
        <h3 className="mb-5 pr-8 text-xl font-black uppercase text-[#071b49]">{vi ? "Hình ảnh dự án" : "Project images"}</h3>
        <div className="grid gap-4 sm:grid-cols-2"><Image src={selected} alt={vi ? "Hình ảnh dự án Maintech" : "Maintech project image"} width={1200} height={900} className="h-auto w-full rounded-xl object-contain sm:col-span-2" />{projects.filter(([image]) => image !== selected).map(([image, titleVi, titleEn], index) => <button type="button" key={`project-thumb-${index}`} onClick={() => setSelected(image)} className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={image} alt={vi ? titleVi : titleEn} fill className="object-cover" /></button>)}</div>
      </div>
    </div>}
  </section>;
}
