import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
  Home,
  User,
  DollarSign,
  Send,
  FileText,
  ArrowLeftRight,
  Briefcase,
  Archive,
  History,
  Users,
  Menu,
  X,
} from 'lucide-react';

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="min-h-screen bg-white text-gray-900 relative pb-24">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <img
          src="/avatar.png"
          alt="Profile"
          className="w-10 h-10 rounded-full bg-gray-300"
        />
        <div>
          <h2 className="font-bold text-lg">Hi King Mopa't'z! 👋</h2>
          <p className="text-sm text-gray-500">Here's your current status</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 px-4">
        {['Balance', 'Total Interest', 'Active Deposit', 'Total Withdrawal'].map((label) => (
          <div
            key={label}
            className="bg-white border p-3 rounded-lg text-sm shadow flex flex-col justify-between"
          >
            <span>{label}</span>
            <span className="font-bold text-lg">$0.00</span>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white mt-4 mx-4 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Recent Transactions</h3>
        <ul className="text-sm space-y-1 mb-3">
          <li>Referral Incentive: $0.00</li>
          <li>Deposit: $0.00</li>
          <li>Withdrawal: $0.00</li>
        </ul>
        <div className="flex gap-2">
          <button className="dashboard-btn-solid w-full" onClick={() => router.visit('/deposit')}>Deposit</button>
          <button className="dashboard-btn-outline w-full" onClick={() => router.visit('/withdraw')}>Withdraw</button>
        </div>
      </div>

      {/* Referrals */}
      <div className="bg-white mt-4 mx-4 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Your Referrals</h3>
        <p className="text-sm mb-2 break-words">http://localhost/ref/test101</p>
        <div className="flex items-center gap-2">
          <button className="bg-gray-200 px-3 py-1 rounded text-sm">Copy</button>
          <div className="w-12 h-12 bg-gray-300" />
        </div>
      </div>

      {/* Announcement */}
      <div className="bg-white mt-4 mx-4 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Announcement</h3>
        <p className="text-sm">Don't miss out on our latest offers!</p>
      </div>

      {/* Earnings */}
      <div className="bg-white mt-4 mx-4 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Earnings History</h3>
        <div className="h-24 bg-gray-100 rounded-md" />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-center py-3">
        <button onClick={toggleDrawer} className="text-red-600" title="Open menu">
          <Menu size={28} />
        </button>
      </div>

      {/* Slide-up Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end">
          <div className="bg-white w-full p-6 rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Menu</h3>
              <button onClick={toggleDrawer} title="Close menu"><X size={24} /></button>
            </div>
            <div className="grid gap-4">
              {[
                { name: 'Dashboard', icon: <Home size={18} />, route: '/dashboard' },
                { name: 'CVS Profile', icon: <User size={18} />, route: '/profile' },
                { name: 'Deposit', icon: <DollarSign size={18} />, route: '/deposit' },
                { name: 'Withdraw', icon: <Send size={18} />, route: '/withdraw' },
                { name: 'Transfer Fund', icon: <ArrowLeftRight size={18} />, route: '/transfer-fund' },
                { name: 'Request Fund', icon: <FileText size={18} />, route: '/request-fund' },
                { name: 'Franchise Application', icon: <Briefcase size={18} />, route: '/franchise-application' },
                { name: 'CVS Credit Application', icon: <Archive size={18} />, route: '/credit-application' },
                { name: 'Transaction History', icon: <History size={18} />, route: '/transaction-history' },
                { name: 'Referrals', icon: <Users size={18} />, route: '/referrals' },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex items-center gap-3 text-gray-700 border p-2 rounded-lg hover:bg-gray-100 transition text-left w-full"
                  onClick={() => { router.visit(item.route); setDrawerOpen(false); }}
                  type="button"
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
