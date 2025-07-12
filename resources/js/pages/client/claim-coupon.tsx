import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Auth, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Claim Coupon',
        href: '/claim-coupon',
    },
];

interface PageProps {
    success?: { message: string };
    error?: { message: string };
    auth: Auth;
    [key: string]: unknown; // Keep for Inertia compatibility
}

export default function ClaimCoupon() {
    const { auth, success, error } = usePage<PageProps>().props;
    const [code, setCode] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        router.post('/claim-coupon', { coupon: code });
    }

    useEffect(() => {
        if (success && typeof success === 'object' && 'message' in success && typeof success.message === 'string') {
            toast.success(success.message);
            setCode('');
        }
        if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
            toast.error(error.message);
        }
    }, [success, error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={{ role: String(auth.user.role) }}>
            <Head title="Claim Coupon" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <Card className="w-full max-w-[500px] p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            placeholder="Enter coupon code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <Button type="submit">Claim</Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
