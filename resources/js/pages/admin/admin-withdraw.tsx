import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps {
    APP_DOMAIN: string;
    auth: {
        user: {
            role: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
    [key: string]: unknown; // Allow additional properties
}

export default function AdminWithdraw() {
    const { auth } = usePage<PageProps>().props;
    console.log(auth.user.role);

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={{ role: auth.user.role }}>
            <Head title="Admin Dashboard" />
            AdminWithdraw
        </AppLayout>
    );
}
