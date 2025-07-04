import { PackageModal } from '@/components/client/package/PackageModal';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import CVSPackage1 from '../../images/CVS-Package-1.png';
import CVSPackage2 from '../../images/CVS-Package-2.png';
import CVSPackage3 from '../../images/CVS-Package-3.png';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Package',
    href: '/package',
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

interface PageProps {
  receiving_bank: ReceivingBank[];
  all_package: Package[];
  [key: string]: any;
}

export default function Package() {
  const { auth, receiving_bank, all_package, success, error, account_balance } =
    usePage<PageProps>().props;

  const [openModal, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package>({
    id: 0,
    package_name: '',
    min_amount: 0,
    daily_shares_rate: 0,
    effective_days: 0,
    referal_bonus_rate: 0,
    available_slots: 0,
    max_amount: 0,
  });

  function onSelect(pkg: Package | null) {
    if (pkg === null || pkg.id === 0) {
      setOpen(false);
    } else {
      setSelectedPackage(pkg);
      setOpen(true);
    }
  }

  function successToast() {
    return toast.success(success?.message ?? '');
  }

  function errorToast() {
    return toast.error(error?.message ?? '');
  }

  useEffect(() => {
    success?.message && successToast();
    error?.message && errorToast();
  }, [success, error]);

  return (
    <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role}>
      <Head title="Package" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="ml-1 text-xl font-bold">Choose a package</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {all_package.length === 0 ? (
            <>No Package Available</>
          ) : (
            all_package.map((item: Package) => (
              <Card key={item.id}>
                <CardHeader className="h-auto space-y-0 pb-2">
                  <div className="items-left relative flex h-full flex-col justify-center gap-2 text-[min(4vw,1rem)] text-gray-700">
                    <img
                      src={
                        item.package_name === 'Package 1' || item.package_name === 'Basic'
                          ? CVSPackage1
                          : item.package_name === 'Package 2' || item.package_name === 'Advance'
                          ? CVSPackage2
                          : item.package_name === 'Package 3' || item.package_name === 'Elite'
                          ? CVSPackage3
                          : CVSPackage1 // default fallback
                      }
                      alt={`${item.package_name} image`}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />

                    <p>
                      Daily shares:{' '}
                      {(item.daily_shares_rate * 100).toFixed(2)}%
                    </p>
                    <p>Days of Contract: {item.effective_days}</p>

                    <span className="flex items-center">
                      <CircleCheck size={25} className="mr-2" />
                      <p className="font-medium">
                        Referral Bonus: {item.referal_bonus_rate * 100}%
                      </p>
                    </span>
                    <span className="flex items-center">
                      <CircleCheck size={25} className="mr-2" />
                      <p className="font-medium">
                        Slots Available: {item.available_slots}
                      </p>
                    </span>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button
                    className="w-full cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
      <PackageModal
        account_balance={account_balance}
        open={openModal}
        selectedPackage={selectedPackage}
        onSelect={onSelect}
        receiving_bank={receiving_bank}
      />
    </AppLayout>
  );
}
