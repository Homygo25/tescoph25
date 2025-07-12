import ApprovedTable from '@/components/admin/admin-approved-request-fund/admin-approved-table';
import { PENDINGDATATYPE } from '@/components/admin/admin-pending-deposits/admin-pending-table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils'; // ✅ Correct path
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Approved Request Fund',
    href: '/admin-approved-requestfund',
  },
];

interface PageProps {
  APP_DOMAIN: string;
  auth: Auth;
  deposits: PENDINGDATATYPE[];
  [key: string]: unknown;
}

function totalAmount(array: PENDINGDATATYPE[]): number {
  return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
}

export default function AdminApprovedRequestFund() {
  const { auth, deposits } = usePage<PageProps>().props;

  console.log(deposits);

  return (
    <AppLayout breadcrumbs={breadcrumbs} role={{ role: String(auth.user.role) }}>
      <Head title="Approved Request Fund" />
      <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
        <div className="w-screen md:w-[calc(100vw-300px)]">
          <div className="rounded-md border">
            <div className="flex items-center justify-between p-4">
              <p className="font-semibold">Request Fund History</p>
              <Badge className="px-4 py-2 text-sm">
                Total: <b>{formattedNumber(Number(totalAmount(deposits)))}</b>
              </Badge>
            </div>
            <Separator orientation="horizontal" />
            <ApprovedTable data={deposits} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
