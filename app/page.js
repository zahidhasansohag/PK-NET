'use client';
import React, { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // ডেমো জেনারেট ইফেক্ট
    setTimeout(() => {
      setMessage({ type: 'success', text: '🎉 ভাউচার সফলভাবে তৈরি হয়েছে!' });
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col lg:flex-row font-medium">
      
      {/* মডার্ন সাইডবার */}
      <aside className="w-full lg:w-72 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-6 shadow-2xl lg:min-h-screen relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 -right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse delay-75"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">PK-NET<span className="text-blue-400">.</span></h2>
          <p className="text-indigo-200 text-sm mb-10 opacity-80">প্রিমিয়াম হটস্পট ম্যানেজমেন্ট</p>
          
          <nav className="space-y-3">
            <div className="flex items-center gap-3 py-3 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-inner cursor-pointer transition-all">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span className="font-semibold tracking-wide">ড্যাশবোর্ড</span>
            </div>
            <div className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all text-indigo-100 hover:text-white">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span>ইউজার লিস্ট</span>
            </div>
          </nav>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 p-6 lg:p-10 lg:ml-4 w-full max-w-7xl mx-auto">
        
        {/* টপ স্ট্যাটস গ্রিড */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {[
            { label: 'অ্যাক্টিভ ইউজার', value: '১২৪', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'from-blue-500 to-indigo-600' },
            { label: 'আজকের সেল', value: '৳ ১,৪৫০', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'from-emerald-400 to-teal-500' },
            { label: 'মোট ভাউচার', value: '৮৪', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z', color: 'from-orange-400 to-pink-500' },
            { label: 'রাউটার আপটাইম', value: '৫ দিন ৪ ঘণ্টা', icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01', color: 'from-purple-500 to-indigo-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${stat.color} shadow-lg text-white`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
              </div>
              <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.label}</h3>
              <p className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ভাউচার জেনারেটর কার্ড */}
        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-bl-full -z-10"></div>
          
          <div className="mb-8 border-b border-slate-100 pb-5">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">নতুন ভাউচার তৈরি করুন</h3>
            <p className="text-slate-500 mt-1 text-sm">প্যাকেজ সিলেক্ট করে দ্রুত ভাউচার জেনারেট করুন</p>
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">ইউজারনেম</label>
                <input type="text" name="username" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" placeholder="ইউজারনেম দিন" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">পাসওয়ার্ড</label>
                <input type="text" name="password" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" placeholder="পাসওয়ার্ড দিন" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">প্যাকেজ / প্রোফাইল</label>
              <div className="relative">
                <select name="profile" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none font-medium text-slate-700">
                  <option value="default">Default (শেয়ার্ড)</option>
                  <option value="2Mbps">2 Mbps - ১ দিন</option>
                  <option value="5Mbps">5 Mbps - ৩০ দিন</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]'}`}>
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  তৈরি হচ্ছে...
                </>
              ) : 'ভাউচার জেনারেট করুন'}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 rounded-xl font-medium text-center bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center gap-2 animate-[bounce_0.5s_ease-in-out]">
              {message.text}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
