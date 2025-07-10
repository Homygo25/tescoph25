import { PackageModal } from '@/components/client/package/PackageModal';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const PackageCarousel = dynamic(() => import('@/components/client/package/PackageCarousel'), { ssr: false });

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
  const { auth, receiving_bank, all_package, success, error, account_balance } = usePage<PageProps>().props;
  const [openModal, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package>({
    id: 0, package_name: '', min_amount: 0, daily_shares_rate: 0, effective_days: 0, referal_bonus_rate: 0, available_slots: 0, max_amount: 0, image: ''
  });

  // Add image property for carousel
  const packagesWithImages = all_package.map((item) => ({
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
        {/* Mobile: Carousel, Desktop: Grid */}
        <div className="block md:hidden">
          <PackageCarousel packages={packagesWithImages} onSelect={onSelect} />
        </div>
        <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {all_package.length === 0 ? (
            <>No Package Available</>
          ) : (
            all_package.map((item: Package) => (
              <Card key={item.id}>
                <CardHeader className="h-auto space-y-0 pb-2">
                  <div className="items-left relative flex h-full flex-col justify-center gap-2 text-[min(4vw,1rem)] text-gray-700">
                    <div style={{ position: 'relative', width: '100%' }}>
                      <img
                        src={
                          item.package_name === 'Package 1' || item.package_name === 'Basic'
                            ? '/packages/CVS-Package-1.png'
                            : item.package_name === 'Package 2' || item.package_name === 'Advance'
                            ? '/packages/CVS-Package-2.png'
                            : item.package_name === 'Package 3' || item.package_name === 'Elite'
                            ? '/packages/CVS-Package-3.png'
                            : '/packages/CVS-Package-1.png'
                        }
                        alt={`${item.package_name} image`}
                        className="cvs-float-img"
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }}
                      />
                      {/* Unified overlay info */}
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.65)',
                        color: '#fff',
                        padding: '10px 8px 8px 8px',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '0.98rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        alignItems: 'flex-start',
                      }}>
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
                    className="w-full cursor-pointer font-bold border-none shadow-md transition-colors duration-150 pulse-select-btn"
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
                    onClick={() => onSelect(item)}
                  >
                    Select
                  </Button>
                  <style>{`
                    @keyframes pulse {
                      0% { transform: scale(1); box-shadow: 0 2px 8px rgba(184,0,28,0.10); }
                      50% { transform: scale(1.03); box-shadow: 0 4px 16px rgba(184,0,28,0.18); }
                      100% { transform: scale(1); box-shadow: 0 2px 8px rgba(184,0,28,0.10); }
                    }
                    .pulse-select-btn {
                      animation: pulse 2.5s infinite;
                    }
                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-8px); }
                      100% { transform: translateY(0px); }
                    }
                    .cvs-float-img {
                      animation: float 3.5s ease-in-out infinite;
                    }
                  `}</style>
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
