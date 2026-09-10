import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { Search, Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Metadata } from "next";
import { siteConfig, articles as staticArticles } from "@/data/site-content";

export const metadata: Metadata = {
    title: "Tin Tức | Maintech Vietnam",
};

export async function generateStaticParams() {
    return staticArticles.map((article: any) => ({
        slug: String(article.slug),
    }));
}

export default async function BlogSinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = staticArticles.find((a: any) => String(a.slug) === slug);
    const data: any = article || staticArticles[0] || {};
    const title = data.title || "Tin tức Maintech Vietnam";
    const image = data.imageUrl || data.image || "/images/maintech-page-banner.png";
    const summary = data.summary || "Thông tin kỹ thuật mới nhất từ Maintech Vietnam.";
    const content = data.content || summary;
    return (
        <main className="min-h-screen bg-white font-sans text-slate-600">
            {/* HERO BANNER */}
            <PageBanner 
                pageKey={"BANNER_BLOG_SINGLE" as any} 
                centered
                customImage="https://images.unsplash.com/photo-1541888053744-118835848df7?q=80&w=2070"
                overlayOpacity={0.7}
                vi={{
                    badge: "",
                    titleTop: "",
                    titleHighlight: "",
                    title: "Tin Tức",
                    desc: "Trang chủ / Tin tức"
                }}
                en={{
                    badge: "",
                    titleTop: "",
                    titleHighlight: "",
                    title: "Industry News",
                    desc: "Home / News"
                }}
            />

            {/* CONTENT AREA */}
            <section className="py-24">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* LEFT COLUMN: MAIN CONTENT */}
                        <div className="lg:col-span-2 space-y-12">
                            
                            {/* FEATURED IMAGE */}
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 rounded-sm">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* ARTICLE HEADER */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>BỞI MAINTECH</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span>BÌNH LUẬN: 2</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span>28 THÁNG 8, 2026</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
                                    {title}
                                </h1>
                            </div>

                            {/* ARTICLE BODY */}
                            <div className="prose prose-slate max-w-none prose-p:leading-loose text-sm">
                                <p>
                                    {summary}
                                </p>
                                <p>
                                    {content}
                                </p>
                                
                                {/* QUOTE BLOCK */}
                                <div className="my-10 py-10 border-y border-slate-200 relative text-center px-8 md:px-16">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[#C8102E]/20">
                                        <Quote size={32} />
                                    </div>
                                    <p className="text-lg font-medium text-slate-800 leading-relaxed m-0 relative inline-block">
                                        <span className="border-b-2 border-slate-300 pb-1">"Với phương châm 'Chất lượng tạo niềm tin', chúng tôi cam kết mang đến những giải pháp kỹ thuật tối ưu nhất, đảm bảo an toàn tuyệt đối và hiệu suất vận hành cao nhất cho nhà máy của bạn."</span>
                                    </p>
                                </div>

                                <p>
                                    Đội ngũ kỹ sư dày dặn kinh nghiệm của chúng tôi luôn sẵn sàng khảo sát thực tế, tư vấn thiết kế và chế tạo các chi tiết máy thay thế với độ chính xác cao (CNC). Chúng tôi không chỉ khắc phục sự cố tạm thời mà còn phân tích tìm ra nguyên nhân gốc rễ, từ đó cải tiến hệ thống cần cẩu, thiết bị nâng hạ để kéo dài tuổi thọ thiết bị.
                                </p>
                            </div>

                            {/* TWO IMAGES */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-sm">
                                    <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600" alt="Gia công cơ khí" fill className="object-cover" />
                                </div>
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-sm">
                                    <Image src="https://images.unsplash.com/photo-1587301669865-c351b8f59632?q=80&w=600" alt="Ngành F&B" fill className="object-cover" />
                                </div>
                            </div>

                            {/* TAGS & SHARES */}
                            <div className="border-t border-slate-200 pt-8 space-y-6">
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-[11px] font-bold uppercase text-slate-800 tracking-wider">THẺ:</span>
                                    <span className="px-3 py-1 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase tracking-wider rounded-sm">CẦN CẨU</span>
                                    <span className="px-3 py-1 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase tracking-wider rounded-sm">F&B</span>
                                    <span className="px-3 py-1 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase tracking-wider rounded-sm">GIA CÔNG CNC</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="text-[11px] font-bold uppercase text-slate-800 tracking-wider">CHIA SẺ:</span>
                                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-900 border-b border-slate-300 hover:border-slate-900 transition-colors">Facebook</Link>
                                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-900 border-b border-slate-300 hover:border-slate-900 transition-colors">Zalo</Link>
                                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-900 border-b border-slate-300 hover:border-slate-900 transition-colors">Linkedin</Link>
                                </div>
                            </div>

                            {/* AUTHOR BOX */}
                            <div className="bg-slate-50 rounded-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-slate-100 mt-10">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                    <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=256" alt="Maintech Team" fill className="object-cover" />
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Tác giả: Đội ngũ Kỹ sư Maintech</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                                        Chúng tôi là những chuyên gia kỹ thuật tận tâm, luôn cập nhật công nghệ tiên tiến nhất để mang lại giải pháp an toàn và hiệu quả cho dây chuyền công nghiệp.
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start gap-4 text-slate-400">
                                        <Facebook size={14} className="hover:text-[#C8102E] cursor-pointer transition-colors" />
                                        <Linkedin size={14} className="hover:text-[#C8102E] cursor-pointer transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* POST NAVIGATION */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                                <div className="border border-slate-200 p-6 rounded-sm hover:border-premium-red transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 group-hover:text-premium-red transition-colors">
                                        <ArrowLeft size={14} /> BÀI TRƯỚC
                                    </div>
                                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                                        Bảo dưỡng định kỳ hệ thống thiết bị nâng hạ tại xưởng đúc thép.
                                    </p>
                                </div>
                                <div className="border border-slate-200 p-6 rounded-sm hover:border-premium-red transition-colors group cursor-pointer text-right">
                                    <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 group-hover:text-premium-red transition-colors">
                                        BÀI TIẾP THEO <ArrowRight size={14} />
                                    </div>
                                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                                        Tối ưu hóa thiết kế linh kiện băng tải cho nhà máy chế biến thực phẩm.
                                    </p>
                                </div>
                            </div>

                            {/* COMMENTS LIST */}
                            <div className="pt-16">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-8">2 BÌNH LUẬN</h3>
                                <div className="space-y-8">
                                    {/* Comment 1 */}
                                    <div className="flex gap-6 border-b border-slate-100 pb-8">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128" alt="Nguyễn Văn A" fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <h4 className="text-sm font-bold text-slate-900">Giám đốc Nhà máy Tôn</h4>
                                                <span className="text-[10px] text-slate-400">20 Thg 8, 2026 lúc 10:00 Sáng</span>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-3">
                                                Dịch vụ lắp đặt cần cẩu của Maintech rất chuyên nghiệp, đội ngũ thi công an toàn và đúng tiến độ. Rất hài lòng!
                                            </p>
                                            <button className="text-[10px] font-bold uppercase text-slate-900 border-b border-slate-900 hover:text-premium-red hover:border-premium-red transition-colors">TRẢ LỜI</button>
                                        </div>
                                    </div>
                                    {/* Comment 2 */}
                                    <div className="flex gap-6 border-b border-slate-100 pb-8">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                                            <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=128" alt="Trần Thị B" fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <h4 className="text-sm font-bold text-slate-900">Quản lý QA - Công ty Sữa</h4>
                                                <span className="text-[10px] text-slate-400">18 Thg 8, 2026 lúc 14:30 Chiều</span>
                                            </div>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-3">
                                                Chi tiết linh kiện máy chiết rót các bạn thiết kế và gia công lại chạy rất mượt, vật liệu inox đạt chuẩn vi sinh. Cảm ơn Maintech.
                                            </p>
                                            <button className="text-[10px] font-bold uppercase text-slate-900 border-b border-slate-900 hover:text-premium-red hover:border-premium-red transition-colors">TRẢ LỜI</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* LEAVE A REPLY FORM */}
                            <div className="pt-12">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-8">ĐỂ LẠI BÌNH LUẬN</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Họ và tên" className="w-full px-4 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-slate-400 bg-transparent" />
                                        <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-slate-400 bg-transparent" />
                                    </div>
                                    <input type="text" placeholder="Số điện thoại / Đơn vị" className="w-full px-4 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-slate-400 bg-transparent" />
                                    <textarea placeholder="Nội dung bình luận..." rows={6} className="w-full px-4 py-4 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-400 bg-transparent resize-none"></textarea>
                                    <button type="button" className="px-8 py-3 bg-[#1d2331] hover:bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors mt-2">
                                        GỬI BÌNH LUẬN
                                    </button>
                                </form>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: SIDEBAR */}
                        <div className="lg:col-span-1 space-y-12">
                            
                            {/* AUTHOR WIDGET */}
                            <div className="bg-slate-50 p-8 rounded-sm text-center border border-slate-100 flex flex-col items-center">
                                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-6 bg-white border border-slate-200">
                                    <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256" alt="Kỹ sư tư vấn" fill className="object-cover" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Maintech VN</h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                                    Chuyên cung cấp dịch vụ kỹ thuật cao cấp, sửa chữa cơ khí, và giải pháp công nghiệp.
                                </p>
                                <div className="flex items-center justify-center gap-4 text-slate-400">
                                    <Facebook size={14} className="hover:text-[#C8102E] cursor-pointer transition-colors" />
                                    <Linkedin size={14} className="hover:text-[#C8102E] cursor-pointer transition-colors" />
                                </div>
                            </div>

                            {/* SEARCH WIDGET */}
                            <div className="flex w-full h-12">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm bài viết..." 
                                    className="flex-1 bg-premium-red/5 border-none px-4 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-premium-red/30"
                                />
                                <button className="bg-[#C8102E] hover:bg-black text-white px-5 transition-colors flex items-center justify-center">
                                    <Search size={18} />
                                </button>
                            </div>

                            {/* CATEGORIES WIDGET */}
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wide">Danh Mục Tuyến Bài</h3>
                                <ul className="space-y-0">
                                    {[
                                        { name: "Sửa chữa & Bảo dưỡng", count: 12 },
                                        { name: "Thiết kế linh kiện", count: 8 },
                                        { name: "Lắp đặt Cần cẩu", count: 5 },
                                        { name: "Ngành F&B", count: 15 },
                                        { name: "Thiết bị nâng hạ", count: 9 },
                                    ].map((cat, i) => (
                                        <li key={i} className="flex items-center justify-between py-3 border-b border-dashed border-slate-200 group cursor-pointer">
                                            <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">{cat.name}</span>
                                            <span className="text-xs text-slate-400">{cat.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* RELATED POSTS WIDGET */}
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wide">Dự án Nổi Bật</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "Lắp đặt thành công hệ thống cẩu trục 50 tấn.", date: "16 Thg 8, 2026", img: "https://images.unsplash.com/photo-1541888053744-118835848df7?q=80&w=128" },
                                        { title: "Bảo trì định kỳ máy đóng gói sữa hộp tiệt trùng.", date: "20 Thg 7, 2026", img: "https://images.unsplash.com/photo-1587301669865-c351b8f59632?q=80&w=128" },
                                        { title: "Thiết kế bánh răng hợp kim chịu tải nặng.", date: "12 Thg 6, 2026", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=128" },
                                    ].map((post, i) => (
                                        <div key={i} className="flex gap-4 group cursor-pointer">
                                            <div className="relative w-20 h-16 bg-slate-100 rounded-sm overflow-hidden shrink-0">
                                                <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#C8102E] transition-colors mb-1 line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{post.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* INSTAGRAM WIDGET (Hình ảnh công trường) */}
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wide">Thư viện ảnh</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=300",
                                        "https://images.unsplash.com/photo-1541888053744-118835848df7?q=80&w=300",
                                        "https://images.unsplash.com/photo-1533758362706-9ab4f1837012?q=80&w=300",
                                        "https://images.unsplash.com/photo-1587301669865-c351b8f59632?q=80&w=300",
                                        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=300",
                                        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300",
                                    ].map((img, i) => (
                                        <div key={i} className="relative aspect-square w-full bg-slate-100 group cursor-pointer overflow-hidden">
                                            <Image src={img} alt={`Gallery ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* TAGS WIDGET */}
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wide">Từ khóa phổ biến</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Sửa chữa máy", "F&B", "Nâng hạ", "Cần cẩu", "Gia công", "Linh kiện", "Bảo dưỡng", "Băng tải"].map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 text-[11px] font-medium border border-slate-100 hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E] transition-colors cursor-pointer capitalize">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
