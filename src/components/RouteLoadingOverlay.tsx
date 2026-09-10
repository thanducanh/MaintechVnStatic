"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoadingOverlay() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setVisible(false), 350);
        return () => window.clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const link = target?.closest("a[href]") as HTMLAnchorElement | null;
            if (!link || link.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin && url.pathname !== window.location.pathname) setVisible(true);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2d4168] transition-opacity duration-300" aria-label="Đang tải">
            <div className="relative flex h-28 w-28 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <img src="/images/site-logo-maintech.png" alt="Maintech Vietnam" className="h-10 w-10 object-contain drop-shadow-lg" />
            </div>
        </div>
    );
}
