// import tescoLogo from '@/images/Tesco_logo.png';
import { type SharedData } from '@/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CVSLogo from './cvslogo';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
];

export default function Welcome() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const { auth, ref } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [storedRef, setStoredRef] = useState<string | null>(null);

    useEffect(() => {
        if (ref) {
            console.log(ref);
            setStoredRef(ref);
        }
    }, [ref]);
    //yawa
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
                <span className="text-white font-semibold text-sm">CVS Pharmacy</span>
            </div>

            {/* Centered hero card */}
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center z-10">
                <CVSLogo />
                <h1 className="text-xl font-bold text-gray-800 mb-1 mt-2">CVS Pharmacy</h1>
                <p className="text-sm text-gray-500 mb-6">
                    First Drive-Thru Pharmacy in the Philippines
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/login"
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition">
                        Log In
                    </a>
                    <a href="/register"
                        className="px-5 py-2 border border-red-600 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition">
                        Sign Up
                    </a>
                </div>
            </div>

            {/* Top right auth buttons */}
            <div className="absolute top-6 right-6 flex gap-2 z-10">
                <a href="/login"
                    className="text-white border border-white px-4 py-1.5 rounded-lg text-sm hover:bg-white hover:text-black transition">
                    Log In
                </a>
                <a href="/register"
                    className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                    Register
                </a>
            </div>
        </div>
    );
}
