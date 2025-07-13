import { Head, Link } from '@inertiajs/react'

export default function FranchiseApplication() {
  return (
    <>
      <Head title="CVS Franchise Application" />
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 my-10">
        <h1 className="text-3xl font-bold mb-4 text-red-700">
          🚗 CVS Drive-Thru Pharmacy Franchise Application
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Be part of the future of healthcare — fast, accessible, drive-thru pharmacy care across the Philippines.
        </p>

        {/* WHY FRANCHISE */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">✅ Why Franchise with CVS?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>🏥 Proven pharmacy system with digital inventory, telehealth, and drive-thru integration</li>
            <li>💼 High-demand business in post-pandemic healthcare economy</li>
            <li>🤝 Full training, tech setup, and brand support</li>
            <li>📈 Low-touch, high-ROI medical retail model</li>
          </ul>
        </div>

        {/* FRANCHISEE PROFILE */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">📍 Ideal Franchisee Profile</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Entrepreneurs with at least ₱10M capital access</li>
            <li>A prime location (drive-thru capable or with space to build one)</li>
            <li>Strong interest in healthcare, retail, or community service</li>
            <li>Individuals, partners, or corporations are welcome</li>
          </ul>
        </div>

        {/* APPLICATION PROCESS */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">📝 Franchise Application Process</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Submit Form with basic profile & location interest</li>
            <li>Evaluation Call with our Franchise Development Team</li>
            <li>Site Review + Financial Screening</li>
            <li>Franchise Agreement Signing</li>
            <li>Setup, Training, Launch!</li>
          </ol>
        </div>

        {/* REQUIREMENTS */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">📄 What You’ll Need to Prepare</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Government ID or company profile</li>
            <li>Proof of funds (bank cert, audited FS, etc.)</li>
            <li>Target location (with ownership or lease rights)</li>
            <li>Letter of Intent or Business Pitch</li>
            <li>Willingness to follow CVS health protocols and SOPs</li>
          </ul>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center mt-10">
          <Link
            href="/franchise/apply"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-md transition duration-200"
          >
            🖊️ Start Application
          </Link>
        </div>
      </div>
    </>
  )
}
