"use client";

const locations = [
    { name: "Vietnam", flag: "vn", left: "73%", top: "43%" },
    { name: "Thailand", flag: "th", left: "70%", top: "48%" },
    { name: "Cambodia", flag: "kh", left: "72%", top: "50%" },
    { name: "Malaysia", flag: "my", left: "73%", top: "57%" },
    { name: "Singapore", flag: "sg", left: "72%", top: "58%" },
    { name: "Indonesia", flag: "id", left: "76%", top: "62%" },
];

export default function SoutheastAsiaMap() {
    return (
        <section className="relative h-[420px] overflow-hidden bg-[#0f1117] py-16 text-white sm:h-[500px] lg:h-[560px]">
            <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(#64748b_0.8px,transparent_0.8px)] [background-size:12px_12px]" />
            <div className="pointer-events-none absolute left-[58%] top-1/2 h-[78%] w-[62%] -translate-y-1/2 rounded-[50%] border border-red-500/10 opacity-60" />

            <div className="relative mx-auto h-full max-w-7xl px-6">
                <div className="absolute left-6 top-4 z-20 max-w-sm sm:left-10 sm:top-8">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Maintech Vietnam</p>
                    <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-5xl">Our Network</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">Kết nối kỹ thuật và đối tác công nghiệp trên toàn Đông Nam Á.</p>
                </div>

                <div className="absolute bottom-0 right-[-28%] top-0 z-10 w-[135%] origin-center scale-125 overflow-visible bg-transparent sm:top-4 sm:scale-[1.35] lg:w-[108%] lg:scale-[1.6]">
                    <div className="relative h-full w-full overflow-visible">
                    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] [background-position:center] [background-repeat:no-repeat] [background-size:100%_100%] [filter:invert(1)]" />
                    {locations.map((location) => (
                        <div key={location.name} className="group absolute overflow-visible" style={{ left: location.left, top: location.top }}>
                            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,1)] transition-transform duration-300 group-hover:scale-125" />
                            <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 flex min-w-max -translate-x-1/2 translate-y-2 scale-90 items-center gap-2 whitespace-nowrap overflow-visible border border-cyan-300/80 bg-slate-950/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider leading-none text-white opacity-0 shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                                <img src={`https://flagcdn.com/w80/${location.flag}.png`} alt={`${location.name} flag`} className="h-4 w-6 object-cover" />
                                {location.name}
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
