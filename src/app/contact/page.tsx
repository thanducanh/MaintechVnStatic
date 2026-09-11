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
            title: { vi: "Liên hệ chúng tôi", en: "Contact us" },
            subtitle: { vi: "", en: "" },
            backgroundImage: "",
            overlayOpacity: 0.6
        },
        pageContent: {
            subtitle: { vi: "KẾT NỐI", en: "CONNECT" },
            title: { vi: "Chúng tôi luôn sẵn sàng lắng nghe", en: "We are always ready to listen" },
            description: { 
                vi: "Bất kể yêu cầu về bảo trì, phụ tùng hay tư vấn giải pháp mới, đội ngũ kỹ sư của Maintech luôn sẵn sàng đồng hành cùng doanh nghiệp bạn.", 
                en: "Regardless of your request for maintenance, spare parts or advice on new solutions, Maintech's engineering team is always ready to accompany your business." 
            }
        },
        contactInfo: {
            hotlines: ["0918 458 399"],
            emails: ["maintechvietnam@gmail.com"],
            hotline: "0918 458 399",
            email: "maintechvietnam@gmail.com",
            responseTime: {
                vi: "Cam kết phản hồi kỹ thuật trong vòng 24 giờ làm việc.",
                en: "We commit to responding within 24 business hours."
            }
        },
        addresses: {
            list: [
                "25V/5 Đường Bình Hòa 22, Phường Bình Hòa, TP. Thuận An, Tỉnh Bình Dương, Việt Nam.",
                "30/8 Đường số 38, Phường Vĩnh Phú, TP. Thuận An, Tỉnh Bình Dương, Việt Nam."
            ],
            headOffice: "25V/5 Đường Bình Hòa 22, Phường Bình Hòa, TP. Thuận An, Tỉnh Bình Dương, Việt Nam.",
            factory: "30/8 Đường số 38, Phường Vĩnh Phú, TP. Thuận An, Tỉnh Bình Dương, Việt Nam.",
            mapUrl: "https://maps.google.com/maps?q=Maintech+Vietnam+%C4%90%E1%BB%93ng+Nai&output=embed&z=15"
        },
        quickChannels: {
            zalo: { enabled: true, label: "Zalo", value: "0918458399" },
            whatsapp: { enabled: true, label: "WhatsApp", value: "+84918458399" },
            telegram: { enabled: true, label: "Telegram", value: "maintechvn" }
        },
        form: {
            enabled: true,
            title: { vi: "Gửi yêu cầu tư vấn", en: "Request a consultation" },
            subtitle: { vi: "Cam kết phản hồi kỹ thuật trong vòng 24 giờ làm việc.", en: "We commit to responding within 24 business hours." },
            submitText: { vi: "Gửi thông tin ngay", en: "Send request" },
            receiverEmail: "",
            successMessage: {
                vi: "Yêu cầu đã được gửi! Chúng tôi sẽ liên hệ lại sớm nhất.",
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

