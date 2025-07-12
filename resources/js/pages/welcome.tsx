
import React from 'react';
import CVSLogo from './cvslogo';

// TypewriterText must be declared outside the component
/**
 * TypewriterText component for typewriter effect on text.
 * @param {{ text: string; className?: string; show: boolean }} props
 */

// Add animation styles to the document head (only once)
if (typeof window !== 'undefined' && !document.getElementById('hero-animations')) {
  const style = document.createElement('style');
  style.id = 'hero-animations';
  style.innerHTML = `
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
    .delay-200 { animation-delay: 0.2s; }
    .logo-glow { animation: glow 2.5s ease-in-out infinite; }
    @keyframes glow {
      0%, 100% { filter: drop-shadow(0 0 0px #cfe5ff); }
      50% { filter: drop-shadow(0 0 8px #b3d4fc); }
    }
  `;
  document.head.appendChild(style);
}

export default function Welcome() {
    React.useEffect(() => {
        // Typewriter effect for tagline
        const tagline = "The First Drive-Thru Pharmacy in the Philippines";
        let i = 0;
        const el = document.getElementById("tagline");
        if (!el) return;
        el.innerHTML = "";
        function typeWriter() {
            if (i < tagline.length && el) {
                el.innerHTML += tagline.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        }
        typeWriter();

        // 5-second redirect
        const timer = setTimeout(() => {
            window.location.href = '/login';
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 text-center">
            {/* Logo with soft pulse glow */}
            <img
                src="/logoCvs.png"
                alt="CVS Logo"
                className="h-40 mb-4 animate-fade-in-up logo-glow"
                style={{ maxWidth: 320 }}
            />
            {/* Tagline (typewriter effect) */}
            <h1 id="tagline" className="text-2xl font-semibold text-gray-700 animate-fade-in-up delay-200"></h1>
        </div>
    );
}
