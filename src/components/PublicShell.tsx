"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicShell({ children, siteLogo, homepageConfig, contactData }: { children: React.ReactNode, siteLogo?: string | null, homepageConfig?: any, contactData?: any }) {
    const pathname = usePathname();
    const isPrivate = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    if (isPrivate) return <>{children}</>;

    return <><Navbar initialSiteLogo={siteLogo} initialHomepageConfig={homepageConfig} />{children}<Footer contactData={contactData} /></>;
}
