import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Package, ReceivingBank } from '@/pages/client/package';
import { formattedNumber } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SelectInput } from '../../select';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { PaymentOnline } from './PaymentOnline';
import { PaymentSuccessfulModal } from './PaymentSuccessfulModal';

interface PackageModalProps {
    open: boolean;
    selectedPackage: Package;
    onSelect: (pkg: Package | null) => void; // Updated type to allow null
    account_balance: number;
    receiving_bank: ReceivingBank[];
}

export type FINALVALUES = {
    pck: Package;
    paymentMode: number;
    amount: number | string;
};

export function PackageModal({ account_balance, open, selectedPackage, onSelect, receiving_bank }: PackageModalProps) {
    const [pck, setPkg] = useState(selectedPackage);
    const [paymentMode, setPaymentMode] = useState(1);
    const [amount, setAmount] = useState<number | string>('');
    const [opensuccess, setOpensuccess] = useState(false);
    const [openonline, setOpenonline] = useState(false);
    const [finalValues, setFinalValues] = useState<FINALVALUES>();

    console.log('selectedPackage', selectedPackage);

    useEffect(() => {
        console.log('open modal');
        setPkg(selectedPackage);
        setAmount(selectedPackage?.min_amount || ''); // Use the min_amount if available
    }, [open, selectedPackage]); // Also depend on selectedPackage

    let values = { pck, paymentMode, amount };

    function handleOpensuccess() {
        setOpensuccess(!opensuccess);
    }

    function handleOpenonline() {
        setOpenonline(!openonline);
    }

    function handleAvail() {
        setFinalValues({ pck, paymentMode, amount });

        if (paymentMode === 2) {
            handleOpenonline();
            onSelect(null); // Close modal
        }

        if (paymentMode === 1) {
            const parsedAmount = Number(amount);
            if (parsedAmount > account_balance) {
                return toast.error('Invalid Amount', {
                    description: `Insufficient account balance.`,
                });
            }
            if (parsedAmount < pck.min_amount || parsedAmount > pck.max_amount) {
                return toast.error('Invalid Amount', {
                    description: `You cannot avail an amount outside the range of $ ${pck.min_amount} to $ ${pck.max_amount}.`,
                });
            }

            // Proceed to success
            setOpensuccess(true); // Open the payment successful modal
            onSelect(null); // Close modal
        }
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value); // Update the state with the new value
    };

    const handlePaymentModeChange = (val: number) => {
        setPaymentMode(val); // Update selected payment mode state
    };

    return (
        <Dialog open={open} onOpenChange={() => onSelect(null)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <Badge className="mt-3 w-full text-2xl bg-[#b8001c] text-white rounded-lg shadow-md border-none p-3 flex flex-col items-center justify-center">
                            <span className="font-bold tracking-wide text-2xl">
                              {pck?.package_name === 'Basic' ? 'Essential Care Plan'
                                : pck?.package_name === 'Advance' ? 'Family Wellness Plan'
                                : pck?.package_name === 'Elite' ? 'Premium Plus Plan'
                                : pck?.package_name}
                            </span>
                        </Badge>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid w-full gap-4 py-4">
                    <div className="">
                        <div className="pb-2">
                            <Label htmlFor="package">Payment Mode</Label>
                        </div>
                        <SelectInput
                            disabled={false}
                            value={paymentMode}
                            placeholder="Select a Package"
                            items={[
                                { text: 'Account Balance', value: 1 },
                                { text: 'Online Transfer', value: 2 },
                            ]}
                            className="w-full"
                            onChange={handlePaymentModeChange}
                        />
                    </div>
                    <div className="">
                        <div className="pb-2">
                            <Label htmlFor="package">Amount</Label>
                        </div>
                        <div>
                            <Input type="number" placeholder="Amount" value={amount} onChange={handleAmountChange} />
                            {values.paymentMode === 1 ? (
                                <div className="flex items-center pt-4">
                                    <Badge variant="secondary" className="text-sm">
                                        <p className="mr-1 text-center font-medium">Account Balance:</p>
                                        {formattedNumber(account_balance)}
                                    </Badge>
                                </div>
                            ) : null}
                            <div className="flex items-center pt-4">
                                <Badge variant="secondary" className="text-sm">
                                    <p className="mr-1 text-center font-medium">Daily Interest:</p>
                                    {formattedNumber(Number(amount) * selectedPackage.daily_shares_rate)}
                                </Badge>
                            </div>
                            <div className="flex items-center pt-4">
                                <Badge variant="secondary" className="text-sm">
                                    <p className="mr-1 text-center font-medium">Total RoI:</p>
                                    {formattedNumber(
                                        Number(amount) * selectedPackage.daily_shares_rate * selectedPackage.effective_days + Number(amount),
                                    )}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={'ghost'} onClick={() => onSelect(null)}>
                        Close
                    </Button>
                    <Button
                        className="font-bold border-none shadow-md transition-colors duration-150"
                        style={{
                            background: '#b8001c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(184,0,28,0.10)',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.background = '#a00018')}
                        onMouseOut={e => (e.currentTarget.style.background = '#b8001c')}
                        onClick={handleAvail}
                    >
                        Avail
                    </Button>
                </DialogFooter>
            </DialogContent>
            <PaymentSuccessfulModal open={opensuccess} onOpen={handleOpensuccess} finalValues={finalValues} />
            <PaymentOnline open={openonline} onOpen={handleOpenonline} finalValues={finalValues} receiving_bank={receiving_bank} />
        </Dialog>
    );
}
