import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, RoleProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

// Image is inside public/images
const PromoImage = '/images/Promotion.png';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Promotion',
    href: '/promotion',
  },
];

interface PageProps {
  auth: {
    user: {
      role: RoleProps;
    };
  };
  [key: string]: unknown;
}

export default function Promotion() {
  const { auth } = usePage<PageProps>().props;

  if (!auth || !auth.user) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role}>
      <Head title="Promotion" />
      <div className="flex flex-col items-center justify-center p-4">
        <img
  src={PromoImage}
  alt="Premium Co-Partnership Promo"
  className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg"
/>
        <a
          href="/dashboard/packages"
          className="mt-6 inline-block rounded bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition"
        >
          Avail This Package
        </a>
      </div>
    </AppLayout>
  );
}
