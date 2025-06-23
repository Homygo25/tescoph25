import { type SharedData } from '@/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import bgImage from '../images/1.jpg';
import video1 from '../images/welcome_video.mp4';
import Tescologo from '../pages/tescologo';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
];

export default function Welcome() {
    const { auth, ref } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [storedRef, setStoredRef] = useState<string | null>(null);

    useEffect(() => {
        if (ref) {
            console.log(ref);
            setStoredRef(ref);
        }
    }, [ref]);

    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat">
            <header className="sticky inset-x-0 top-0 z-50 bg-white">
                <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Tesco</span>
                            <Tescologo />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
                        {auth.user ? (
                            <Link
                                href={auth.user.role === 'admin' ? route('admin-pending-deposits') : route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-sm font-bold text-white hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#00539f] px-5 py-1.5 text-sm font-bold text-[#00539f] hover:border-[#00539f]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-1/2 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Tesco</span>
                                <Tescologo />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="divide-y divide-gray-200">
                                <div className="py-6">
                                    {auth.user ? (
                                        <Link
                                            href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <div className="relative isolate h-[100vh] overflow-auto px-6 pb-52 lg:px-8">
                <div className="mx-auto my-5 flex max-w-5xl flex-col gap-15 rounded-lg bg-white/90 p-8 py-7 shadow-lg backdrop-blur-md lg:flex-row">
                    {/* Desktop Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        controls
                        className="hidden h-auto w-full rounded-xl md:block lg:mt-2"
                    >
                        <source src={video1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="lg:pt-10">
                        <p className="text-center text-6xl font-semibold tracking-tight text-gray-900 sm:text-6xl md:text-left">
                            We invest in <span className="text-red-500">unlocking</span> the world's possibilities.
                        </p>
                        <p className="mt-8 text-center text-lg font-medium text-gray-500 sm:text-xl md:text-left">
                            At Tesco Ph, we concentrate on markets where technology, innovation, and capital have the
                            potential to unlock long-term value and stimulate economic growth.
                        </p>
                        <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                    className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-lg font-bold text-white hover:border-[#19140035]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent bg-[#00539f] px-5 py-1.5 text-lg font-bold text-white hover:border-[#19140035]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#00539f] px-5 py-1.5 text-lg font-bold text-[#00539f] hover:border-[#00539f]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="mt-10 flex justify-center gap-10 md:justify-start">
                            <div>
                                <p className="text-xl font-black text-red-500">10,000 +</p>
                                <p className="text-sm font-medium text-gray-500">Satisfied Investors</p>
                            </div>
                            <div>
                                <p className="text-xl font-black text-blue-500">100,000 +</p>
                                <p className="text-sm font-medium text-gray-500">Successful Transactions</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        controls
                        className="mt-4 block h-auto w-full rounded-xl md:hidden"
                    >
                        <source src={video1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
