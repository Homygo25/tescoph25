import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { formattedNumber } from '@/utils/utils';
import { format } from 'date-fns';
import { router } from '@inertiajs/react';

// If your SelectInput component is at src/components/select.tsx
import { SelectInput } from '@/components/select';

export interface Package {
  id: number;
  package_name: string;
  min_amount: number;
  daily_shares_rate: number;
  effective_days: number;
  referal_bonus_rate: number;
  available_slots: number;
  max_amount: number;
}

export interface ReceivingBank {
  id: number;
  bank_name: string;
  payment_channel: string;
  account_name: string;
  account_number: string;
  receiving_bank: string;
}

export type FINALVALUES = {
  pck: Package;
  paymentMode: number;
  amount: number | string;
};

interface PackageModalProps {
  account_balance: number;
  open: boolean;
  selectedPackage: Package;
  onSelect: (pkg: Package | null) => void;
  receiving_bank: ReceivingBank[];
}

export function PackageModal({
  account_balance,
  open,
  selectedPackage,
  onSelect,
  receiving_bank,
}: PackageModalProps) {
  const [pck, setPkg] = useState<Package>(selectedPackage);
  const [paymentMode, setPaymentMode] = useState(1);
  const [amount, setAmount] = useState<number | string>('');
  const [opensuccess, setOpensuccess] = useState(false);
  const [openonline, setOpenonline] = useState(false);
  const [finalValues, setFinalValues] = useState<FINALVALUES>();

  useEffect(() => {
    if (selectedPackage) {
      setPkg(selectedPackage);
      setAmount(selectedPackage.min_amount);
    }
  }, [open, selectedPackage]);

  function handleOpensuccess() {
    setOpensuccess(!opensuccess);
  }

  function handleOpenonline() {
    setOpenonline(!openonline);
  }

  function handleAvail() {
    setFinalValues({ pck, paymentMode, amount });

    const parsedAmount = Number(amount);

    if (paymentMode === 1) {
      if (parsedAmount > account_balance) {
        return toast.error('Invalid Amount', {
          description: 'Insufficient account balance.',
        });
      }

      if (
        parsedAmount < pck.min_amount ||
        parsedAmount > pck.max_amount
      ) {
        return toast.error('Invalid Amount', {
          description: `You cannot avail an amount outside the range of $${pck.min_amount} to $${pck.max_amount}.`,
        });
      }

      setOpensuccess(true);
      onSelect(null);
    }

    if (paymentMode === 2) {
      setOpenonline(true);
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
              placeholder="Select a Package"
              items={[
                { text: 'Account Balance', value: 1 },
                { text: 'Online Transfer', value: 2 },
              ]}
              className="w-full"
              onChange={(val: number) => setPaymentMode(val)}
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
              <div className="pt-4">
                <Badge variant="secondary" className="text-sm">
                  <p className="mr-1 font-medium">Account Balance:</p>
                  {formattedNumber(account_balance)}
                </Badge>
              </div>
            )}

            <div className="pt-4">
              <Badge variant="secondary" className="text-sm">
                <p className="mr-1 font-medium">Daily Interest:</p>
                {formattedNumber(Number(amount) * pck.daily_shares_rate)}
              </Badge>
            </div>

            <div className="pt-4">
              <Badge variant="secondary" className="text-sm">
                <p className="mr-1 font-medium">Total RoI:</p>
                {formattedNumber(
                  Number(amount) * pck.daily_shares_rate * pck.effective_days +
                    Number(amount)
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

      <PaymentSuccessfulModal
        open={opensuccess}
        onOpen={handleOpensuccess}
        finalValues={finalValues}
      />

      <PaymentOnline
        open={openonline}
        onOpen={handleOpenonline}
        finalValues={finalValues}
        receiving_bank={receiving_bank}
      />
    </Dialog>
  );
}

interface PaymentSuccessfulModalProps {
  open: boolean;
  onOpen: () => void;
  finalValues?: FINALVALUES;
}

export function PaymentSuccessfulModal({
  open,
  onOpen,
  finalValues,
}: PaymentSuccessfulModalProps) {
  const today = new Date();
  const formattedDate = format(today, 'MMM dd, yyyy');

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Successful</DialogTitle>
        </DialogHeader>
        <div>
          {finalValues && (
            <div className="mt-4">
              <div>Package: {finalValues.pck.package_name}</div>
              <div>Amount: {formattedNumber(Number(finalValues.amount))}</div>
              <div>Payment Mode: {finalValues.paymentMode === 1 ? 'Account Balance' : 'Online Transfer'}</div>
              <div>Date: {formattedDate}</div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onOpen}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface PaymentOnlineProps {
  open: boolean;
  onOpen: () => void;
  finalValues?: FINALVALUES;
  receiving_bank: ReceivingBank[];
}

export function PaymentOnline({
  open,
  onOpen,
  finalValues,
  receiving_bank,
}: PaymentOnlineProps) {
  const handleSubmit = (bank_id: number) => {
    router.post('/postpackage', {
      package_id: finalValues?.pck.id,
      bank_id,
      payment_method: finalValues?.paymentMode,
      amount: finalValues?.amount,
    });
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Online Payment</DialogTitle>
        </DialogHeader>
        <div>
          {receiving_bank.map((bank) => (
            <div key={bank.id} className="mb-4 border-b pb-4">
              <div>Bank Name: {bank.bank_name}</div>
              <div>Account Name: {bank.account_name}</div>
              <div>Account Number: {bank.account_number}</div>
              <Button onClick={() => handleSubmit(bank.id)} className="mt-2">
                Pay with {bank.bank_name}
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onOpen}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
