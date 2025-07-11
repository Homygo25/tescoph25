// import tescoLogo from '@/images/Tesco_logo.png';
import { useEffect } from 'react';
import CVSLogo from './cvslogo';

export default function Welcome() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/login';
        }, 2500); // 2.5 seconds splash
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: "url('/CVSheropage.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Top left logo/brand */}
            <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <CVSLogo />
                {/* Removed duplicate CVS Pharmacy text for cleaner branding */}
            </div>

            {/* Centered hero card with only logo and subtitle, no buttons */}
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center z-10">
                <CVSLogo />
                <p className="text-sm text-gray-500 mb-6">
                    First Drive-Thru Pharmacy in the Philippines
                </p>
            </div>
        </div>
    );
}
