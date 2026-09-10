// ðŸ“ File: src/app/contact/page.tsx
import React from "react";
import { siteConfig } from "@/data/site-content";
import ContactPublicContent from "@/components/ContactPublicContent";



export default function ContactPage() {
    let config: any = {};
    try {
        if (typeof siteConfig.contact === 'string') config = JSON.parse(siteConfig.contact);
        else config = siteConfig.contact;
    } catch(e) {}
    
    
    // Default Fallbacks
    const defaultData = {
        hero: {
            title: { vi: "LiÃªn há»‡ chÃºng tÃ´i", en: "Contact us" },
      subtitle: { vi: "", en: "" },
            backgroundImage: "",
            overlayOpacity: 0.6
        },
        pageContent: {
            subtitle: { vi: "Káº¾T Ná»I", en: "CONNECT" },
            title: { vi: "ChÃºng tÃ´i luÃ´n sáºµn sÃ ng láº¯ng nghe", en: "We are always ready to listen" },
            description: { 
                vi: "Báº¥t ká»ƒ yÃªu cáº§u vá» báº£o trÃ¬, phá»¥ tÃ¹ng hay tÆ° váº¥n giáº£i phÃ¡p má»›i, Ä‘á»™i ngÅ© ká»¹ sÆ° cá»§a Maintech luÃ´n sáºµn sÃ ng Ä‘á»“ng hÃ nh cÃ¹ng doanh nghiá»‡p báº¡n.", 
                en: "Regardless of your request for maintenance, spare parts or advice on new solutions, Maintech's engineering team is always ready to accompany your business." 
            }
        },
        contactInfo: {
            hotlines: ["0918 458 399"],
            emails: ["maintechvietnam@gmail.com"],
            hotline: "0918 458 399",
            email: "maintechvietnam@gmail.com",
            responseTime: {
                vi: "Cam káº¿t pháº£n há»“i ká»¹ thuáº­t trong vÃ²ng 24 giá» lÃ m viá»‡c.",
                en: "We commit to responding within 24 business hours."
            }
        },
        addresses: {
            list: [
                "25V/5 ÄÆ°á»ng BÃ¬nh HÃ²a 22, PhÆ°á»ng BÃ¬nh HÃ²a, TP. Thuáº­n An, Tá»‰nh BÃ¬nh DÆ°Æ¡ng, Viá»‡t Nam.",
                "30/8 ÄÆ°á»ng sá»‘ 38, PhÆ°á»ng VÄ©nh PhÃº, TP. Thuáº­n An, Tá»‰nh BÃ¬nh DÆ°Æ¡ng, Viá»‡t Nam."
            ],
            headOffice: "25V/5 ÄÆ°á»ng BÃ¬nh HÃ²a 22, PhÆ°á»ng BÃ¬nh HÃ²a, TP. Thuáº­n An, Tá»‰nh BÃ¬nh DÆ°Æ¡ng, Viá»‡t Nam.",
            factory: "30/8 ÄÆ°á»ng sá»‘ 38, PhÆ°á»ng VÄ©nh PhÃº, TP. Thuáº­n An, Tá»‰nh BÃ¬nh DÆ°Æ¡ng, Viá»‡t Nam.",
            mapUrl: "https://maps.google.com/maps?q=Maintech+Vietnam+%C4%90%E1%BB%93ng+Nai&output=embed&z=15"
        },
        quickChannels: {
            zalo: { enabled: true, label: "Zalo", value: "0918458399" },
            whatsapp: { enabled: true, label: "WhatsApp", value: "+84918458399" },
            telegram: { enabled: true, label: "Telegram", value: "maintechvn" }
        },
        form: {
            enabled: true,
            title: { vi: "Gá»­i yÃªu cáº§u tÆ° váº¥n", en: "Request a consultation" },
            subtitle: { vi: "Cam káº¿t pháº£n há»“i ká»¹ thuáº­t trong vÃ²ng 24 giá» lÃ m viá»‡c.", en: "We commit to responding within 24 business hours." },
            submitText: { vi: "Gá»­i thÃ´ng tin ngay", en: "Send request" },
            receiverEmail: "",
            successMessage: {
                vi: "YÃªu cáº§u Ä‘Ã£ Ä‘Æ°á»£c gá»­i! ChÃºng tÃ´i sáº½ liÃªn há»‡ láº¡i sá»›m nháº¥t.",
                en: "Your request has been sent. We will contact you soon."
            }
        }
    };

    // ðŸš€ Deep merge DB settings with defaults to guarantee all keys exist
    const mergeConfig = (initial: any, defaults: any) => {
        if (!initial) return defaults;
        const merged = { ...defaults };
        for (const key in defaults) {
            if (defaults[key] && typeof defaults[key] === 'object' && !Array.isArray(defaults[key])) {
                merged[key] = {
                    ...defaults[key],
                    ...(initial[key] || {})
                };
            } else if (initial[key] !== undefined) {
                merged[key] = initial[key];
            }
        }
        return merged;
    };

    const merged = mergeConfig(config, defaultData);
    
    // Data Migration for Arrays (Backward compatibility)
    if (!merged.contactInfo.hotlines || merged.contactInfo.hotlines.length === 0) {
        merged.contactInfo.hotlines = merged.contactInfo.hotline ? [merged.contactInfo.hotline] : [];
    }
    if (!merged.contactInfo.emails || merged.contactInfo.emails.length === 0) {
        merged.contactInfo.emails = merged.contactInfo.email ? [merged.contactInfo.email] : [];
    }
    if (!merged.addresses.list || merged.addresses.list.length === 0) {
        const legacyList: any[] = [];
        if (merged.addresses.headOffice) legacyList.push(merged.addresses.headOffice);
        if (merged.addresses.factory) legacyList.push(merged.addresses.factory);
        merged.addresses.list = legacyList;
    }

    const data = {
      ...merged,
      hero: {
        ...merged.hero,
        subtitle: { vi: "", en: "" },
      },
    };

    return (
        <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-premium-red selection:text-white">
            <ContactPublicContent data={data} />
        </main>
    );
}

