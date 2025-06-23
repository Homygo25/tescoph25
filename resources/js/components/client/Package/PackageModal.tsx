import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Package, ReceivingBank } from '../../../types/package';
import { formattedNumber } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SelectInput } from '../../select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PaymentOnline } from './PaymentOnline';
import { PaymentSuccessfulModal } from './PaymentSuccessfulModal';

interface PackageModalProps {
  account_balance: number;
  open: boolean;
  selectedPackage: Package;
  onSelect: (pkg: Package | null) => void;
  receiving_bank: ReceivingBank[];
}

export type FINALVALUES = {
  pck: Package;
  paymentMode: number;
  amount: number | string;
};

export function PackageModal({
  account_balance,
  open,
  selectedPackage,
  onSelect,
  receiving_bank,
}: PackageModalProps) {
  const [pck, setPkg] = useState(selectedPackage);
  const [paymentMode, setPaymentMode] = useState(1);
  const [amount, setAmount] = useState<number | string>('');
  const [opensuccess, setOpensuccess] = useState(false);
  const [openonline, setOpenonline] = useState(false);
  const [finalValues, setFinalValues] = useState<FINALVALUES>();

  useEffect(() => {
    setPkg(selectedPackage);
    setAmount(selectedPackage?.min_amount || '');
  }, [open, selectedPackage]);

  const handleOpensuccess = () => setOpensuccess(!opensuccess);
  const handleOpenonline = () => setOpenonline(!openonline);

  function handleAvail() {
    setFinalValues({ pck, paymentMode, amount });

    const parsedAmount = Number(amount);

    if (paymentMode === 2) {
      handleOpenonline();
      onSelect(null);
      return;
    }

    if (paymentMode === 1) {
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

      setOpensuccess(true);
      onSelect(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => onSelect(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Badge className="mt-3 w-full text-2xl">
              <p>{pck?.package_name}</p>
              <p>Deposit</p>
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid w-full gap-4 py-4">
          <div>
            <Label className="pb-2 block">Payment Mode</Label>
            <SelectInput
              disabled={false}
              value={paymentMode}
              placeholder="Select a Payment Mode"
              items={[
                { text: 'Account Balance', value: 1 },
                { text: 'Online Transfer', value: 2 },
              ]}
              className="w-full"
              onChange={setPaymentMode}
            />
          </div>

          <div>
            <Label className="pb-2 block">Amount</Label>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {paymentMode === 1 && (
              <div className="flex items-center pt-4">
                <Badge variant="secondary" className="text-sm">
                  <span className="mr-1 font-medium">Account Balance:</span>
                  {formattedNumber(account_balance)}
                </Badge>
              </div>
            )}

            <div className="flex items-center pt-4">
              <Badge variant="secondary" className="text-sm">
                <span className="mr-1 font-medium">Daily Interest:</span>
                {formattedNumber(Number(amount) * selectedPackage.daily_shares_rate)}
              </Badge>
            </div>

            <div className="flex items-center pt-4">
              <Badge variant="secondary" className="text-sm">
                <span className="mr-1 font-medium">Total RoI:</span>
                {formattedNumber(
                  Number(amount) * selectedPackage.daily_shares_rate * selectedPackage.effective_days + Number(amount),
                )}
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onSelect(null)}>
            Close
          </Button>
          <Button onClick={handleAvail}>Avail</Button>
        </DialogFooter>
      </DialogContent>

      <PaymentSuccessfulModal open={opensuccess} onOpen={handleOpensuccess} finalValues={finalValues} />
      <PaymentOnline open={openonline} onOpen={handleOpenonline} finalValues={finalValues} receiving_bank={receiving_bank} />
    </Dialog>
  );
}
