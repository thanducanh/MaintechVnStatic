"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ContactBubble() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const HERO_EXIT_OFFSET = 300;
        const handleScroll = () => {
            setVisible(window.scrollY > HERO_EXIT_OFFSET);
        };

        // Evaluate immediately so the button is hidden on the Hero at first load.
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname?.startsWith("/admin")) return null;

    return (
        <button
            type="button"
            aria-label="Về đầu trang"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-4 right-4 z-[99999] flex h-8 w-8 items-center justify-center rounded-full border border-[#C8102E]/60 bg-[#C8102E] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#A00D25] hover:shadow-[0_0_20px_rgba(200,16,46,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C8102E]/30 sm:bottom-6 sm:right-6 sm:h-9 sm:w-9 ${visible ? "translate-y-0 opacity-70 hover:opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
        >
            <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={4.5} />
        </button>
    );
}
