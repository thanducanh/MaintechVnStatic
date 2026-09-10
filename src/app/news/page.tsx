import { Metadata } from "next";
import NewsPageClient from "@/components/NewsPageClient";
import PageBanner from "@/components/PageBanner";
import { siteConfig, articles as staticArticles } from "@/data/site-content";

export const metadata: Metadata = {
    title: "Tin Tức | Maintech Vietnam",
};

export default function NewsPage() {
    let articles = staticArticles;
    
    if (articles.length < 3) {
        const existingSlugs = new Set(articles.map((item: any) => item.slug));
        const fallbackArticles = [
            { id: 1, slug: "maintech-industrial-updates", title: "Cập nhật hoạt động kỹ thuật Maintech", title_en: "Maintech Industrial Updates", summary: "Maintech Vietnam nâng cao năng lực khảo sát, thiết kế, lắp đặt và bảo trì thiết bị công nghiệp.", summary_en: "Maintech Vietnam strengthens its industrial engineering capabilities.", content: "Maintech Vietnam tập trung triển khai các giải pháp kỹ thuật an toàn, bền vững cho cảng biển, kho bãi và nhà máy.", category: "TIN_TUC", imageUrl: "/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png", createdAt: new Date("2024-05-01") },
            { id: 2, slug: "engineering-solutions", title: "Giải pháp kỹ thuật công nghiệp", title_en: "Industrial Engineering Solutions", summary: "Khám phá năng lực triển khai và bảo trì thiết bị công nghiệp của Maintech.", summary_en: "Discover Maintech's industrial equipment solutions.", content: "Đội ngũ kỹ sư Maintech cung cấp giải pháp xử lý sự cố, thay thế linh kiện và nâng cấp điều khiển cho từng nhà máy.", category: "GIAI_PHAP", imageUrl: "/uploads/services/1778675523223_BaoTriThietBiCang.png", createdAt: new Date("2024-04-15") },
            { id: 3, slug: "maintech-projects", title: "Dự án tiêu biểu", title_en: "Featured Projects", summary: "Các dự án tiêu biểu thể hiện tiêu chuẩn và kinh nghiệm của đội ngũ Maintech.", summary_en: "Selected projects highlighting Maintech's expertise.", content: "Mỗi dự án được triển khai theo quy trình khảo sát, lập phương án kỹ thuật, thi công an toàn, nghiệm thu và bàn giao.", category: "DU_AN", imageUrl: "/uploads/services/1778675416166_BaoTriThietBiNganhCang.png", createdAt: new Date("2024-03-20") },
        ];
        articles = [...articles, ...fallbackArticles.filter((item) => !existingSlugs.has(item.slug))].slice(0, 3) as any;
    }
    
    let config: any = null;
    if (typeof siteConfig.home === 'string') {
        try { config = JSON.parse(siteConfig.home); } catch (e) {}
    } else {
        config = siteConfig.home;
    }

    return (
        <main className="min-h-screen bg-white font-sans text-slate-600">
            <PageBanner 
                centered
                customImage="/images/maintech-page-banner.png"
                overlayOpacity={config?.newsPage?.hero?.overlayOpacity ?? 0.7}
                vi={{
                    badge: config?.newsPage?.hero?.badge?.vi || "",
                    titleTop: "",
                    titleHighlight: "",
                    title: config?.newsPage?.hero?.title?.vi || "Tin Tức",
                    desc: "Trang chủ / Tin tức"
                }}
                en={{
                    badge: config?.newsPage?.hero?.badge?.en || "",
                    titleTop: "",
                    titleHighlight: "",
                    title: config?.newsPage?.hero?.title?.en || "Industry News",
                    desc: "Home / News"
                }}
            />
            
            <NewsPageClient articles={articles as any} />
        </main>
    );
}
