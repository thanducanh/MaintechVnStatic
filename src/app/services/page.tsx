import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services";
import { siteConfig, services as staticServices } from "@/data/site-content";

const SERVICES_BANNER_FALLBACK = "/images/maintech-page-banner.png";

export default function ServicesPage() {
    const displayServices = staticServices.filter((s: any) => s.category !== "CHUNG_CHI" && s.category !== "DOI_TAC" && s.category !== "CHUNG_CHI_LOAI");
    
    // Parse siteConfig.home to extract banner config if it exists
    let config: any = null;
    if (typeof siteConfig.home === 'string') {
        try { config = JSON.parse(siteConfig.home); } catch (e) {}
    } else {
        config = siteConfig.home;
    }

    const hero = config?.services?.hero || {};
    const backgroundImage = siteConfig.banner || SERVICES_BANNER_FALLBACK;
    const overlayOpacity = hero.overlayOpacity !== undefined ? hero.overlayOpacity : 1.0;

    return (
        <main className="min-h-screen bg-white font-sans flex flex-col">
            <PageBanner 
                pageKey="BANNER_SERVICES"
                centered
                customImage={backgroundImage}
                overlayOpacity={overlayOpacity}
                vi={{
                    badge: hero.badge?.vi || "Portfolio",
                    title: hero.title?.vi ?? "DỊCH VỤ & GIẢI PHÁP",
                    desc: ""
                }}
                en={{
                    badge: hero.badge?.en || "Portfolio",
                    title: hero.title?.en ?? "SERVICES & SOLUTIONS",
                    desc: ""
                }}
            />

            <Services
                services={displayServices}
                config={{ services: {
                    badge_vi: "DỊCH VỤ KỸ THUẬT",
                    badge_en: "TECHNICAL SERVICES",
                    title_vi: "DỊCH VỤ KỸ THUẬT NỔI BẬT",
                    title_en: "FEATURED TECHNICAL SERVICES",
                    desc_vi: "Cung cấp các giải pháp tối ưu cho hệ thống thiết bị nâng hạ cảng biển và công nghiệp nặng.",
                    desc_en: "Optimal solutions for port lifting systems and heavy industry."
                }}}
            />
        </main>
    );
}
