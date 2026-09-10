import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import ContactForm from "@/app/contact/ContactForm";
import { siteConfig, services as staticServices } from "@/data/site-content";

export async function generateStaticParams() {
  const displayServices = staticServices.filter((s: any) => s.category !== "CHUNG_CHI" && s.category !== "DOI_TAC" && s.category !== "CHUNG_CHI_LOAI");
  return displayServices.map((service: any) => ({
    slug: String(service.slug),
  }));
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const displayServices = staticServices.filter((s: any) => s.category !== "CHUNG_CHI" && s.category !== "DOI_TAC" && s.category !== "CHUNG_CHI_LOAI");
  const service: any = displayServices.find((item: any) => String(item.slug) === slug);
  if (!service) notFound();
  
  let localized: any = {};
  try { localized = JSON.parse(service.content || "{}"); } catch { localized = {}; }
  
  let config: any = null;
  if (typeof siteConfig.home === 'string') {
      try { config = JSON.parse(siteConfig.home); } catch (e) {}
  } else {
      config = siteConfig.home;
  }
  
  const detail = config?.serviceDetails?.[service.slug] || {};
  const rawImage = detail.imageUrl ?? service.imageUrl ?? "";
  const detailImage = rawImage && !rawImage.startsWith("/uploads/") ? rawImage : "/images/maintech-page-banner.png";
  const titleVi = String(detail.title_vi || service.title || "Dịch vụ kỹ thuật");
  const titleEn = String(detail.title_en || localized.title_en || service.title || titleVi);
  const contentVi = detail.content_vi || localized.vi || service.content || service.desc_vi || service.summary || "";
  const contentEn = detail.content_en || localized.en || contentVi;
  const related = displayServices.filter((item: any) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-[#0B1221]">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-5 md:px-12 lg:px-16">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#C8102E]"><ArrowLeft size={16} /> Tất cả dịch vụ</Link>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:px-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-16">
        <article className="min-w-0">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-lg bg-slate-100">
            <Image src={detailImage} alt={titleVi || "Maintech service"} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 768px" />
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#071b49] md:text-4xl">{titleVi}</h1><div className="mt-5 max-w-3xl whitespace-pre-wrap text-[15px] leading-8 text-slate-600">{contentVi}</div>
          <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-200 pt-8 md:grid-cols-2">{["Khảo sát thực tế", "Thiết kế linh kiện phù hợp", "Lắp đặt và chạy thử", "Bảo trì và hỗ trợ kỹ thuật"].map((item) => <li key={item} className="flex items-center gap-3 text-slate-700"><CheckCircle2 size={18} className="text-[#C8102E]" />{item}</li>)}</ul>
          <h2 className="mt-14 text-2xl font-black">Related Service</h2><div className="mt-5 grid gap-5 sm:grid-cols-3">{related.map((item: any, index: number) => <Link key={item.id} href={`/services/${item.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="relative aspect-[4/3] bg-slate-100"><Image src={item.imageUrl && !item.imageUrl.startsWith("/uploads/") ? item.imageUrl : "/images/maintech-page-banner.png"} alt={String(item.title_vi || item.title || "Maintech service")} fill className="object-cover" sizes="300px" /><span className="absolute right-2 top-2 text-3xl font-black text-transparent [-webkit-text-stroke:1px_white]">{String(index + 1).padStart(2, "0")}</span></div><div className="p-4"><h3 className="line-clamp-2 text-sm font-black uppercase">{item.title_vi || item.title}</h3><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase text-[#C8102E]">Xem chi tiết <ArrowRight size={13} /></span></div></Link>)}</div>
        </article>
        <aside className="self-start lg:sticky lg:top-8">
          <ContactForm
            title="Gửi yêu cầu tư vấn"
            subtitle="Đội ngũ kỹ thuật sẽ phản hồi trong vòng 24 giờ làm việc."
            submitText="Gửi thông tin"
            successMsg="Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất."
          />
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">English</p>
            <h3 className="mt-2 font-bold">{titleEn}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">{contentEn}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
