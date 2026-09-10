// 📍 File: src/components/SectionHeading.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    highlight?: string;
    align?: "left" | "center";
    description?: string;
    titleClassName?: string;
}

export default function SectionHeading({
    eyebrow,
    title,
    highlight,
    align = "center",
    description,
    titleClassName = ""
}: SectionHeadingProps) {
    const { language } = useLanguage();
    const isCenter = align === "center";
    
    // Helper to render title with highlight
    const renderTitle = () => {
        if (!highlight) return title;
        
        // Find index of highlight keyword to split properly
        const lowerTitle = title.toLowerCase();
        const lowerHighlight = highlight.toLowerCase();
        const startIdx = lowerTitle.indexOf(lowerHighlight);
        
        if (startIdx === -1) return title;
        
        const before = title.substring(0, startIdx);
        const keyword = title.substring(startIdx, startIdx + highlight.length);
        const after = title.substring(startIdx + highlight.length);
        
        return (
            <>
                {before}
                <span className="text-[#C8102E] font-black">
                    {keyword}
                </span>
                {after}
            </>
        );
    };

    return (
        <div className={`space-y-4 max-w-4xl ${isCenter ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
                <div className={`${isCenter ? "text-center" : ""}`}>
                    <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#C8102E]">
                        {eyebrow}
                    </span>
                </div>
            )}
            
            <h2 className={`text-3xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05] text-slate-950 uppercase [text-shadow:_0_1px_1px_rgba(0,0,0,0.05)] ${titleClassName}`}>
                {renderTitle()}
            </h2>
            
            {description && (
                <p className={`mt-6 text-slate-500 text-sm md:text-[15px] font-medium max-w-2xl leading-relaxed ${isCenter ? "mx-auto" : ""}`}>
                    {description}
                </p>
            )}
        </div>
    );
}
