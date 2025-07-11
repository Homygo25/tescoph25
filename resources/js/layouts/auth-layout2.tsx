import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import bgImage from '../images/cvs-pharmacy-bg.png';

export default function AuthLayout2({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="backdrop-blur-lg bg-black/60 border border-white/30 rounded-2xl shadow-2xl flex w-full max-w-sm flex-col justify-center gap-7 px-5 py-10" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                {children}
            </div>
        </div>
    );
}
