import { products as staticProducts } from "@/data/site-content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

export async function generateStaticParams() {
  return staticProducts.map((product: any) => ({
    slug: String(product.slug),
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: any = staticProducts.find((p: any) => p.slug === slug);
  if (!product) notFound();

  const specifications = (product.specifications ?? {}) as Record<string, string | number>;
  const title = product.name;
  const description = product.content ?? "Giải pháp thiết bị công nghiệp đáng tin cậy cho hệ thống sản xuất hiện đại.";

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-200">
      <header className="relative overflow-hidden border-b border-slate-800 bg-[#0e1626] py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-transparent" />
        <div className="relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
          <Link href="/products" className="mb-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500"><ArrowLeft size={16} /> Tất cả sản phẩm</Link>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">Product Detail</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none text-white md:text-7xl">{title}</h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 py-20 md:px-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-16">
        <article>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
            <Image src={product.imageUrl || "/images/services-hero-bg.jpg"} alt={title} fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 70vw" priority />
          </div>
          <div className="mt-12 max-w-4xl whitespace-pre-wrap text-lg leading-9 text-slate-400">{description}</div>
          <div className="mt-12 border border-slate-800 bg-slate-900/50 p-6 md:p-8">
            <h2 className="text-2xl font-black uppercase text-white">Thông số kỹ thuật</h2>
            <dl className="mt-6 divide-y divide-slate-800">{Object.entries(specifications).map(([key, value]) => <div key={key} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-2"><dt className="font-bold uppercase tracking-wide text-slate-500">{key.replace(/_/g, " ")}</dt><dd className="font-semibold text-slate-200">{String(value)}</dd></div>)}</dl>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Technical Support</p><h2 className="mt-3 text-3xl font-black uppercase text-white">Cần tư vấn thiết bị?</h2><p className="mt-4 leading-7 text-slate-400">Nhận cấu hình, báo giá và tư vấn kỹ thuật phù hợp với nhà máy của bạn.</p><Link href="/contact" className="mt-7 flex items-center justify-center gap-2 bg-[#C8102E] px-6 py-4 font-bold uppercase text-white transition-colors hover:bg-[#A00D25]">Yêu cầu báo giá <ArrowRight size={17} /></Link></div>
          <div className="border border-[#C8102E]/30 bg-[#C8102E] p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-white/70">Hotline kỹ thuật 24/7</p><a href="tel:+84901234567" className="mt-3 flex items-center gap-3 text-2xl font-black"><Phone size={21} /> +84 901 234 567</a></div>
        </aside>
      </section>
    </main>
  );
}
