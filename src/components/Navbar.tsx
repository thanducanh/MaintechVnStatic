// 📍 File: src/components/Navbar.tsx
"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, User, LayoutDashboard, Settings, LogOut, ChevronDown, Wrench, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { motion, AnimatePresence } from "framer-motion";

const defaultNavLinks = [
    { name: "Trang Chủ", href: "/" },
    { name: "Về Chúng Tôi", href: "/about" },
    { name: "Dịch Vụ", href: "/services" },
    { name: "Tin Tức", href: "/news" },
    { name: "Liên Hệ", href: "/contact" },
];

function isProductsLink(item: any) {
    const href = String(item?.href || "").trim().toLowerCase();
    const vi = String(item?.label_vi || item?.name || "").trim().toLowerCase();
    const en = String(item?.label_en || "").trim().toLowerCase();
    return href === "/products" || href.startsWith("/products/") || vi.includes("sản phẩm") || en.includes("product");
}

function NavLink({ href, name, isActive, isContact = false }: { href: string; name: string; isActive: boolean; isContact?: boolean }) {
    if (isContact) {
        return <Link href={href} className="rounded-md bg-[#C8102E] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#A00D25] hover:shadow-md">{name}</Link>;
    }
    return (
        <Link href={href} className="relative py-1 outline-none group select-none">
            <span className={`text-[14px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                isActive 
                    ? "text-[#C8102E] opacity-100" 
                    : "text-slate-700 group-hover:text-[#C8102E] opacity-90 hover:opacity-100"
            }`}>
                {name}
            </span>
            {/* Underline Active/Hover State */}
            <div className={`absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#C8102E] rounded-full transition-all duration-300 origin-center ${
                isActive 
                    ? "opacity-100 scale-x-100" 
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
            }`} />
        </Link>
    );
}

function NavLinkTransparent({ href, name, isActive, isContact = false }: { href: string; name: string; isActive: boolean; isContact?: boolean }) {
    if (isContact) {
        return <Link href={href} className="rounded-md bg-[#C8102E] px-4 py-2 text-[13px] font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-[#A00D25] hover:shadow-md">{name}</Link>;
    }
    return (
        <Link href={href} className="relative py-1 outline-none group select-none">
            <span className={`text-[14px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-[#C8102E] opacity-100" : "text-slate-800 group-hover:text-[#C8102E] opacity-90 hover:opacity-100"}`}>
                {name}
            </span>
            <div className={`absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#C8102E] rounded-full transition-all duration-300 origin-center ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}`} />
        </Link>
    );
}

export default function Navbar({ initialSiteLogo, initialHomepageConfig }: { initialSiteLogo?: string | null, initialHomepageConfig?: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Keep the first SSR and client render identical. The logo is hydrated
    // after mount instead of reading a module-level cache during render.
    const [siteLogo, setSiteLogo] = useState<string | null>(initialSiteLogo || null);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [socialLinks, setSocialLinks] = useState({ telegram: "", whatsapp: "", zalo: "" });
    const [navLinks, setNavLinks] = useState(defaultNavLinks);
    // Keep the initial logo typography identical to the hydrated brand markup.
    const [headerConfig, setHeaderConfig] = useState({ logoUrl: "", brandName: "MAINTECH VIETNAM", fontFamily: "sans" });
    // Do not render stale contact data before the CMS request completes.
    const [topbarInfo, setTopbarInfo] = useState({ email: "maintechvietnam@gmail.com", hotline: "+84 918 458 399", address: "TP. Thuận An, Bình Dương, Việt Nam" });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 20);
    }, []);

    useEffect(() => {
        setIsLoggedIn(false);
        window.addEventListener("scroll", handleScroll, { passive: true });

        if (initialHomepageConfig) {
            try {
                const content = typeof initialHomepageConfig === 'string' ? JSON.parse(initialHomepageConfig) : (initialHomepageConfig?.content ? JSON.parse(initialHomepageConfig.content) : initialHomepageConfig);
                const topbar = content?.topbar || {};
                const header = content?.header || {};
                setHeaderConfig({
                    logoUrl: typeof header.logoUrl === "string" ? header.logoUrl : "",
                    brandName: typeof header.brandName === "string" && header.brandName.trim() ? header.brandName.trim().toUpperCase() : "MAINTECH VIETNAM",
                    fontFamily: typeof header.fontFamily === "string" ? header.fontFamily : "sans",
                });
                setTopbarInfo({
                    email: typeof topbar.email === "string" && topbar.email.trim() ? topbar.email.trim() : "maintechvietnam@gmail.com",
                    hotline: typeof topbar.hotline === "string" && topbar.hotline.trim() ? topbar.hotline.trim() : "+84 918 458 399",
                    address: typeof topbar.address === "string" && topbar.address.trim() ? topbar.address.trim() : "TP. Thuận An, Bình Dương, Việt Nam",
                });
                setSocialLinks({
                    telegram: typeof topbar.telegram === "string" ? topbar.telegram.trim() : "",
                    whatsapp: typeof topbar.whatsapp === "string" ? topbar.whatsapp.trim() : "",
                    zalo: typeof topbar.zalo === "string" ? topbar.zalo.trim() : "",
                });
                if (Array.isArray(topbar.navLinks) && topbar.navLinks.length > 0) {
                    const cmsLinks = topbar.navLinks.filter((item: any) => typeof item?.href === "string" && item.href.trim() && !isProductsLink(item)).map((item: any) => ({
                        href: item.href,
                        name: item.label_vi || item.label_en || item.href,
                        name_en: item.label_en || item.label_vi || item.href,
                    }));
                    setNavLinks(cmsLinks.length > 0 ? cmsLinks : defaultNavLinks);
                }
            } catch {
                setSocialLinks({ telegram: "", whatsapp: "", zalo: "" });
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleScroll]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        setIsUserDropdownOpen(false);
        window.location.href = "/login";
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(language === "VN" ? "EN" : "VN");
    }, [language, setLanguage]);

    const fullAddress = typeof topbarInfo.address === "string" ? topbarInfo.address.trim() : "";
    const safeAddress = fullAddress.length > 34 ? `${fullAddress.slice(0, 31).trimEnd()}…` : fullAddress;

    const zaloNumber = topbarInfo.hotline || "84918458399";
    const configuredZalo = socialLinks.zalo.trim();
    const zaloHref = configuredZalo.startsWith("http://") || configuredZalo.startsWith("https://")
        ? configuredZalo
        : `https://zalo.me/${(configuredZalo || zaloNumber).replace(/[^\d]/g, "")}`;
    const waNumber = socialLinks.whatsapp || topbarInfo.hotline || "84918458399";
    const cleanWaNumber = waNumber.replace(/[^\d+]/g, "");
    const whatsappHref = waNumber.startsWith("http://") || waNumber.startsWith("https://")
        ? waNumber
        : `https://wa.me/${cleanWaNumber.replace(/^\+/, "")}`;
    const telegramValue = socialLinks.telegram.trim();
    const telegramHref = telegramValue.startsWith("http://") || telegramValue.startsWith("https://")
        ? telegramValue
        : `https://t.me/${telegramValue || "maintechvn"}`;

    return (
        <nav className="sticky top-0 z-[9999] isolate w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="topbar-compact relative z-20 block h-8 overflow-visible bg-[#0a0f1d] text-[11px] text-slate-300 sm:h-10 sm:text-xs">
                <div className="grid h-full w-full grid-cols-[minmax(0,1fr)_auto] items-stretch bg-[#0a0f1d]">
                    <div className="flex h-full w-full min-w-0 items-center justify-start gap-4 bg-[#0a0f1d] px-4 py-0 sm:gap-5 sm:px-6 xl:px-[150px]">
                        <a href={`mailto:${topbarInfo.email}`} className="flex shrink-0 items-center justify-center gap-2 hover:text-white">
                            <Mail size={14} /> 
                            <span className="hidden sm:inline">{topbarInfo.email}</span>
                        </a>
                        <a href={`tel:${topbarInfo.hotline.replace(/[^\d+]/g, "")}`} className="flex shrink-0 items-center justify-center gap-1.5 hover:text-white font-medium">
                            <Phone size={14} /> 
                            <span>{topbarInfo.hotline}</span>
                        </a>
                        {fullAddress && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`} title={fullAddress} target="_blank" rel="noopener noreferrer" className="hidden min-w-0 max-w-[280px] items-center gap-2 whitespace-nowrap transition-colors duration-200 hover:text-red-300 hover:underline cursor-pointer md:flex"><MapPin size={14} className="shrink-0" /><span className="topbar-marquee min-w-max">{safeAddress}</span></a>}
                    </div>
                    <div className="ml-auto flex h-full w-full min-w-0 items-center justify-end gap-3 bg-[#C8102E] px-4 py-0 text-xs font-semibold text-white [clip-path:polygon(14px_0,100%_0,100%_100%,0_100%)] sm:gap-4 sm:px-6 sm:text-sm xl:px-[150px]">
                        <button onClick={toggleLanguage} className="flex shrink-0 items-center justify-center gap-1 sm:border-r sm:border-white/30 sm:pr-4 font-bold">
                            <Globe size={14} />
                            <span className="sm:hidden">{language === "VN" ? "VN" : "EN"}</span>
                            <span className="hidden sm:inline">{language === "VN" ? "Tiếng Việt" : "English"}</span>
                            <ChevronDown size={12} />
                        </button>
                        <span className="hidden items-center gap-3 sm:flex"><a href={zaloHref} target="_blank" rel="noopener noreferrer" aria-label="Zalo" title="Zalo" className="text-sm font-black hover:text-white">Z</a><span className="h-5 w-px bg-white/30" /></span>
                        <span className="hidden items-center gap-3 sm:flex"><a href={whatsappHref} target={whatsappHref.startsWith("tel:") ? undefined : "_blank"} rel={whatsappHref.startsWith("tel:") ? undefined : "noopener noreferrer"} aria-label="WhatsApp" title="WhatsApp" className="hover:text-white"><MessageCircle size={17} /></a><span className="h-5 w-px bg-white/30" /></span>
                        <a href={telegramHref} target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram" className="hidden hover:text-white sm:block">
                            <Send size={15} className="mr-0.5" />
                        </a>
                        <span className="ml-1 hidden h-5 border-l border-white/40 pl-3 sm:block" aria-hidden="true" />
                        <Link href="/admin" aria-label="CMS Admin" title="CMS Admin" className="hidden shrink-0 transition-colors hover:text-white/70 sm:block"><User size={17} /></Link>
                    </div>
                </div>
            </div>
            <div className="relative z-10 mx-auto flex min-h-16 max-w-[1600px] items-center justify-between px-6 py-2 md:px-12 md:py-2.5">

                {/* LOGO */}
                <Link
                    href="/"
                    aria-label="Về trang chủ Maintech Vietnam"
                    onClick={(event) => {
                        if (pathname === "/") {
                            event.preventDefault();
                            window.location.reload();
                        }
                    }}
                    className="group flex cursor-pointer items-center gap-3 shrink-0 outline-none"
                >
                    <div className="relative h-8 w-8 shrink-0">
                        <Image
                            src={headerConfig.logoUrl || siteLogo || "/images/site-logo-maintech.png"}
                            alt="Maintech Logo"
                            fill
                            sizes="180px"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <div className="flex items-baseline select-none text-lg font-bold tracking-tight [font-family:var(--font-montserrat)] md:text-xl">
                            <span className="text-[#C8102E]">MAIN</span>
                            <span className="text-[#00A3FF]">TECH</span>
                            <span className="ml-1 text-slate-900">VIET NAM</span>
                        </div>
                    </div>
                </Link>


                {/* MENU DESKTOP */}
                <div className="hidden lg:flex items-center gap-5">
                    <div className="flex items-center gap-4">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "/" && pathname?.startsWith(link.href));
                            
                            // Map href to translation key
                            const linkKey = link.href === "/" ? "nav.home" : `nav.${link.href.replace("/", "")}`;
                            const localizedName = (language === "EN" ? (link as any).name_en : link.name) || t(linkKey) || link.name;

                            return isScrolled ? (
                                <NavLink key={link.href} href={link.href} name={localizedName} isActive={isActive} isContact={link.href === "/contact"} />
                            ) : (
                                <NavLinkTransparent key={link.href} href={link.href} name={localizedName} isActive={isActive} isContact={link.href === "/contact"} />
                            );
                        })}
                    </div>

                    <div className={`flex items-center gap-3 border-l pl-4 transition-colors duration-300 ${isScrolled ? "border-slate-200" : "border-white/20"
                        }`}>
                        {isLoggedIn && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-[13px] font-semibold uppercase tracking-widest transition-all duration-200 ${isUserDropdownOpen
                                            ? "bg-red-50 text-[#C8102E] border border-red-200"
                                            : "bg-[#C8102E] shadow-sm text-white border border-transparent hover:bg-[#b00e28]"
                                        }`}
                                    aria-expanded={isUserDropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <Wrench size={12} />
                                    <span>Admin</span>
                                    <ChevronDown size={11} className={`transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {isUserDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.12, ease: "easeOut" }}
                                            className="absolute right-0 z-[100] mt-2 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 text-slate-700 shadow-md"
                                        >
                                            <div className="px-3.5 py-2.5 border-b border-slate-50 mb-1">
                                                <p className="text-[11px] font-semibold text-slate-700">Tài Khoản Hệ Thống</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">Maintech Administrator</p>
                                            </div>

                                            <Link
                                                href="/admin"
                                                onClick={() => setIsUserDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                            >
                                                <LayoutDashboard size={13} />
                                                Bảng điều khiển
                                            </Link>
                                            <Link
                                                href="/admin/cms/settings"
                                                onClick={() => setIsUserDropdownOpen(false)}
                                                className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                            >
                                                <Settings size={13} />
                                                Cài đặt hệ thống
                                            </Link>

                                            <div className="h-px bg-slate-100 my-1 mx-3" />

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-red-500 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <LogOut size={13} />
                                                Đăng xuất
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    className="lg:hidden p-1.5 rounded transition-colors hover:bg-white/10 outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-slate-950/45 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="h-full w-[300px] max-w-[86vw] overflow-y-auto bg-[#0b1221] text-white shadow-2xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex justify-end px-5 pt-7 pb-5">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Đóng menu"
                                    className="flex h-10 w-10 items-center justify-center border border-white/80 text-white transition-colors hover:bg-white hover:text-[#0b1221]"
                                >
                                    <X size={22} />
                                </button>
                            </div>
                            {navLinks.map((link) => {
                                const isActive =
                                    pathname === link.href ||
                                    (link.href !== "/" && pathname?.startsWith(link.href));
                                
                                const linkKey = link.href === "/" ? "nav.home" : `nav.${link.href.replace("/", "")}`;
                                const localizedName = (language === "EN" ? (link as any).name_en : link.name) || t(linkKey) || link.name;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center justify-between border-l-2 px-5 py-4 text-[15px] font-medium transition-colors ${isActive
                                                ? "border-[#C8102E] bg-white/10 text-white"
                                                : "border-transparent text-white/85 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <span>{localizedName}</span>
                                        <span className="text-xl leading-none text-white/70">›</span>
                                    </Link>
                                );
                            })}

                            <div className="mx-5 mt-4 border-t border-white/20 pt-5 pb-2 space-y-4 text-[13px] text-white/80">
                                <a href={`mailto:${topbarInfo.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                                    <Mail size={15} className="shrink-0 text-white/60" />
                                    <span className="truncate">{topbarInfo.email}</span>
                                </a>
                                <a href={`tel:${topbarInfo.hotline.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 hover:text-white transition-colors font-medium">
                                    <Phone size={15} className="shrink-0 text-white/60" />
                                    <span>{topbarInfo.hotline}</span>
                                </a>
                                {fullAddress && (
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
                                        <MapPin size={15} className="shrink-0 text-white/60 mt-0.5" />
                                        <span className="leading-snug">{fullAddress}</span>
                                    </a>
                                )}
                            </div>

                            <div className="mx-5 mt-2 flex items-center gap-4 py-3 text-white/90">
                                <a href={zaloHref} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#C8102E] transition-colors font-black text-[13px]">Z</a>
                                <a href={whatsappHref} target={whatsappHref.startsWith("tel:") ? undefined : "_blank"} rel={whatsappHref.startsWith("tel:") ? undefined : "noopener noreferrer"} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#C8102E] transition-colors"><MessageCircle size={16} /></a>
                                <a href={telegramHref} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#C8102E] transition-colors"><Send size={14} className="mr-0.5" /></a>
                            </div>

                            <div className="mx-5 mt-4 flex items-center justify-between border-t border-white/20 px-0 py-4 mb-2">
                                <span className="text-[12px] text-white/60">Ngôn ngữ (Language)</span>
                                <button
                                    onClick={toggleLanguage}
                                    className="flex items-center gap-1.5 text-[13px] font-bold text-white hover:text-[#C8102E] transition-colors outline-none"
                                >
                                    <Globe size={14} />
                                    {language === "VN" ? "Tiếng Việt" : "English"}
                                </button>
                            </div>

                            {!isLoggedIn && (
                                <div className="px-5 pb-8">
                                    <Link href="/admin" className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 py-3 text-[13px] font-bold uppercase tracking-wider text-white/90 hover:bg-[#C8102E] hover:text-white transition-colors">
                                        <User size={15} />
                                        Đăng nhập CMS
                                    </Link>
                                </div>
                            )}

                            {isLoggedIn && (
                                <>
                                    <div className="mx-5 h-px bg-white/20" />
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2.5 px-5 py-4 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <LayoutDashboard size={14} />
                                        Quản trị hệ thống
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2.5 px-5 py-4 text-[13px] font-medium text-red-300 hover:bg-white/10 transition-colors"
                                    >
                                        <LogOut size={14} />
                                        Đăng xuất
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
