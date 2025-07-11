import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="bg-pink-50 text-gray-800 min-h-screen">
        <div className="p-4 flex flex-col gap-4 max-w-md mx-auto">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl font-bold">Hi King Mopat'z! <span className="inline-block">👋</span></h1>
            <p className="text-sm text-gray-500">Here's your current status</p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-xl font-semibold">$0.00</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="text-xl font-semibold">$0.00</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-500">Active Deposit</p>
              <p className="text-xl font-semibold">$0.00</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-sm text-gray-500">Total Withdrawal</p>
              <p className="text-xl font-semibold">$0.00</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold mb-3">Recent Transactions</h2>
            <div className="text-sm text-gray-600 mb-2">Referral Incentive <span className="float-right">0.00</span></div>
            <div className="text-sm text-gray-600 mb-2">Deposit <span className="float-right">$0.00</span></div>
            <div className="text-sm text-gray-600 mb-4">Withdrawal <span className="float-right">$0.00</span></div>
            <div className="flex gap-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg w-full">Deposit</button>
              <button className="border border-red-600 text-red-600 px-4 py-2 rounded-lg w-full">Withdraw</button>
            </div>
          </div>

          {/* Your Referrals */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold mb-2">Your Referrals</h2>
            <p className="text-sm text-gray-600 break-all">http://localhost/ref/test101</p>
            <div className="flex items-center mt-2 gap-2">
              <button className="bg-gray-200 px-3 py-1 rounded text-sm">Copy</button>
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=http://localhost/ref/test101&size=60x60" alt="QR Code" className="w-12 h-12" />
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold mb-2">Announcement</h2>
            <p className="text-sm text-gray-600">Don't miss out on our latest offers!</p>
          </div>

          {/* Earnings History Placeholder */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold mb-2">Earnings History</h2>
            <div className="w-full h-20 bg-pink-100 rounded"></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
