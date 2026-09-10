"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function HeartbeatTracker({ type }: { type: "PUBLIC_WEB" | "ADMIN_PANEL" }) {
    const initialized = useRef(false);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;
        let sessionId = sessionStorage.getItem("visitor_session_id");
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem("visitor_session_id", sessionId);
        }
    }, [pathname, type]);

    return null;
}
