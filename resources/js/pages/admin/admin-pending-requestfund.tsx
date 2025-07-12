import RequestFundPendingTable, {
  REQUESTFUNDPENDINGDATATYPE,
} from '@/components/admin/admin-pending-request-fund/admin-pending-request-fund-table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { formattedNumber } from '@/utils/utils'; // ✅ fixed import
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pending Request Fund',
    href: '/admin-pending-requestfund',
  },
];

interface PageProps {
  APP_DOMAIN: string;
  auth: Auth;
  deposits: REQUESTFUNDPENDINGDATATYPE[];
  [key: string]: unknown;
}

function totalAmount(array: REQUESTFUNDPENDINGDATATYPE[]): number {
  return array.reduce((a, b) => Number(a) + Number(b.amount), 0);
}

export default function AdminPendingRequestFund() {
  const { auth, deposits } = usePage<PageProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
      <Head title="Admin Pending Request Fund" />
      <div className="flex h-full flex-1 flex-col items-center gap-y-4 p-4">
        <div className="w-screen md:w-[calc(100vw-300px)]">
          <div className="rounded-md border">
            <div className="flex items-center justify-between p-4">
              <p className="font-semibold">Request Fund History</p>
              <Badge className="px-4 py-2 text-sm">
                Total: <b>{formattedNumber(totalAmount(deposits))}</b>
              </Badge>
            </div>
            <Separator orientation="horizontal" />
            <RequestFundPendingTable data={deposits} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
