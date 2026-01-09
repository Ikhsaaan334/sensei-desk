import { useEffect, useState } from 'react';

export default function BlueArchiveOverlay() {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    // -- Loading Screen Logic --
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setShouldRender(false), 1000); // Remove from DOM after transition
        }, 3500); // 3.5s loading simulation

        return () => clearTimeout(timer);
    }, []);

    // -- Cursor Trail Logic --
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.3) return; // Reduce particles a bit

            const particle = document.createElement('div');
            particle.className =
                'fixed pointer-events-none rounded-full bg-[#fa9cd6] z-[9999]';

            // Random size between 4px and 12px
            const size = Math.floor(Math.random() * 8) + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            particle.style.opacity = '0.8';
            particle.style.boxShadow = '0 0 6px #fa9cd6';
            particle.style.transition = 'all 0.8s ease-out';

            document.body.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 + 20}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                particle.remove();
            }, 800);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (!shouldRender) return <></>;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
            {/* SCHALE LOGO SIMULATION via CSS/SVG */}
            <div
                className={`relative mb-12 transform transition-all duration-1000 ${isLoading ? 'scale-100' : 'scale-110 opacity-0'}`}
            >
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    className="animate-spin-slow text-sky-500"
                >
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        className="animate-[spin_10s_linear_infinite]"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-black tracking-widest text-[#12D0F2] italic">
                        SCHALE
                    </div>
                </div>
                {/* Decorative Wings */}
                <div className="absolute -top-8 -right-8 text-6xl text-pink-300 opacity-50">
                    ✦
                </div>
                <div className="absolute -bottom-8 -left-8 text-6xl text-pink-300 opacity-50">
                    ✦
                </div>
            </div>

            {/* CONNECTING TEXT */}
            <div className="flex flex-col items-center space-y-4">
                <div className="text-xl font-bold tracking-[0.2em] text-slate-400">
                    CONNECTING TO SERVER...
                </div>
                {/* Loading Bar */}
                <div className="h-2 w-80 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                    <div className="h-full w-full origin-left animate-[loading_2.5s_ease-in-out_infinite] bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                </div>
                <div className="mt-2 font-mono text-xs text-slate-300">
                    UID: 00000001
                </div>
            </div>
        </div>
    );
}
