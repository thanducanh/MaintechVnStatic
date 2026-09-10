// 📍 File: src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Pacifico, Roboto, Playfair_Display, Oswald, Bangers, Great_Vibes, Be_Vietnam_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "@/context/LanguageContext";
import ContactBubble from "@/components/ContactBubble";
import { HeartbeatTracker } from "@/components/common/HeartbeatTracker";
import CallClickTracker from "@/components/common/CallClickTracker";
import LanguageSelectOverlay from "@/components/common/LanguageSelectOverlay";
import PublicShell from "@/components/PublicShell";
import RouteLoadingOverlay from "@/components/RouteLoadingOverlay";

const mainFont = Montserrat({
    subsets: ["vietnamese", "latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
    display: "swap",
    preload: true,
});

const interFont = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    variable: "--font-inter",
    display: "swap",
});

const vintageFont = Pacifico({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-vintage",
    display: "swap",
});
const robotoFont = Roboto({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const playfairFont = Playfair_Display({ subsets: ["vietnamese", "latin"], variable: "--font-playfair" });
const oswaldFont = Oswald({ subsets: ["vietnamese", "latin"], variable: "--font-oswald" });
const bangersFont = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });
const greatVibesFont = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" });
const beVietnamFont = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "700"], variable: "--font-be-vietnam" });
const spaceGroteskFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
    metadataBase: new URL("https://maintechvn.com"),
    title: {
        default: "Maintech Vietnam | Thiết Bị Kỹ Thuật Công Nghiệp",
        template: "%s | Maintech Vietnam",
    },
    description:
        "Maintech Vietnam — Cung cấp thiết bị kỹ thuật công nghiệp, dịch vụ bảo trì, sửa chữa và giải pháp toàn diện cho doanh nghiệp Việt Nam.",
    keywords: [
        "thiết bị kỹ thuật",
        "công nghiệp",
        "bảo trì",
        "sửa chữa",
        "Maintech Vietnam",
        "thiết bị nâng hạ",
        "cảng biển",
    ],
    authors: [{ name: "Maintech Vietnam" }],
    creator: "Maintech Vietnam",
    publisher: "Maintech Vietnam",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "https://maintechvn.com",
        siteName: "Maintech Vietnam",
        title: "Maintech Vietnam | Thiết Bị Kỹ Thuật Công Nghiệp",
        description: "Cung cấp thiết bị kỹ thuật công nghiệp, dịch vụ bảo trì, sửa chữa và giải pháp toàn diện cho doanh nghiệp Việt Nam.",
        images: [
            {
                url: "/images/maintech-page-banner.png",
                width: 1200,
                height: 630,
                alt: "Maintech Vietnam Industrial Solutions",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Maintech Vietnam | Thiết Bị Kỹ Thuật Công Nghiệp",
        description: "Cung cấp thiết bị kỹ thuật công nghiệp, dịch vụ bảo trì, sửa chữa và giải pháp toàn diện cho doanh nghiệp Việt Nam.",
        images: ["/images/maintech-page-banner.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/icons/icon-192x192.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Maintech Vietnam",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#C8102E",
    viewportFit: "cover",
};
import { siteConfig } from "@/data/site-content";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" className={`${mainFont.variable} ${interFont.variable} ${vintageFont.variable} ${robotoFont.variable} ${playfairFont.variable} ${oswaldFont.variable} ${bangersFont.variable} ${greatVibesFont.variable} ${beVietnamFont.variable} ${spaceGroteskFont.variable}`} suppressHydrationWarning>
            <head>
                {/* Preconnect để tăng tốc tải font và tài nguyên */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="w-full min-h-screen overflow-x-clip bg-background font-sans antialiased text-foreground">
                <LanguageProvider>
                    <LanguageSelectOverlay />
                    <PublicShell
                        siteLogo={siteConfig.logo}
                        homepageConfig={null}
                        contactData={siteConfig}
                    >
                        {children}
                    </PublicShell>
                    <RouteLoadingOverlay />
                </LanguageProvider>
            </body>
        </html>
    );
}
