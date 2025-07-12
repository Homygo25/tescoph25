import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    AlignLeft,
    ArrowBigDown,
    BookUser,
    CircleCheck,
    Clock4,
    ClockAlert,
    CreditCard,
    FileClock,
    FileInput,
    IdCard,
    LayoutGrid,
    LucideCircleCheckBig,
    MailCheck,
    Package,
    Plus,
    Store,
    TypeOutline,
    Users,
    WalletCards,
} from 'lucide-react';
import AppLogo from './app-logo';

const AdminmainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     url: '/admin-dashboard',
    //     icon: LayoutGrid,
    // },
    {
        title: 'Pending Deposits',
        url: '/admin-pending-deposits',
        icon: Clock4,
    },
    {
        title: 'Approved Deposits',
        url: '/admin-approved-deposits',
        icon: CircleCheck,
    },
    {
        title: 'Pending Withdrawals',
        url: '/admin-pending-withdraw',
        icon: ClockAlert,
    },
    {
        title: 'Approved Withdrawals',
        url: '/admin-approved-withdraw',
        icon: LucideCircleCheckBig,
    },
    {
        title: 'Pending Request-Fund',
        url: '/admin-pending-requestfund',
        icon: ClockAlert,
    },
    {
        title: 'Approved Request-Fund',
        url: '/admin-approved-requestfund',
        icon: LucideCircleCheckBig,
    },
    {
        title: 'Manage Users',
        url: '/admin-manage-users',
        icon: BookUser,
    },
    {
        title: 'Transfer History',
        url: '/admin-transfer-funds',
        icon: FileClock,
    },
    {
        title: 'Activation Funds',
        url: '/admin-activation-fund',
        icon: MailCheck,
    },
];

const ClientmainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Deposit',
        url: '/deposit',
        icon: Package,
    },
    {
        title: 'Withdraw',
        url: '/withdraw',
        icon: CreditCard,
    },
    {
        title: 'Transfer Fund',
        url: '/transfer-fund',
        icon: WalletCards,
    },
    {
        title: 'Request Fund',
        url: '/request-fund',
        icon: FileInput,
    },
    // Transaction History parent button
    {
        title: 'Transaction History',
        url: '/transaction-history',
        icon: ArrowBigDown,
        children: [
            { title: 'Income', url: '/income-history', icon: Plus },
            { title: 'Deposit', url: '/deposit-history', icon: ArrowBigDown },
            { title: 'Withdrawal', url: '/withdraw-history', icon: AlignLeft },
        ],
    },
    {
        title: 'Referrals',
        url: '/referrals',
        icon: Users,
    },
    {
        title: 'Franchise Application',
        url: '/franchise-application',
        icon: Store,
    },
    // CVS-specific menu items (replace or add as needed)
    {
        title: 'CVS Credit Application',
        url: '/credit-application',
        icon: IdCard,
    },
    {
        title: 'CVS Profile',
        url: '/profile',
        icon: TypeOutline,
    },
];
const EmptymainNavItems: NavItem[] = [
    {
        title: 'Dont',
        url: '/dont',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     url: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     url: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar({ role }: any) {
    const [open, setOpen] = useState(false);

    // Listen for 'openSidebar' event from anywhere (e.g., dashboard home button)
    useEffect(() => {
        const handler = () => setOpen(true);
        window.addEventListener('openSidebar', handler);
        return () => window.removeEventListener('openSidebar', handler);
    }, []);

    // Show sidebar always on desktop, toggle on mobile
    return (
        <>
            {/* Hamburger for mobile */}
            <button
                className="d-lg-none btn btn-link position-fixed top-0 start-0 m-2 z-1030"
                style={{ zIndex: 1051 }}
                aria-label="Open menu"
                onClick={() => setOpen(true)}
            >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </button>
            {/* Overlay for mobile */}
            {open && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1050 }}
                    onClick={() => setOpen(false)}
                />
            )}
            {/* Sidebar */}
            <nav
                className={`sidebar bg-white shadow-lg rounded-end-4 d-flex flex-column position-sticky top-0 vh-100 p-0 ${open ? 'show' : ''}`}
                data-intro="dashboard-menu"
                style={{ minWidth: 240, zIndex: 1040, left: open ? 0 : '-260px', transition: 'left 0.3s', position: 'fixed', boxShadow: undefined, background: '#fff' }}
            >
                {/* Close button for mobile */}
                <button
                    className="d-lg-none btn btn-link position-absolute top-0 end-0 m-2"
                    aria-label="Close menu"
                    style={{ zIndex: 1052 }}
                    onClick={() => setOpen(false)}
                >
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                </button>
                <div className="sidebar-header p-3 border-bottom">
                    <Link href="/dashboard" prefetch className="d-flex align-items-center gap-2 text-decoration-none">
                        <AppLogo />
                    </Link>
                </div>
                <div className="sidebar-content flex-grow-1 overflow-auto px-2 pt-3">
                    <div className="mb-4">
                        <div className="fw-bold text-uppercase small text-muted mb-2">My Account</div>
                        <div data-intro="profile">
                            <NavMain
                                items={[
                                    {
                                        title: 'Dashboard',
                                        url: '/dashboard',
                                        icon: LayoutGrid,
                                    },
                                    { title: 'CVS Profile', url: '/profile', icon: TypeOutline },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="fw-bold text-uppercase small text-muted mb-2">Financial</div>
                        <NavMain items={[
                            { title: 'Deposit', url: '/deposit', icon: Package },
                            { title: 'Withdraw', url: '/withdraw', icon: CreditCard },
                            { title: 'Transfer Fund', url: '/transfer-fund', icon: WalletCards },
                            { title: 'Request Fund', url: '/request-fund', icon: FileInput },
                        ]} />
                    </div>
                    <div className="mb-4">
                        <div className="fw-bold text-uppercase small text-muted mb-2">Opportunities</div>
                        <div data-intro="franchise-menu">
                            <NavMain items={[
                                { title: 'Franchise Application', url: '/franchise-application', icon: Store },
                            ]} />
                        </div>
                        <div data-intro="cvs-credit">
                            <NavMain items={[
                                { title: 'CVS Credit Application', url: '/credit-application', icon: IdCard },
                            ]} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="fw-bold text-uppercase small text-muted mb-2">Reports</div>
                        <NavMain items={[
                            { title: 'Transaction History', url: '/transaction-history', icon: ArrowBigDown, children: [
                                { title: 'Income', url: '/income-history', icon: Plus },
                                { title: 'Deposit', url: '/deposit-history', icon: ArrowBigDown },
                                { title: 'Withdrawal', url: '/withdraw-history', icon: AlignLeft },
                            ] },
                        ]} />
                        <div data-intro="referrals">
                            <NavMain items={[
                                { title: 'Referrals', url: '/referrals', icon: Users },
                            ]} />
                        </div>
                    </div>
                </div>
                <div className="sidebar-footer mt-auto p-2 border-top">
                    <NavFooter items={footerNavItems} />
                    <NavUser />
                </div>
            </nav>
        </>
    );
}

