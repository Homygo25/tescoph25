import AdminTranferFundsTab, { TRANSFERFUNDSTYPES } from '@/components/admin/admin-transfer-funds/admin-transfer-funds-tab';
import { REFERRALBUNOSTYPE } from '@/components/client/income-history/referral-tab';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils';
import { Head, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transfer History',
        href: '/admin-transfer-funds',
    },
];

export default function IncomeHistory() {
    const { auth, accountbalance, referral_bonus } = usePage<{
        accountbalance: TRANSFERFUNDSTYPES[];
        referral_bonus: REFERRALBUNOSTYPE[];
        auth: Auth;
    }>().props;


    console.log(accountbalance, referral_bonus);
    function totalAmount(array: unknown[]): number {
        return array.reduce((a: number, b: unknown) => {
            if (typeof b === 'object' && b !== null && 'amount' in b) {
                return a + Number((b as { amount: number }).amount);
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



    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Income History" />
            <div className="mx-auto">
                <div className="w-screen md:w-[calc(100vw-300px)]">
                    <div className="">
                        <div className="rounded-md border">
                            <div className="flex items-center justify-between p-4">
                                <div>
                                    <p className="font-semibold">Transfer History</p>
                                    <p className="text-xs text-gray-500">Total Referral Bonus: <b>{formattedNumber(totalAmountReferral(referral_bonus))}</b></p>
                                </div>
                                <Badge className="px-4 py-2 text-sm">
                                    Total: <b>{formattedNumber(totalAmount(accountbalance))}</b>
                                </Badge>
                            </div>
                            <Separator orientation="horizontal" />
                            <AdminTranferFundsTab data={accountbalance} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
