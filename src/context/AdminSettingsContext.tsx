"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { vi } from "@/locales/admin/vi";
import { en } from "@/locales/admin/en";

type Language = "vi" | "en";
type Font = "System" | "Inter" | "Roboto";
type FontSize = "small" | "standard" | "large";

interface AdminSettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    font: Font;
    setFont: (font: Font) => void;
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
    t: any;
}

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export function AdminSettingsProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("vi");
    const [font, setFontState] = useState<Font>("System");
    const [fontSize, setFontSizeState] = useState<FontSize>("standard");

    useEffect(() => {
        const savedLang = localStorage.getItem("admin-lang") as Language;
        const savedFont = localStorage.getItem("admin-font") as Font;
        const savedSize = localStorage.getItem("admin-font-size") as FontSize;
        
        if (savedLang) setLanguageState(savedLang);
        if (savedFont) setFontState(savedFont);
        if (savedSize) setFontSizeState(savedSize);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("admin-lang", lang);
    };

    const setFont = (f: Font) => {
        setFontState(f);
        localStorage.setItem("admin-font", f);
    };

    const setFontSize = (s: FontSize) => {
        setFontSizeState(s);
        localStorage.setItem("admin-font-size", s);
    };

    const t = useMemo(() => {
        return language === "en" ? en : vi;
    }, [language]);

    // Apply font and size to root
    useEffect(() => {
        const root = document.documentElement;
        
        // Font Family
        let fontFamily = "system-ui, -apple-system, sans-serif";
        if (font === "Inter") fontFamily = "'Inter', sans-serif";
        if (font === "Roboto") fontFamily = "'Roboto', sans-serif";
        root.style.setProperty('--font-family-admin', fontFamily);
        root.style.fontFamily = fontFamily;

        // Font Size
        let sizeValue = "16px";
        if (fontSize === "small") sizeValue = "14px";
        if (fontSize === "large") sizeValue = "17px";
        root.style.fontSize = sizeValue;
        root.style.setProperty('--font-size-base', sizeValue);

    }, [font, fontSize]);

    return (
        <AdminSettingsContext.Provider value={{ language, setLanguage, font, setFont, fontSize, setFontSize, t }}>
            <div style={{ fontFamily: 'var(--font-family-admin)', fontSize: 'var(--font-size-base)' }}>
                {children}
            </div>
        </AdminSettingsContext.Provider>
    );
}

export function useAdminSettings() {
    const context = useContext(AdminSettingsContext);
    if (context === undefined) {
        throw new Error("useAdminSettings must be used within an AdminSettingsProvider");
    }
    return context;
}
