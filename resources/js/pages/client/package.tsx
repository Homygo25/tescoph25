import { PackageModal } from '@/components/client/package/PackageModal';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import DashboardLayout from '@/layouts/DashboardLayout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, useEffect, useState } from 'react';
import { toast } from 'sonner';

const PackageCarousel = lazy(() => import('@/components/client/package/PackageCarousel'));

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

export interface PackageWithImage extends Package {
  image: string;
}

interface PageProps {
  receiving_bank: ReceivingBank[];
  all_package: Package[];
  auth: { user: { role: string } };
  success?: { message: string };
  error?: { message: string };
  account_balance: number;
  [key: string]: unknown; // Keep for Inertia compatibility
}

export default function Package() {
  const { auth, receiving_bank, all_package, success, error, account_balance } = usePage<PageProps>().props;
  const [openModal, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageWithImage>({
    id: 0,
    package_name: '',
    min_amount: 0,
    daily_shares_rate: 0,
    effective_days: 0,
    referal_bonus_rate: 0,
    available_slots: 0,
    max_amount: 0,
    image: '',
  });

  const packagesWithImages: PackageWithImage[] = all_package.map((item) => ({
    ...item,
    image:
      item.package_name === 'Package 1' || item.package_name === 'Basic'
        ? '/packages/CVS-Package-1.png'
        : item.package_name === 'Package 2' || item.package_name === 'Advance'
        ? '/packages/CVS-Package-2.png'
        : item.package_name === 'Package 3' || item.package_name === 'Elite'
        ? '/packages/CVS-Package-3.png'
        : '/packages/CVS-Package-1.png',
  }));

  function onSelect(pkg: Package | null) {
    if (pkg === null || pkg.id === 0) {
      setOpen(false);
    } else {
      const image =
        pkg.package_name === 'Package 1' || pkg.package_name === 'Basic'
          ? '/packages/CVS-Package-1.png'
          : pkg.package_name === 'Package 2' || pkg.package_name === 'Advance'
          ? '/packages/CVS-Package-2.png'
          : pkg.package_name === 'Package 3' || pkg.package_name === 'Elite'
          ? '/packages/CVS-Package-3.png'
          : '/packages/CVS-Package-1.png';
      setSelectedPackage({ ...pkg, image });
      setOpen(true);
    }
  }

  useEffect(() => {
    if (success && typeof success === 'object' && 'message' in success && typeof success.message === 'string') {
      toast.success(success.message);
    }
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      toast.error(error.message);
    }
  }, [success, error]);

  return (
    <DashboardLayout>
      <Head title="Package" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="ml-1 text-xl font-bold">Choose a package</h1>

        <div className="block md:hidden">
          <PackageCarousel packages={packagesWithImages} onSelect={onSelect} />
        </div>

        <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packagesWithImages.length === 0 ? (
            <>No Package Available</>
          ) : (
            packagesWithImages.map((item: PackageWithImage) => (
              <Card key={item.id}>
                <CardHeader className="h-auto space-y-0 pb-2">
                  <div className="items-left relative flex h-full flex-col justify-center gap-2 text-[min(4vw,1rem)] text-gray-700">
                    <div className="package-img-container">
                      <img
                        src={item.image}
                        alt={`${item.package_name} image`}
                        className="cvs-float-img package-img"
                      />
                      <div className="package-img-overlay">
                        <span>Slots: {item.available_slots}</span>
                        <span>Daily shares: {(item.daily_shares_rate * 100).toFixed(2)}%</span>
                        <span>Days: {item.effective_days}</span>
                        <span>Referral Bonus: {item.referal_bonus_rate * 100}%</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  <Button
                    className="w-full font-bold pulse-select-btn package-select-btn"
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
    </DashboardLayout>
  );
}
