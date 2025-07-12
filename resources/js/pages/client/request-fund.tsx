import { RequestFundPayment } from '@/components/client/request-fund/RequestFundPayment';
import RequestTable, { REQUESTTYPE } from '@/components/client/request-fund/RequestFundTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formattedNumber } from '@/utils/utils';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request Fund',
        href: '/request-fund',
    },
];

export interface ReceivingBank {
    id: number;
    bank_name: string;
    payment_channel: string;
    account_name: string;
    account_number: string;
    receiving_bank: string;
}

export default function AdminTransferFunds() {

    const { receiving_bank, auth, data, success, error } = usePage<{
        receiving_bank: ReceivingBank[];
        auth: Auth;
        data: REQUESTTYPE[];
        success?: { message: string };
        error?: { message: string };
    }>().props;


    useEffect(() => {
        if (success && typeof success === 'object' && 'message' in success && typeof success.message === 'string') {
            toast.success(success.message);
        }
        if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
            toast.error(error.message);
        }
    }, [success, error]);

    function totalAmount(array: unknown[]): number {
        return array.reduce((a: number, b: unknown) => {
            if (typeof b === 'object' && b !== null && 'daily_shares_value' in b) {
                return a + Number((b as { daily_shares_value: number }).daily_shares_value);
            }
            return a;
        }, 0);
    }
    function totalAmountReferral(array: unknown[]): number {
        return array.reduce((a: number, b: unknown) => {
            if (typeof b === 'object' && b !== null && 'bonus_amount' in b) {
                return a + Number((b as { bonus_amount: number }).bonus_amount);
            }
            return a;
        }, 0);
    }

    const [isrequest, setrequest] = useState(false);

    function onRequest() {
        setrequest((prev) => !prev);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth?.user.role as RoleProps}>
            <Head title="Request Fund" />
            <div className="mx-auto">
                <div className="mt-6 w-screen px-4 md:w-[calc(100vw-300px)]">
                    <div>
                        <Button className="mb-3 cursor-pointer" onClick={onRequest}>
                            Request Fund
                        </Button>
                        <RequestFundPayment open={isrequest} onOpen={onRequest} receiving_bank={receiving_bank} />
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <p className="font-semibold">Request History</p>
                                    <p className="text-xs text-gray-500">Total Amount: <b>{formattedNumber(totalAmount(data))}</b></p>
                                    <p className="text-xs text-gray-500">Total Referral: <b>{formattedNumber(totalAmountReferral(data))}</b></p>
                                </div>
                            </div>
                            <Separator orientation="horizontal" />
                            <RequestTable data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
