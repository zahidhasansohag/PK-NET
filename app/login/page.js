'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const router = useRouter();

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
      remember: e.target.remember.checked,
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast('লগইন সফল! রিডাইরেক্ট করা হচ্ছে...', 'success');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1000);
      } else {
        showToast(data.message || 'লগইন ব্যর্থ হয়েছে!', 'error');
        setLoading(false);
      }
    } catch (err) {
      showToast('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না!', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-medium">
      
      {/* ব্যাকগ্রাউন্ড অ্যানিমেশন */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse delay-1000"></div>
      </div>

      {/* টোস্ট মেসেজ */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'error' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          {toast.type === 'success' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          {toast.message}
        </div>
      </div>

      {/* লগইন কার্ড */}
      <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white max-w-md w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-5 rotate-3 hover:rotate-0 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z"></path></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">PK-NET<span className="text-blue-600">.</span></h1>
          <p className="text-slate-500 mt-2 text-sm font-semibold">অ্যাডমিন প্যানেলে স্বাগতম</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">ইউজারনেম</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input type="text" name="username" required className="w-full pl-11 pr-5 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" placeholder="অ্যাডমিন আইডি দিন" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">পাসওয়ার্ড</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <input type={showPassword ? "text" : "password"} name="password" required className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" placeholder="পাসওয়ার্ড দিন" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-indigo-600 transition-colors">
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.188-1.583c4.478 0 8.268 2.943 9.542 7a10.02 10.02 0 01-4.132 5.411m0 0l-3.29-3.29"></path></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" name="remember" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer" />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">মনে রাখুন</span>
            </label>
          </div>

          <button type="submit" disabled={loading} className={`w-full text-white font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-indigo-500/30 active:scale-[0.98]'}`}>
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                লগইন হচ্ছে...
              </>
            ) : 'লগইন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
