// 📍 File: src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import OurHistory from "@/components/OurHistory";
import OurExpertTeam from "@/components/OurExpertTeam";
import CompanyCapabilities from "@/components/CompanyCapabilities";
import Process from "@/components/Process";
import NewsSection from "@/components/NewsSection";
import PartnersStrip from "@/components/PartnersStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import ClientOnly from "@/components/ClientOnly";
import { siteConfig, services as staticServices, articles as staticArticles, products as staticProducts } from "@/data/site-content";



const sampleTeam = [
    { name: "Nguyễn Đình Thanh", name_en: "Nguyen Dinh Thanh", role_vi: "Tổng giám đốc (CEO)", role_en: "Chief Executive Officer (CEO)", image: "/uploads/services/ceo-maintech.png", credentials: [{name:"PAT-Krüger Crane Systems Maintenance",year:"2015",image:"/uploads/certificates/certificate-9.png"},{name:"Bromma Spreader, PLC & SCS2 System",year:"2009",image:"/uploads/certificates/certificate-10.png"},{name:"Kalmar RG E-One Advanced Level",year:"2011",image:"/uploads/certificates/certificate-12.png"},{name:"Hänel Service and Product Training",year:"2015",image:"/uploads/certificates/certificate-13.png"}] },
    { name: "Trịnh Hoàn Vũ", name_en: "Trinh Hoan Vu", role_vi: "Kỹ sư trưởng", role_en: "Chief Engineer", image: "/uploads/services/1778233643155_TrinhHoanVu_KalmarAsia.png", credentials: [{name:"Kalmar DRF 450-60S5K & DCE 80-45E",year:"2006",image:"/uploads/certificates/certificate-1.png"},{name:"Kalmar Rubber Tyred Gantry Crane",year:"2000",image:"/uploads/certificates/certificate-2.png"},{name:"Gottwald Mobile Harbour Crane Advanced Training",year:"2010",image:"/uploads/certificates/certificate-11.png"},{name:"Krones E-Learning",year:"2015",image:"/uploads/certificates/certificate-6.png"}] },
    { name: "Đồng Văn Ý", name_en: "Dong Van Y", role_vi: "Chuyên gia thiết bị nâng hạ", role_en: "Lifting Equipment Specialist", image: "/uploads/services/1778670933630_Screenshot2026-05-13173620.png", credentials: [{name:"Kalmar Reach Stackers Technical Training",year:"2009",image:"/uploads/certificates/certificate-3.png"}] },
    { name: "Mai Duy Thái", name_en: "Mai Duy Thai", role_vi: "Kỹ sư tự động hóa", role_en: "Automation Engineer", image: "/uploads/services/1778671098437_Screenshot2026-05-13181742.png", credentials: [{name:"Kalmar Empty Stackers Technical Training",year:"2008",image:"/uploads/certificates/certificate-4.png"}] }
];

export default async function Home() {
    let config: any = null;
    if (typeof siteConfig.home === 'string') {
        try { config = JSON.parse(siteConfig.home); } catch (e) {}
    } else {
        config = siteConfig.home;
    }

    const defaultFallbackImage = siteConfig.logo;
    const latestArticles = staticArticles.slice(0, Math.max(4, Number(config?.news?.limit) || 0));
    const activeServices = staticServices.filter((s: any) => s.category !== "CHUNG_CHI" && s.category !== "DOI_TAC" && s.category !== "CHUNG_CHI_LOAI");
    const activeProducts = staticProducts.slice(0, 4);
    const aboutData = siteConfig.about;

    let partners: any[] = staticServices.filter((s: any) => s.category === "DOI_TAC");
    if (partners.length === 0) {
        const partnerFiles = [
            "1778230145024_partner_CNB.jpg", "1778230145470_partner_CTCPVanTaivsDVHHCangSaiGon.jpg",
            "1778230145619_partner_giannamlogistic.png", "1778230146132_partner_KMSvina.png",
            "1778230146299_partner_lcfoods.jpg", "1778230146452_partner_PPAP.png",
            "1778230146608_partner_rieckermann.jpg", "1778230146769_partner_SITC.png",
            "1778230146920_partner_SPCT.png", "1778230147102_partner_TanCangLogistic.jpg",
            "1778230147287_partner_TanCangWarehousing.jpg", "1778230147433_partner_THtrueMILK2.png",
        ];
        partners = partnerFiles.map((file, index) => ({ id: `sample-partner-${index}`, status: "HIỂN THỊ", order: index, title_vi: "Đối tác Maintech", imageUrl: `/uploads/partners/${file}` }));
    }

    const heroContent = config?.hero;
    const showHero = true;
    const showIntro = config ? config.intro?.active !== false : true;
    const servicesContent = config?.services;
    const showServices = config
        ? Boolean(servicesContent && [
            servicesContent.badge_vi,
            servicesContent.badge_en,
            servicesContent.title_vi,
            servicesContent.title_en,
            servicesContent.desc_vi,
            servicesContent.desc_en,
            ...(Array.isArray(servicesContent.cards) ? servicesContent.cards.flatMap((card: any) => [card?.title_vi, card?.title_en, card?.desc_vi, card?.desc_en]) : []),
        ].some((value) => typeof value === "string" && value.trim() !== ""))
        : true;
    const showProducts = false;
    const showPartners = config ? config.partners?.active !== false : true;

    return (
        <main className="w-full min-h-screen overflow-x-clip bg-[#0B0F19] font-sans text-slate-100">
            
            
            {/* HERO / BANNER CHÍNH */}
            {showHero && <Hero config={config || siteConfig.home} />}
            
            {/* GIỚI THIỆU NHANH (Mission) */}
            {showIntro && <Mission aboutData={aboutData} config={config} homeImageUrl={(aboutData as any)?.imageUrl || null} />}

            {/* DỊCH VỤ */}
            {showServices && <Services services={activeServices} config={config} />}
            <OurHistory config={config} />
            <CompanyCapabilities />
            <OurExpertTeam config={{ ...(config || {}), team: { ...(config?.team || {}), badge_vi: "ĐỘI NGŨ CHUYÊN GIA", badge_en: "EXPERT TEAM", title_vi: "NĂNG LỰC NHÂN SỰ", title_en: "OUR EXPERT TEAM", members: config?.team?.members?.length ? config.team.members : sampleTeam } }} />

            {/* TIN TỨC & DỰ ÁN */}
            <NewsSection articles={latestArticles as any} config={config} />
            
            {/* SẢN PHẨM NỔI BẬT */}
            {showProducts && <FeaturedProducts products={activeProducts} config={config} defaultFallbackImage={defaultFallbackImage} />}

            {/* QUY TRÌNH CHUYÊN NGHIỆP */}
            <Process config={config} />

            {/* ĐỐI TÁC CHIẾN LƯỢC */}
            {showPartners && <PartnersStrip partners={partners} config={config} />}

            
        </main>
    );
}
