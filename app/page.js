'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Wifi, Users, Activity, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function PremiumDashboard() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [copied, setCopied] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', package: '5Mbps', validity: '30d' });
  const [isDark, setIsDark] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // BUG FIX #2: handleCopy এখন async — clipboard write await করে এবং
  // error হলে catch করে। আগে silently fail করত।
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      showToast(`${type} কপি হয়েছে!`);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      showToast('কপি করতে ব্যর্থ হয়েছে!', 'error');
    }
  };

  const generateRandom = () => {
    const code = Math.random().toString(36).substring(2, 8).toLowerCase();
    setFormData({ ...formData, username: code, password: code });
  };

  // BUG FIX #3: handleGenerate যোগ করা হয়েছে।
  // আগে form-এ কোনো onSubmit ছিল না — submit করলে পুরো পেজ reload হয়ে যেত।
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      showToast('ইউজারনেম ও পাসওয়ার্ড দিন!', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGeneratedVoucher({
        username: formData.username,
        password: formData.password,
        package: formData.package,
        validity: formData.validity,
      });
      setLoading(false);
      showToast('ভাউচার সফলভাবে তৈরি হয়েছে!');
    }, 800);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-medium ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">

        {/* সাইডবার */}
        <aside className={`hidden lg:flex flex-col w-72 border-r ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/70 border-slate-200'} backdrop-blur-xl p-6 z-20`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <Wifi className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold">PK-NET.</h1>
          </div>

          <nav className="space-y-2 flex-1">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold border border-indigo-500/20">
              <LayoutDashboard className="w-5 h-5" /> ড্যাশবোর্ড
            </Link>
            {/* BUG FIX #4: dark mode-এ sidebar link hover color ঠিক করা হয়েছে */}
            <Link href="/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
              <Users className="w-5 h-5" /> ইউজার লিস্ট
            </Link>
            <Link href="/reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
              <Activity className="w-5 h-5" /> সেলস রিপোর্ট
            </Link>
            <Link href="/routers" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
              <Settings className="w-5 h-5" /> রাউটার সেটিং
            </Link>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${isDark ? 'bg-slate-700 text-slate-100' : 'bg-slate-100 text-slate-600'}`}
            >
              {isDark ? '☀ লাইট মোড' : '🌙 ডার্ক মোড'}
            </button>
          </div>

          <button
            onClick={() => { fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/login'; }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold"
          >
            <LogOut className="w-5 h-5" /> লগআউট
          </button>
        </aside>

        {/* মেইন কন্টেন্ট */}
        <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">

            {/* টোস্ট */}
            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
              <div className={`px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                {toast.message}
              </div>
            </div>

            {/* ভাউচার জেনারেটর */}
            <div className={`rounded-[2.5rem] p-8 border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h3 className="text-2xl font-bold mb-6">স্মার্ট ভাউচার জেনারেটর</h3>

              {/* BUG FIX #3 (continued): onSubmit={handleGenerate} যোগ করা হয়েছে */}
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                    placeholder="ইউজারনেম"
                  />
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                    placeholder="পাসওয়ার্ড"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="2Mbps">2 Mbps</option>
                    <option value="5Mbps">5 Mbps</option>
                    <option value="10Mbps">10 Mbps</option>
                  </select>
                  <select
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                    className={`w-full px-5 py-4 rounded-2xl border outline-none font-bold ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="1d">১ দিন</option>
                    <option value="7d">৭ দিন</option>
                    <option value="15d">১৫ দিন</option>
                    <option value="30d">৩০ দিন</option>
                  </select>
                </div>

                <button type="button" onClick={generateRandom} className="text-indigo-600 font-bold">
                  অটো কোড তৈরি করুন
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white font-bold py-4 rounded-2xl transition-all ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {loading ? 'তৈরি হচ্ছে...' : 'ভাউচার জেনারেট করুন'}
                </button>
              </form>

              {/* জেনারেটেড ভাউচার প্রিভিউ */}
              {generatedVoucher && (
                <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed ${isDark ? 'border-indigo-500/40 bg-slate-700/40' : 'border-indigo-200 bg-indigo-50'}`}>
                  <h4 className="font-bold text-lg mb-4 text-indigo-600">✅ ভাউচার রেডি</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'ইউজারনেম', val: generatedVoucher.username, key: 'username' },
                      { label: 'পাসওয়ার্ড', val: generatedVoucher.password, key: 'password' },
                      { label: 'প্যাকেজ', val: generatedVoucher.package, key: 'package' },
                      { label: 'মেয়াদ', val: generatedVoucher.validity, key: 'validity' },
                    ].map(({ label, val, key }) => (
                      <div key={key} className={`p-3 rounded-xl flex items-center justify-between gap-2 ${isDark ? 'bg-slate-600' : 'bg-white'}`}>
                        <div>
                          <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                          <p className="font-bold">{val}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(val, label)}
                          className="text-indigo-500 hover:text-indigo-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all"
                        >
                          {copied === label ? '✓' : 'কপি'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}