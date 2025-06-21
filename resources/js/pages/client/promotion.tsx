import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Poster from '../../images/1.jpg';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Promotion',
        href: '/promotion',
    },
];

interface PageProps {
    auth: Auth;
}

export default function Promotion() {
    const { auth } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Promotion" />
            <div className="flex h-full w-full items-center justify-center p-4">
                <img src={Poster} alt="Promotional Bonus" className="max-w-full" />
            </div>
        </AppLayout>
    );
}
