"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoadingOverlay() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Fade out after 800ms to allow page to render fully
        const fadeTimer = window.setTimeout(() => setOpacity(0), 800);
        // Remove from DOM after fade out completes
        const removeTimer = window.setTimeout(() => setMounted(false), 1100);
        
        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(removeTimer);
        };
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const link = target?.closest("a[href]") as HTMLAnchorElement | null;
            if (!link || link.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const url = new URL(link.href, window.location.href);
            if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
                setMounted(true);
                setOpacity(1);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    if (!mounted) return null;

    return (
        <div 
            className={`fixed inset-0 z-[9999] grid place-items-center bg-white/35 backdrop-blur-[3px] transition-opacity duration-300 ${opacity === 0 ? "pointer-events-none" : ""}`}
            style={{ opacity }}
            aria-label="Đang tải"
        >
            <div className="relative grid h-[92px] w-[92px] place-items-center">
                <div className="absolute inset-0 animate-[spin_900ms_linear_infinite] rounded-full border-2 border-[rgba(15,23,42,0.18)] border-r-[#0b63ce] border-t-[#d5003d] motion-reduce:animate-[spin_2s_linear_infinite]" />
                <img src="/images/site-logo-maintech.png" alt="Maintech Vietnam" className="h-[42px] w-[42px] object-contain" />
            </div>
        </div>
    );
}
