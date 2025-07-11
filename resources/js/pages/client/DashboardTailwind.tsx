import { useState } from 'react';

// Dummy data for demonstration
const metrics = [
  { label: 'Balance', value: '$12,500.00', icon: (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3zm0 0V4m0 7v7m0 0c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3z" /></svg>
  ) },
  { label: 'Total Interest', value: '$1,200.00', icon: (
    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" /></svg>
  ) },
  { label: 'Active Deposit', value: '$5,000.00', icon: (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>
  ) },
  { label: 'Total Withdrawal', value: '$2,000.00', icon: (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2M5 12h14M7 12v6a2 2 0 002 2h6a2 2 0 002-2v-6" /></svg>
  ) },
];

export default function DashboardTailwind() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-50 overflow-x-hidden flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white shadow-md transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 hidden md:block`}> 
        <div className="flex flex-col h-full p-4 gap-4">
          <div className="font-bold text-xl text-red-600 mb-6">CVS Finance</div>
          <nav className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all"><span>🏠</span>Dashboard</a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all"><span>💸</span>Deposit</a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all"><span>🏦</span>Withdraw</a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all"><span>🔄</span>Transfer</a>
            <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all"><span>📈</span>Reports</a>
          </nav>
        </div>
      </aside>
      {/* Mobile Hamburger */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow-md p-2" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open menu">
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}
      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 p-4 md:ml-64 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900">Hi King Mopat'z <span className="inline-block">👋</span></h1>
          <p className="text-gray-500 text-base">Here's your current status</p>
        </div>
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 w-full text-center gap-2 animate-fadeInUp">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-700">{m.icon}{m.label}</div>
              <div className="text-2xl font-bold text-gray-900">{m.value}</div>
            </div>
          ))}
        </div>
        {/* Transactions */}
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 w-full animate-fadeInUp">
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-lg text-gray-800">Recent Transactions</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center gap-2"><span>💵</span>Deposit</span>
              <span>$1,000.00</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center gap-2"><span>💸</span>Withdrawal</span>
              <span>$500.00</span>
            </div>
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center gap-2"><span>👥</span>Referral</span>
              <span>$50.00</span>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button className="bg-red-600 text-white rounded-lg py-3 px-6 font-semibold shadow transition-all duration-300 w-full">Deposit</button>
            <button className="border border-red-600 text-red-600 rounded-lg py-3 px-6 font-semibold shadow transition-all duration-300 w-full">Withdraw</button>
          </div>
        </div>
        {/* Referrals */}
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 w-full animate-fadeInUp">
          <div className="font-bold text-lg text-gray-800 mb-2">Your Referral Link</div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input className="border rounded-lg px-3 py-2 w-full text-gray-700" value="https://cvs.com/ref/kingmopatz" readOnly />
            <button className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2 font-semibold shadow transition-all duration-300 w-full sm:w-auto">Copy</button>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center w-32 h-32">QR</div>
          </div>
        </div>
        {/* Announcements & Earnings */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="bg-white rounded-xl shadow-md p-4 flex-1 animate-fadeInUp">
            <div className="font-bold text-lg text-gray-800 mb-2">Announcements</div>
            <div className="text-gray-600">Don't miss out on our latest offers!</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex-1 animate-fadeInUp">
            <div className="font-bold text-lg text-gray-800 mb-2">Earnings History</div>
            <div className="flex items-center justify-center h-24 text-gray-400">(Chart coming soon)</div>
          </div>
        </div>
      </main>
    </div>
  );
}
