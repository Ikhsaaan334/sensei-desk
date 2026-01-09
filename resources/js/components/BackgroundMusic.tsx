import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export default function BackgroundMusic() {
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // Blue Archive BGM: Constant Moderato (or user provided: fhUGHSCeZ74)
    const VIDEO_ID = 'fhUGHSCeZ74';

    useEffect(() => {
        // 1. Load YouTube IFrame API Script if not exists
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // 2. Initialize Player when API is ready
        // Note: Assigning to window property to be called by the API
        window.onYouTubeIframeAPIReady = () => {
            if (playerRef.current) return; // Prevent double init

            playerRef.current = new window.YT.Player('ba-bgm-player', {
                height: '0',
                width: '0',
                videoId: VIDEO_ID,
                playerVars: {
                    autoplay: 1, // Try autoplay
                    controls: 0, // Hide controls
                    loop: 1, // Loop video
                    playlist: VIDEO_ID, // Required for loop to work
                    playsinline: 1,
                },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                    onError: (e: any) => console.log('YT Error:', e),
                },
            });
        };

        // If API is already loaded (from a previous session or reload), manually trigger
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
    }, []);

    const onPlayerReady = (event: any) => {
        setIsPlayerReady(true);
        // Set volume lower (20%) - nice background level
        event.target.setVolume(20);
        // Attempt play (might be blocked by browser policy until interaction)
        event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
        // YT.PlayerState.PLAYING = 1
        if (event.data === 1) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (!playerRef.current || !playerRef.current.playVideo) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    // Auto-retry play on first click if blocked
    useEffect(() => {
        const handleInteraction = () => {
            if (isPlayerReady && !isPlaying && playerRef.current) {
                playerRef.current.playVideo();
            }
        };

        if (isPlayerReady && !isPlaying) {
            window.addEventListener('click', handleInteraction, { once: true });
        }

        return () => window.removeEventListener('click', handleInteraction);
    }, [isPlayerReady, isPlaying]);

    return (
        <div className="fixed right-4 top-4 z-[9998] flex items-center gap-2">
            {/* Hidden Container for YouTube Iframe - Absolute to avoid layout shift */}
            <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <div id="ba-bgm-player"></div>
            </div>

            {/* Music Button */}
            <button
                onClick={togglePlay}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 md:h-12 md:w-12 ${
                    isPlaying
                        ? 'bg-primary rotate-0 border-white text-white'
                        : 'bg-background border-border text-muted-foreground -rotate-12 hover:scale-110'
                } `}
                title={isPlaying ? 'Pause BGM' : 'Play BGM'}
            >
                {isPlaying ? (
                    // Playing Icon (Sound Wave)
                    <div className="flex h-4 items-end gap-[2px]">
                        <span className="h-2 w-1 animate-[music-bar_0.5s_ease-in-out_infinite] bg-white"></span>
                        <span className="h-4 w-1 animate-[music-bar_0.5s_ease-in-out_infinite_0.1s] bg-white"></span>
                        <span className="h-3 w-1 animate-[music-bar_0.5s_ease-in-out_infinite_0.2s] bg-white"></span>
                    </div>
                ) : (
                    // Play Icon (Triangle) or Music Note
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                )}
            </button>

            {/* Animated Ring when playing */}
            {isPlaying && (
                <div className="bg-primary pointer-events-none absolute inset-0 animate-ping rounded-full opacity-20"></div>
            )}
        </div>
    );
}
