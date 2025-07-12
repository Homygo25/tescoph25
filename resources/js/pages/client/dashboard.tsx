import AppLayout from '@/layouts/app-layout';
import { Home } from 'lucide-react';

type CardProps = {
  title: string;
  value: string;
};

const Card = ({ title, value }: CardProps) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="font-bold text-lg">{value}</p>
  </div>
);

export default function Dashboard() {
  // Function to dispatch openSidebar event
  const openSidebar = () => {
    window.dispatchEvent(new Event('openSidebar'));
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col text-gray-800">
        <main className="flex-1 p-6 space-y-6 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold flex items-center gap-2">
              Hi King Mopat'z! <span role="img" aria-label="wave">👋</span>
            </h1>
            <button
              className="ml-2 p-2 rounded hover:bg-gray-200 focus:outline-none"
              title="Open Sidebar"
              onClick={openSidebar}
              aria-label="Open Sidebar"
            >
              <Home className="w-5 h-5 text-red-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500">Here's your current status</p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card title="Balance" value="$0.00" />
            <Card title="Total Interest" value="$0.00" />
            <Card title="Active Deposit" value="$0.00" />
            <Card title="Total Withdrawal" value="$0.00" />
          </div>

          {/* Transactions */}
          <section className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="text-md font-semibold">Recent Transactions</h2>
            <ul className="text-sm space-y-1">
              <li>Referral Incentive: $0.00</li>
              <li>Deposit: $0.00</li>
              <li>Withdrawal: $0.00</li>
            </ul>
            <div className="flex gap-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">Deposit</button>
              <button className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 text-sm">Withdraw</button>
            </div>
          </section>

          {/* Referrals */}
          <section className="bg-white rounded-lg shadow p-4 space-y-2">
            <h2 className="font-semibold">Your Referrals</h2>
            <p className="text-sm break-all">http://localhost/ref/test101</p>
            <div className="flex items-center gap-2">
              <button className="bg-gray-100 text-xs px-3 py-1 rounded">Copy</button>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=http://localhost/ref/test101"
                alt="QR Code"
                className="h-12 w-12"
              />
            </div>
          </section>

          {/* Announcement */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold">Announcement</h2>
            <p className="text-sm text-gray-500">Don’t miss out on our latest offers!</p>
          </section>

          {/* Earnings History */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold">Earnings History</h2>
            <p className="text-sm text-gray-500">No earnings yet.</p>
          </section>
        </main>
      </div>
    </AppLayout>
  );
}
