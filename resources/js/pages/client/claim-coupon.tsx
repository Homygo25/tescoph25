import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
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
}

export default function ClaimCoupon() {
    const { auth, success, error } = usePage<PageProps>().props;
    const [code, setCode] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        router.post('/claim-coupon', { coupon: code });
    }

    function successToast() {
        return toast.success(success!.message);
    }
    function errorToast() {
        return toast.error(error!.message);
    }

    useEffect(() => {
        if (success?.message) {
            successToast();
            setCode('');
        }
        error?.message && errorToast();
    }, [success, error]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
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
