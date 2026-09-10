"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { X, Award, UserRound } from "lucide-react";

export default function OurExpertTeam({ config }: { config?: any }) {
    const { language } = useLanguage();
    const isVN = language === "VN";
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [showAllMembers, setShowAllMembers] = useState(false);
    useEffect(() => { setActiveFilter("all"); setShowAllMembers(false); }, [isVN]);
    const team = config?.team;
    const cssSize = (value: any, fallback: string) => value == null || value === "" ? fallback : /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value);
    const safeColor = (value: any, fallback: string) => typeof value === "string" && (/^#[0-9A-Fa-f]{3,8}$/.test(value) || /^(rgb|hsl)a?\(/.test(value)) ? value : fallback;
    const textValue = (value: any, lang: "vi" | "en") => value && typeof value === "object" ? String(value[lang] ?? value.vi ?? value.en ?? "") : String(value ?? "");
    const portraitFor = (member: any) => {
        const image = String(member?.image || "");
        const looksLikeNonPortrait = image.includes("Screenshot2026") || image.includes("TrinhHoanVu_Kalmar") || image.includes("DongVanY_Kalmar") || image.includes("MaiDuyThai_Kalmar") || image.includes("certificate");
        return !image || looksLikeNonPortrait ? "" : image;
    };
    const initialsFor = (member: any) => String(member?.name || member?.name_en || "MT").trim().split(/\s+/).slice(-2).map((part: string) => part[0]).join("").toUpperCase();
    const AvatarFallback = ({ member, large = false }: { member: any; large?: boolean }) => (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#dce6f2] via-[#eef3f8] to-[#c4d2e2] text-[#071b49]">
            <div className={`${large ? "h-24 w-24" : "h-20 w-20"} flex items-center justify-center rounded-full border-4 border-white/80 bg-white/70 shadow-sm`}>
                <UserRound size={large ? 46 : 38} strokeWidth={1.5} />
            </div>
            <span className="mt-3 rounded-full bg-[#071b49]/90 px-3 py-1 text-xs font-bold tracking-[0.2em] text-white">{initialsFor(member)}</span>
        </div>
    );
    const Portrait = ({ member, large = false }: { member: any; large?: boolean }) => {
        const image = portraitFor(member);
        return image ? <Image src={image} alt={member.name || "Maintech expert"} fill className="scale-[1.02] object-cover transition-transform duration-700 group-hover:scale-105" /> : <AvatarFallback member={member} large={large} />;
    };
    const members = Array.isArray(team?.members) ? team.members.map((member: any) => ({
        ...member,
        role_vi: textValue(member.role_vi, "vi") || textValue(member.position, "vi"),
        role_en: textValue(member.role_en, "en") || textValue(member.position, "en"),
        credentials: Array.isArray(member.certificates) ? member.certificates : (Array.isArray(member.credentials) ? member.credentials : [])
        })).filter((member: any) => member?.name || member?.name_en || member?.image).slice(0, Number(team?.max_members) || 4) : [];
    if (!team || members.length === 0) return null;
    const filterOptions = [{ id: "all", label: isVN ? "Tất cả nhân sự" : "All experts" }, ...Array.from(new Set(members.map((member: any) => isVN ? member.role_vi : (member.role_en || member.role_vi)).filter(Boolean))).slice(0, 6).map((role: any) => ({ id: role, label: role }))];
    const filteredMembers = activeFilter === "all" ? members : members.filter((member: any) => (isVN ? member.role_vi : (member.role_en || member.role_vi)) === activeFilter);
    const visibleMembers = showAllMembers ? filteredMembers : filteredMembers.slice(0, 4);

    return (
        <section id="expert-team" className="bg-[#f8fafc] py-24 lg:py-32">
            <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
                <div className="mx-auto mb-12 max-w-3xl text-center [&>div:first-child]:justify-center">
                    <span style={{ color: "#C8102E", fontSize: cssSize(team.badge_size, "14px") }} className="mb-2 block text-center text-xs font-bold uppercase tracking-wider md:text-sm">{textValue(isVN ? team.badge_vi : (team.badge_en || team.badge_vi), isVN ? "vi" : "en") || (isVN ? "ĐỘI NGŨ CHUYÊN GIA" : "EXPERT TEAM")}</span>
                    <h2 style={{ color: safeColor(team.title_color, "#0B1221"), fontSize: cssSize(team.title_size, "40px") }} className="mt-5 whitespace-nowrap text-[clamp(1.75rem,4vw,40px)] font-black uppercase leading-tight">{textValue(isVN ? team.title_vi : (team.title_en || team.title_vi), isVN ? "vi" : "en") || (isVN ? "ĐỘI NGŨ CHUYÊN GIA" : "OUR EXPERT TEAM")}</h2>
                </div>
                {team?.show_filters && filterOptions.length > 1 && <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {filterOptions.map((filter: any) => <button key={filter.id} type="button" onClick={() => setActiveFilter(filter.id)} className={`rounded-full border px-4 py-2 text-[11px] font-bold transition ${activeFilter === filter.id ? "border-[#C8102E] bg-[#C8102E] text-white" : "border-slate-200 bg-white text-slate-500 hover:border-[#C8102E] hover:text-[#C8102E]"}`}>{filter.label}</button>)}
                </div>}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {visibleMembers.map((member: any, index: number) => (
                        <article key={`${member.name}-${index}`} onClick={() => setSelectedMember(member)} className="group relative h-[440px] cursor-pointer overflow-hidden bg-slate-900 shadow-lg">
                            <Portrait member={member} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            <div className="absolute bottom-0 w-full p-6">
                                <h3 className="text-xl font-black uppercase text-white">{textValue(isVN ? member.name : (member.name_en || member.name), isVN ? "vi" : "en")}</h3>
                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#C8102E]">{textValue(isVN ? (member.role_vi || member.role_en) : (member.role_en || member.role_vi), isVN ? "vi" : "en")}</p>
                                <span className="mt-3 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/90">{(member.credentials || []).length} {isVN ? "chứng chỉ" : "certificates"}</span>
                            </div>
                        </article>
                    ))}
                </div>
                {team?.show_more !== false && filteredMembers.length > 4 && <div className="mt-10 text-center">
                    <button type="button" onClick={() => setShowAllMembers((current) => !current)} className="inline-flex items-center rounded-full border border-[#C8102E] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#C8102E] transition hover:bg-[#C8102E] hover:text-white">
                        {showAllMembers ? (isVN ? "Thu gọn" : "Show less") : (isVN ? "Xem thêm nhân sự" : "View all experts")}
                    </button>
                </div>}
            </div>
            {selectedMember && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm" onClick={() => setSelectedMember(null)}>
                    <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedMember(null)} className="absolute right-5 top-5 text-slate-400 hover:text-[#C8102E]"><X /></button>
                        <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                            <div className="relative h-52 overflow-hidden rounded-xl bg-slate-100">
                                <Portrait member={selectedMember} large />
                            </div>
                            <div>
                                <h3 className="pr-10 text-2xl font-black uppercase text-slate-900">{textValue(isVN ? selectedMember.name : (selectedMember.name_en || selectedMember.name), isVN ? "vi" : "en")}</h3>
                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[#C8102E]">{textValue(isVN ? (selectedMember.role_vi || selectedMember.role_en) : (selectedMember.role_en || selectedMember.role_vi), isVN ? "vi" : "en")}</p>
                                <div className="mt-5 grid gap-2 text-sm text-slate-600">
                                    <p><b>{isVN ? "Kinh nghiệm:" : "Experience:"}</b> {selectedMember.experience || (isVN ? "Hơn 15 năm trong lĩnh vực thiết bị công nghiệp." : "Over 15 years in industrial equipment.")}</p>
                                    <p><b>{isVN ? "Chuyên môn:" : "Specialization:"}</b> {selectedMember.specialization || (isVN ? "Thiết bị cảng, cầu trục và hệ thống nâng hạ." : "Port equipment, cranes, and lifting systems.")}</p>
                                    <p><b>{isVN ? "Ngôn ngữ:" : "Languages:"}</b> {selectedMember.languages || "Tiếng Việt / English"}</p>
                                </div>
                            </div>
                        </div>
                        <h4 className="mt-8 border-b border-slate-200 pb-3 text-lg font-black text-slate-900">{isVN ? "Năng lực & bằng cấp" : "Experience & qualifications"}</h4>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {(Array.isArray(selectedMember.certificates) ? selectedMember.certificates : (Array.isArray(selectedMember.credentials) ? selectedMember.credentials : (() => { try { return JSON.parse(selectedMember.credentials || "[]"); } catch { return []; } })())).map((credential: any, index: number) => (
                                <div key={index} className="rounded-xl border border-slate-200 p-4">
                                    {credential.image && <img src={credential.image} alt={credential.name || "Credential"} className="mb-3 h-32 w-full object-contain" />}
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Award size={16} className="text-[#C8102E]" />{textValue(isVN ? (credential.title_vi || credential.name_vi || credential.name) : (credential.title_en || credential.name_en || credential.title_vi || credential.name_vi || credential.name), isVN ? "vi" : "en")}</div>
                                    {credential.year && <p className="mt-1 text-xs text-slate-500">{textValue(credential.year, isVN ? "vi" : "en")}</p>}
                                </div>
                        ))}
                        {(!selectedMember.credentials || selectedMember.credentials.length === 0) && (!selectedMember.certificates || selectedMember.certificates.length === 0) && <div className="space-y-2 text-sm text-slate-600"><p>✓ {isVN ? "Kỹ thuật thiết bị nâng hạ công nghiệp" : "Industrial lifting equipment engineering"}</p><p>✓ {isVN ? "Khảo sát, thiết kế và lắp đặt thiết bị cảng" : "Port equipment survey, design, and installation"}</p><p>✓ {isVN ? "Bảo trì, sửa chữa và tối ưu dây chuyền" : "Maintenance, repair, and production line optimization"}</p></div>}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
