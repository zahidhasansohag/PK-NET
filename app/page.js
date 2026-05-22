'use client';
import React, { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // ফর্ম থেকে ডেটা নেওয়া
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
      profile: e.target.profile.value,
      uptimeLimit: e.target.uptime.value, // যেমন: 1d, 7d
      dataLimit: e.target.datalimit.value, // যেমন: 1G, 5G
    };

    // ডেমো জেনারেট ইফেক্ট (API কানেক্ট করার আগ পর্যন্ত)
    setTimeout(() => {
      console.log('Voucher Data:', formData);
      setMessage({ type: 'success', text: `🎉 ভাউচার সফলভাবে তৈরি হয়েছে! (${formData.uptimeLimit || 'আনলিমিটেড'})` });
      setLoading(false);
    }, 1500);
  };

  // র্যান্ডম ভাউচার কোড জেনারেটর
  const generateRandom = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('username').value = code;
    document.getElementById('password').value = code;
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col lg:flex-row font-medium">
      
      {/* মডার্ন সাইডবার */}
      <aside className="w-full lg:w-72 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-6 shadow-2xl lg:min-h-screen relative overflow-hidden flex flex-col">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
          <div className="absolute top-40 -right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        </div>

        <div className="relative z-10 flex-1">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">PK-NET<span className="text-blue-400">.</span></h2>
          <p className="text-indigo-200 text-sm mb-10 opacity-80">অ্যাডভান্সড হটস্পট সিস্টেম</p>
          
          <nav className="space-y-3">
            <div className="flex items-center gap-3 py-3 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-inner cursor-pointer transition-all">
              <span className="font-semibold tracking-wide">ড্যাশবোর্ড</span>
            </div>
            <div className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all text-indigo-100 hover:text-white">
              <span>ইউজার লিস্ট (শীঘ্রই)</span>
            </div>
            <div className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all text-indigo-100 hover:text-white">
              <span>সেলস রিপোর্ট (শীঘ্রই)</span>
            </div>
          </nav>
        </div>

        {/* লগআউট বাটন (সাইডবারের নিচে) */}
        <div className="relative z-10 mt-10">
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/login';
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-500/20 hover:bg-red-500/40 text-red-200 hover:text-white rounded-xl transition-all font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            লগআউট
          </button>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 p-6 lg:p-10 lg:ml-4 w-full max-w-7xl mx-auto">
        
        {/* ভাউচার জেনারেটর কার্ড (Mikhmon Style) */}
        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-4xl relative overflow-hidden">
          
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-5">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">অ্যাডভান্সড ভাউচার জেনারেটর</h3>
              <p className="text-slate-500 mt-1 text-sm">মেয়াদ ও লিমিট সেট করে ভাউচার তৈরি করুন</p>
            </div>
            <button onClick={generateRandom} type="button" className="text-sm bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
              অটো কোড তৈরি করুন
            </button>
          </div>
          
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* ইউজারনেম ও পাসওয়ার্ড */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">ইউজারনেম</label>
                <input type="text" id="username" name="username" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700" placeholder="e.g. pk-user" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">পাসওয়ার্ড</label>
                <input type="text" id="password" name="password" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-700" placeholder="e.g. 1234" />
              </div>

              {/* প্রোফাইল / প্যাকেজ */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">মাইক্রোটিক প্রোফাইল</label>
                <select name="profile" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium text-slate-700">
                  <option value="default">Default</option>
                  <option value="1Day_Profile">1 Day Profile</option>
                  <option value="7Days_Profile">7 Days Profile</option>
                  <option value="15Days_Profile">15 Days Profile</option>
                  <option value="30Days_Profile">30 Days Profile</option>
                </select>
              </div>

              {/* টাইম লিমিট (Uptime / Validity) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">মেয়াদ (Validity / Uptime)</label>
                <select name="uptime" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium text-slate-700">
                  <option value="">আনলিমিটেড</option>
                  <option value="1d">১ দিন (24 Hours)</option>
                  <option value="7d">৭ দিন</option>
                  <option value="15d">১৫ দিন</option>
                  <option value="30d">৩০ দিন</option>
                </select>
              </div>

              {/* ডাটা লিমিট */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">ডাটা লিমিট (Data Limit)</label>
                <select name="datalimit" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all font-medium text-slate-700">
                  <option value="">আনলিমিটেড</option>
                  <option value="500M">500 MB</option>
                  <option value="1G">1 GB</option>
                  <option value="5G">5 GB</option>
                  <option value="15G">15 GB</option>
                </select>
              </div>

            </div>

            <button type="submit" disabled={loading} className={`w-full lg:w-auto px-10 text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg active:scale-[0.98]'}`}>
              {loading ? 'তৈরি হচ্ছে...' : 'ভাউচার জেনারেট করুন'}
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 rounded-xl font-medium text-center bg-emerald-50 text-emerald-700 border border-emerald-100">
              {message.text}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
