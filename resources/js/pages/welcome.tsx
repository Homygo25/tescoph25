// import tescoLogo from '@/images/Tesco_logo.png';
import { type SharedData } from '@/types';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import bgImage from '../images/image.png';
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
        <div style={{ backgroundImage: `url(${bgImage})` }} className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat relative">
            {/* Red overlay */}
            <div className="absolute inset-0 bg-red-600 bg-opacity-70 z-0"></div>
            
            {/* <header className="sticky inset-x-0 top-0 z-50 bg-gradient-to-b from-white from-10% via-white via-80% to-transparent to-100% pb-4"> */}
            <header className="sticky inset-x-0 top-0 z-50 bg-transparent">
                <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">CVS Pharmacy</span>
                            {/* <img alt="" src={tescoLogo} className="h-auto w-32" /> */}
                            <CVSLogo />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {/* {navigation.map((item) => (
                            <button
                                onClick={() => scrollToSection(item.name)}
                                key={item.name}
                                className="cursor-pointer text-sm/6 font-semibold text-gray-900 transition-colors duration-300 hover:text-blue-700"
                            >
                                {item.name}
                            </button>
                        ))} */}
                    </div>
                    <div className="hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
                        {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a> */}
                        {/* <CustomDialog /> */}
                        {auth.user ? (
                            <Link
                                href={auth.user.role === 'admin' ? route('admin-pending-deposits') : route('dashboard')}
                                className="inline-block rounded-sm border border-white px-5 py-1.5 text-sm leading-normal text-white hover:bg-white hover:text-red-600 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent bg-white px-5 py-1.5 text-sm leading-normal font-bold text-red-600 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-white px-5 py-1.5 text-sm leading-normal font-bold text-white hover:bg-white hover:text-red-600 transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-1/2 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">CVS Pharmacy</span>
                                {/* <img alt="" src={tescoLogo} className="h-auto w-32" /> */}
                                <CVSLogo />
                            </a>
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {/* {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            onClick={() => scrollToSection(item.name)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))} */}
                                </div>
                                <div className="py-1">
                                    {auth.user ? (
                                        <Link
                                            href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                            // href={route('admin-dashboard')}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
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

            <div className="relative isolate h-[100vh] overflow-auto px-6 pb-52 lg:px-8 z-10">
                <div className="mx-auto my-16 flex max-w-md justify-center">
                    <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl border border-gray-200">
                        {/* CVS Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="text-center">
                                {/* CVS Logo Text */}
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-red-600">CVS</span>
                                    <br />
                                    <span className="text-lg font-semibold text-red-600">pharmacy</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tagline */}
                        <div className="text-center mb-8">
                            <h2 className="text-red-600 font-bold text-lg leading-tight">
                                First Drive-Thru Pharmacy In<br />
                                the Philippines
                            </h2>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={auth.user.role === 'admin' ? route('admin-dashboard') : route('dashboard')}
                                    className="flex-1 block text-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex-1 block text-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="flex-1 block text-center rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
