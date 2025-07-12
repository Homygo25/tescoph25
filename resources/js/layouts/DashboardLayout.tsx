import { useState } from 'react';
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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: 'Dashboard', icon: <Home size={18} /> },
  { name: 'CVS Profile', icon: <User size={18} /> },
  { name: 'Deposit', icon: <DollarSign size={18} /> },
  { name: 'Withdraw', icon: <Send size={18} /> },
  { name: 'Transfer Fund', icon: <ArrowLeftRight size={18} /> },
  { name: 'Request Fund', icon: <FileText size={18} /> },
  { name: 'Franchise Application', icon: <Briefcase size={18} /> },
  { name: 'CVS Credit Application', icon: <Archive size={18} /> },
  { name: 'Transaction History', icon: <History size={18} /> },
  { name: 'Referrals', icon: <Users size={18} /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="min-h-screen bg-white text-gray-900 relative pb-24">
      {/* Main Content */}
      <div className="pb-24">{children}</div>

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
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 text-gray-700 border p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {item.icon}
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
