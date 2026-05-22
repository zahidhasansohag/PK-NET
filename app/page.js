'use client';
import React, { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // যেহেতু API নেই, তাই আমরা একটি ডেমো সাকসেস মেসেজ দেখাবো
    setTimeout(() => {
      setMessage({ type: 'success', text: '✅ (Demo) ভাউচার সফলভাবে তৈরি হয়েছে!' });
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-slate-900 text-white p-6 shadow-xl">
        <h2 className="text-2xl font-extrabold mb-8 tracking-wider text-blue-400">PK-NET HOTSPOT</h2>
        <nav className="space-y-4">
          <div className="block py-2.5 px-4 bg-blue-600 rounded transition duration-200">ড্যাশবোর্ড</div>
        </nav>
      </div>

      <div className="flex-1 p-6 md:p-10">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4">নতুন ভাউচার তৈরি করুন</h3>
          
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ইউজারনেম</label>
                <input type="text" name="username" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ইউজারনেম দিন" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
                <input type="text" name="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="পাসওয়ার্ড দিন" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">প্যাকেজ / প্রোফাইল</label>
              <select name="profile" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="default">Default</option>
                <option value="2Mbps">2 Mbps</option>
                <option value="5Mbps">5 Mbps</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className={`w-full text-white font-bold py-3 rounded-lg transition-all ${loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {loading ? 'রাউটারে সেভ হচ্ছে...' : 'জেনারেট করুন'}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg font-medium text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
