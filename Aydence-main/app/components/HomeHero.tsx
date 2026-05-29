"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (textRef.current) {
      const elements = textRef.current.children;
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-gray-50 text-gray-900">
      {/* Ambient Background Gradient for Desktop (Light Theme) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-gray-50 to-gray-50"></div>

      <div className="centered-content relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Left Side: Text Content */}
        <div ref={textRef} className="w-full max-w-2xl md:w-[55%]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-gray-900 drop-shadow-sm">
            Build a Thriving Career in Germany
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 font-medium">
            Expert career strategy and professionalism coaching with Dr. Shoba Kapoor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#about" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center justify-center shadow-lg hover:shadow-blue-600/30">
              Learn More
            </Link>
            <Link href="/advanced-german" className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-full transition-all flex items-center justify-center shadow-sm">
              Advanced German (C1+)
            </Link>
          </div>
        </div>

        {/* Right Side: Vertical Video Container (9:16 Aspect Ratio) */}
        <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-200 bg-gray-100">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-[1.01]"
          >
            <source src="/videos.mp4" type="video/mp4" />
          </video>
          
          {/* Audio Toggle Button inside the video frame */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-white/70 hover:bg-white/95 backdrop-blur-md border border-gray-200 rounded-full flex items-center justify-center transition-all text-gray-800 shadow-lg"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
