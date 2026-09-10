// 📍 File: src/app/about/page.tsx
import { siteConfig, services as staticServices } from "@/data/site-content";
import AboutPublicContent from "@/components/AboutPublicContent"; 
import PageBanner from "@/components/PageBanner"; // 🚀 Import Banner mới
import LocalizedBannerContent from "@/components/LocalizedBannerContent";
import AboutWorkflowSection from "@/components/AboutWorkflowSection";
import OurExpertTeam from "@/components/OurExpertTeam";
import ContactCTA from "@/components/ContactCTA";
import CompanyCapabilities from "@/components/CompanyCapabilities";
import AboutProjectGallery from "@/components/AboutProjectGallery";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Về Chúng Tôi",
    description: "Tìm hiểu về hành trình phát triển, sứ mệnh và cam kết chất lượng của Maintech Vietnam trong lĩnh vực kỹ thuật công nghiệp.",
    openGraph: {
        title: "Về Chúng Tôi | Maintech Vietnam",
        description: "Hành trình phát triển & khẳng định vị thế của Maintech Vietnam trong lĩnh vực thiết bị công nghiệp.",
    },
};



export default function AboutPage() {
    const aboutData: any = siteConfig.about;
    const rawCertificates = staticServices.filter((s: any) => s.category === "CHUNG_CHI");
    const rawPartners = staticServices.filter((s: any) => s.category === "DOI_TAC");
    const rawCategories = staticServices.filter((s: any) => s.category === "CHUNG_CHI_LOAI");
    
    let processConfig: any = undefined;
    if (aboutData?.content) {
        try {
            Object.assign(aboutData, JSON.parse(aboutData.content));
        } catch {
            // Keep the server-rendered row when legacy content is malformed.
        }
    }
    if (aboutData?.about_workflow_header || aboutData?.about_workflow_steps) {
        processConfig = {
            ...(aboutData.about_workflow_header || {}),
            steps: Array.isArray(aboutData.about_workflow_steps) ? aboutData.about_workflow_steps : []
        };
    }
    const certificates = JSON.parse(JSON.stringify(rawCertificates));
    const partners = JSON.parse(JSON.stringify(rawPartners));
    const categories = JSON.parse(JSON.stringify(rawCategories));
    const asText = (value: unknown, lang: "vi" | "en" = "vi", fallback = "") => {
        if (typeof value === "string" || typeof value === "number") return String(value);
        if (value && typeof value === "object") {
            const bilingual = value as { vi?: unknown; en?: unknown };
            return String(bilingual[lang] ?? bilingual.vi ?? bilingual.en ?? fallback);
        }
        return fallback;
    };
    const cmsStaffMembers = Array.isArray(aboutData?.staff_members)
        ? aboutData.staff_members.map((member: any) => ({
            ...member,
            name: asText(member?.name ?? member?.name_vi, "vi"),
            name_en: asText(member?.name_en ?? member?.name, "en"),
            role_vi: asText(member?.role_vi ?? member?.position_vi ?? member?.position, "vi"),
            role_en: asText(member?.role_en ?? member?.position_en ?? member?.position, "en"),
            credentials: (Array.isArray(member?.credentials) ? member.credentials : (Array.isArray(member?.certificates) ? member.certificates : [])).map((credential: any) => ({
                ...credential,
                name_vi: asText(credential?.name_vi ?? credential?.title_vi ?? credential?.name, "vi"),
                name_en: asText(credential?.name_en ?? credential?.title_en ?? credential?.name, "en"),
            })),
        }))
        : [];
    // Keep the public team section visible while Supabase/CMS is unavailable.
    // CMS members automatically take over as soon as valid records exist.
    const staffMembers = cmsStaffMembers.length > 0 ? cmsStaffMembers : [
        { name: "Nguyễn Đình Thanh", name_en: "Nguyen Dinh Thanh", role_vi: "Tổng giám đốc (CEO)", role_en: "Chief Executive Officer (CEO)", image: "/uploads/services/ceo-maintech.png", credentials: [{name:"PAT-Krüger Crane Systems Maintenance",year:"2015",image:"/uploads/certificates/certificate-9.png"},{name:"Bromma Spreader, PLC & SCS2 System",year:"2009",image:"/uploads/certificates/certificate-10.png"},{name:"Kalmar RG E-One Advanced Level",year:"2011",image:"/uploads/certificates/certificate-12.png"},{name:"Hänel Service and Product Training",year:"2015",image:"/uploads/certificates/certificate-13.png"}] },
        { name: "Trịnh Hoàn Vũ", name_en: "Trinh Hoan Vu", role_vi: "Kỹ sư trưởng", role_en: "Chief Engineer", image: "/uploads/services/1778233643155_TrinhHoanVu_KalmarAsia.png", credentials: [{name:"Kalmar DRF 450-60S5K & DCE 80-45E",year:"2006",image:"/uploads/certificates/certificate-1.png"},{name:"Kalmar Rubber Tyred Gantry Crane",year:"2000",image:"/uploads/certificates/certificate-2.png"},{name:"Gottwald Mobile Harbour Crane Advanced Training",year:"2010",image:"/uploads/certificates/certificate-11.png"},{name:"Krones E-Learning",year:"2015",image:"/uploads/certificates/certificate-6.png"}] },
        { name: "Đồng Văn Ý", name_en: "Dong Van Y", role_vi: "Chuyên gia thiết bị nâng hạ", role_en: "Lifting Equipment Specialist", image: "/uploads/services/1778670933630_Screenshot2026-05-13173620.png", credentials: [{name:"Kalmar Reach Stackers Technical Training",year:"2009",image:"/uploads/certificates/certificate-3.png"}] }
        , { name: "Mai Duy Thái", name_en: "Mai Duy Thai", role_vi: "Kỹ sư tự động hóa", role_en: "Automation Engineer", image: "/uploads/services/1778671098437_Screenshot2026-05-13181742.png", credentials: [{name:"Kalmar Empty Stackers Technical Training",year:"2008",image:"/uploads/certificates/certificate-4.png"}] }
    ];
    const certificateStaff = [
        { name: "Lê Minh Bằng", name_en: "Le Minh Bang", role_vi: "Kỹ thuật viên thiết bị nâng hạ", role_en: "Lifting Equipment Technician", image: "", credentials: [{ name: "Kalmar Rubber Tyred Gantry Crane E-One – Electrical & Mechanical Troubleshooting and Maintenance", year: "2007", image: "/uploads/services/1778233498482_LeMinhBang_Kalmar.png" }] },
    ];
    const allStaffMembers = [...staffMembers, ...certificateStaff].filter((member: any, index: number, list: any[]) => list.findIndex((item: any) => item.name === member.name || item.name_en === member.name_en) === index);
    const ctaTitle = aboutData?.cta_title || "Sẵn sàng đồng hành cùng Maintech?";
    const ctaLine1 = aboutData?.cta_title_line1 || ctaTitle;
    const ctaLine2 = aboutData?.cta_title_line2 || "";
    const ctaLine1Color = aboutData?.cta_title_line1_color || "#0f172a";
    const ctaLine2Color = aboutData?.cta_title_line2_color || "#C8102E";
    const ctaLine1Size = aboutData?.cta_title_line1_size || "48px";
    const ctaLine2Size = aboutData?.cta_title_line2_size || "48px";
    const ctaDesc = aboutData?.cta_desc || "Hãy để lại thông tin, đội ngũ kỹ sư của chúng tôi sẽ liên hệ để đồng hành cùng doanh nghiệp.";
    const ctaButton = aboutData?.cta_btn_text || "Gửi thông tin";
    const ctaBadge = aboutData?.cta_badge || "Đồng hành cùng Maintech";
    const ctaLink = aboutData?.cta_btn_link || "/contact";
    const staffHeader = aboutData?.staff_header && typeof aboutData.staff_header === "object"
        ? {
            ...aboutData.staff_header,
            badge_vi: asText(aboutData.staff_header.badge_vi, "vi"),
            badge_en: asText(aboutData.staff_header.badge_en, "en"),
            title_vi: asText(aboutData.staff_header.title_vi, "vi"),
            title_en: asText(aboutData.staff_header.title_en, "en"),
        }
        : {};

    // 🚀 ĐỌC CẤU HÌNH BANNER ĐỘNG TỪ CMS
    let bannerBadge = "";
    let bannerBadgeEn = "";
    let bannerTitle = "";
    let bannerTitleEn = "";
    let bannerBreadcrumb = "";
    let bannerBreadcrumbEn = "";
    let bannerDesc = "";
    let bannerDescEn = "";
    let bannerOpacity = 1.0;

    if (aboutData) {
        try {
            if (aboutData.content) {
                const parsed = JSON.parse(aboutData.content);
                bannerBadge = parsed.banner_badge ?? "";
                bannerBadgeEn = parsed.banner_badge_en ?? "";
                bannerTitle = parsed.banner_title ?? "";
                bannerTitleEn = parsed.banner_title_en ?? "";
                bannerBreadcrumb = parsed.banner_breadcrumb ?? "";
                bannerBreadcrumbEn = parsed.banner_breadcrumb_en ?? "";
                bannerDesc = parsed.banner_desc ?? "";
                bannerDescEn = parsed.banner_desc_en ?? "";
                if (parsed.banner_opacity !== undefined) {
                    bannerOpacity = parseFloat(parsed.banner_opacity);
                }
            }
        } catch (e) {
            console.error("Failed to parse aboutData.content:", e);
        }
    }

    // Set customImage exactly as it is saved in DB (including "" for empty/deleted image).
    // If aboutData does not exist, set to undefined to trigger system-wide banner settings.
    const customImage = "/images/maintech-page-banner.png";

    return (
        <main className="min-h-screen bg-white">
            
            {/* 🚀 NÂNG CẤP: BANNER ĐỒNG BỘ CMS */}
            <ClientOnly><PageBanner 
                pageKey="BANNER_ABOUT"
                customImage={customImage}
                overlayOpacity={bannerOpacity}
                vi={{
                    badge: bannerBadge,
                    title: bannerTitle || "VỀ CHÚNG TÔI",
                    desc: bannerDesc,
                    breadcrumb: bannerBreadcrumb
                }}
                en={{
                    badge: bannerBadgeEn,
                    title: bannerTitleEn || "ABOUT US",
                    desc: bannerDescEn,
                    breadcrumb: bannerBreadcrumbEn
                }}
            /></ClientOnly>

            <ClientOnly><AboutPublicContent data={aboutData} certs={certificates} partners={partners} categories={categories} /></ClientOnly>

            <ClientOnly><CompanyCapabilities /></ClientOnly>

            {staffMembers.length > 0 && (
                <ClientOnly>
                <OurExpertTeam config={{ team: {
                    ...staffHeader,
                    badge_vi: staffHeader.badge_vi || "ĐỘI NGŨ CHUYÊN GIA",
                    badge_en: staffHeader.badge_en || "EXPERT TEAM",
                    title_vi: staffHeader.title_vi || "Năng lực nhân sự",
                    title_en: staffHeader.title_en || "Our Expert Team",
                    members: allStaffMembers,
                    badge_color: "#C8102E",
                    badge_size: "14px",
                    title_color: "#0B1221",
                    title_size: "40px",
                    max_members: 20,
                    show_filters: true,
                    show_more: true,
                } }} />
                </ClientOnly>
            )}

            <ClientOnly><AboutWorkflowSection workflow={processConfig} /></ClientOnly>
            <ClientOnly><AboutProjectGallery /></ClientOnly>

            <section className="hidden bg-slate-50 px-6 py-20 md:px-12 lg:px-24">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#C8102E]">{ctaBadge}</p>
                        <h2 className="font-black uppercase tracking-tight"><span style={{ color: ctaLine1Color, fontSize: /^\d+(\.\d+)?$/.test(String(ctaLine1Size)) ? `${ctaLine1Size}px` : ctaLine1Size }}>{ctaLine1}</span>{ctaLine2 && <><br /><span style={{ color: ctaLine2Color, fontSize: /^\d+(\.\d+)?$/.test(String(ctaLine2Size)) ? `${ctaLine2Size}px` : ctaLine2Size }}>{ctaLine2}</span></>}</h2>
                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">{ctaDesc}</p>
                    </div>
                    <Link href={ctaLink} className="mt-10 inline-flex items-center justify-center rounded-sm bg-[#C8102E] px-10 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#a80d26] hover:shadow-lg">{ctaButton}</Link>
                </div>
            </section>
            <ClientOnly><ContactCTA data={aboutData} /></ClientOnly>
        </main>
    );
}
