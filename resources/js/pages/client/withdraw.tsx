import NoBankDialog from '@/components/client/no-bank-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/DashboardLayout';
import { formattedNumber } from '@/utils/utils';
import { Head, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';



type PageProps = {
    success: {
        message: string;
    };
    error: {
        message: string;
    };
    account_balance: number;
};

export default function Withdraw() {
    const { account_balance, success, error, bank_details } = usePage<PageProps>().props;
    const [amount, setAmount] = useState<string>('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        router.post(
            '/postwithdraw',
            {
                withdrawal_amount: amount,
            },
            {
                onSuccess: () => {
                    setAmount(''); // Reset the amount state on success
                },
            },
        );
    }
    // console.log(account_balance);


    useEffect(() => {
        if (success?.message) {
            toast.success(success.message);
        }
        if (error?.message) {
            toast.error(error.message);
        }
    }, [success, error]);

    function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (value === '') {
            setAmount(''); // Set to empty string for empty input
        } else {
            setAmount(value); // Keep as string to avoid leading zero issue.
        }
    }
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
                <Card className="w-full max-w-[650px]">
                    <CardHeader className="text-center">
                        <CardDescription>Available Balance</CardDescription>
                        <CardTitle className="text-2xl">{formattedNumber(account_balance)}</CardTitle>
                    </CardHeader>
                    <CardContent>{/* Your content here */}</CardContent>
                </Card>
                <Card className="w-full max-w-[650px] p-4">
                    <Label>Amount</Label>
                    <Input placeholder="Amount" type="number" value={amount} onChange={handleAmountChange} />
                    <Button onClick={handleSubmit}>Withdraw</Button>
                    <Card className="bg-[#FDBA74]">
                        <div className="flex items-center gap-x-4 px-4 text-sm text-[#7C2D12]">
                            <div>
                                <Info />
                            </div>
                            <div>
                                <p>Minimum withdrawal allowed is $20.</p>
                                <p>Please note that there will be a 5% withdrawal fee per transaction. Withdrawals may take 3 business days.</p>
                            </div>
                        </div>
                    </Card>
                </Card>
                <NoBankDialog open={!bank_details} />
            </div>
        </DashboardLayout>
    );
}
