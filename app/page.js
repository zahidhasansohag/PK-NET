'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Users, Activity, CreditCard, Menu, Bell, Sun, Moon, 
  Copy, Check, LayoutDashboard, Settings, LogOut, Ticket, Zap, ShieldCheck
} from 'lucide-react';

export default function PremiumDashboard() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [copied, setCopied] = useState('');
  
  // ফর্ম স্টেট
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    package: '5Mbps',
    validity: '30d'
  });

  // ডার্ক মোড টগল (সিমুলেটেড)
  const [isDark, setIsDark] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    showToast(`${type} কপি করা হয়েছে!`);
    setTimeout(() => setCopied(''), 2000);
  };

  const generateRandom = () => {
    const code = Math.random().toString(36).substring(2, 8).toLowerCase();
    setFormData({ ...formData, username: code, password: code });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('🎉 ভাউচার সফলভাবে জেনারেট হয়েছে!');
    }, 1500);
  };

  // অ্যানিমেশন ভ্যারিয়েন্টস
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-medium pb-20 lg:pb-0 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      {/* টোস্ট নোটিফিকেশন */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-bold bg-white text-slate-800 border border-slate-100"
          >
            {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-500" /> : <ShieldCheck className="w-5 h-5 text-red-500" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen overflow-hidden">
        
        {/* ডেস্কটপ সাইডবার (Glassmorphism) */}
        <aside className={`hidden lg:flex flex-col w-72 border-r transition-colors ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/70 border-slate-200'} backdrop-blur-xl p-6 relative z-20`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">PK-NET<span className="text-indigo-500">.</span></h1>
          </div>

          <nav className="space-y-2 flex-1">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold border border-indigo-500/20 transition-all cursor-pointer">
              <LayoutDashboard className="w-5 h-5" /> ড্যাশবোর্ড
            </div>
            {['ইউজার লিস্ট', 'সেলস রিপোর্ট', 'রাউটার সেটিং'].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'}`}>
                {i === 0 && <Users className="w-5 h-5" />}
                {i === 1 && <Activity className="w-5 h-5" />}
                {i === 2 && <Settings className="w-5 h-5" />}
                {item}
              </div>
            ))}
          </nav>
          
          <div className="mt-auto">
            <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold ${isDark ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
              <LogOut className="w-5 h-5" /> লগআউট
            </button>
          </div>
        </aside>

        {/* মেইন কন্টেন্ট এরিয়া */}
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
          
          {/* ফ্লোটিং টপ নেভবার */}
          <header className={`sticky top-0 z-30 px-6 lg:px-10 py-4 backdrop-blur-md transition-colors ${isDark ? 'bg-slate-900/80 border-b border-slate-800' : 'bg-white/80 border-b border-slate-200/50'} flex justify-between items-center`}>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">ওভারভিউ</h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>স্বাগতম, আপনার আজকের আপডেট</p>
            </div>
            <div className="flex items-center gap-3 lg:gap-5">
              <button onClick={() => setIsDark(!isDark)} className={`p-2.5 rounded-full transition-all ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className={`p-2.5 rounded-full relative transition-all ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-300/50">
                <div className="text-right">
                  <p className="text-sm font-bold">Jahid Hasan Sohag</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>অ্যাডমিন</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-white">
                  J
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
            
            {/* স্ট্যাটস কার্ডস (অ্যানিমেটেড) */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
              {[
                { title: 'অ্যাক্টিভ ইউজার', val: '১২৪', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { title: 'আজকের সেল', val: '৳ ১,৪৫০', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { title: 'মোট ভাউচার', val: '৪৫২', icon: Ticket, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { title: 'রাউটার স্ট্যাটাস', val: 'অনলাইন', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className={`p-5 lg:p-6 rounded-3xl transition-all border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'} hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className={`text-xs lg:text-sm font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-extrabold">{stat.val}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* মেইন ২ কলাম লেআউট */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* ভাউচার জেনারেটর ফর্ম (বাম দিক) */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className={`xl:col-span-7 rounded-[2.5rem] p-6 lg:p-10 border relative overflow-hidden ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'}`}>
                {/* ব্যাকগ্রাউন্ড গ্লো */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-10 -translate-y-1/2 translate-x-1/3"></div>

                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">স্মার্ট ভাউচার তৈরি</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>কয়েক ক্লিকেই প্রিমিয়াম ভাউচার জেনারেট করুন</p>
                  </div>
                  <button onClick={generateRandom} className="text-sm font-bold text-indigo-500 bg-indigo-500/10 px-4 py-2 rounded-xl hover:bg-indigo-500/20 transition-all flex items-center gap-2">
                    <Zap className="w-4 h-4" /> অটো কোড
                  </button>
                </div>

                <form onSubmit={handleGenerate} className="space-y-6">
                  {/* ক্রেডেনশিয়ালস */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-bold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>ইউজারনেম</label>
                      <input 
                        type="text" 
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required 
                        className={`w-full px-5 py-4 rounded-2xl outline-none font-bold text-lg transition-all border-2 ${isDark ? 'bg-slate-900/50 border-slate-700 focus:border-indigo-500 placeholder:text-slate-600' : 'bg-slate-50 border-transparent focus:border-indigo-500 focus:bg-white placeholder:text-slate-400'}`} 
                        placeholder="ইউজারনেম দিন" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-sm font-bold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>পাসওয়ার্ড</label>
                      <input 
                        type="text" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                        className={`w-full px-5 py-4 rounded-2xl outline-none font-bold text-lg transition-all border-2 ${isDark ? 'bg-slate-900/50 border-slate-700 focus:border-indigo-500 placeholder:text-slate-600' : 'bg-slate-50 border-transparent focus:border-indigo-500 focus:bg-white placeholder:text-slate-400'}`} 
                        placeholder="পাসওয়ার্ড দিন" 
                      />
                    </div>
                  </div>

                  {/* প্যাকেজ (Chips) */}
                  <div className="space-y-3">
                    <label className={`text-sm font-bold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>প্যাকেজ / স্পিড</label>
                    <div className="flex flex-wrap gap-3">
                      {['Default', '2Mbps', '5Mbps', '10Mbps'].map(pkg => (
                        <button 
                          key={pkg} type="button"
                          onClick={() => setFormData({...formData, package: pkg})}
                          className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${formData.package === pkg ? 'border-indigo-500 bg-indigo-500/10 text-indigo-500' : `${isDark ? 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}`}
                        >
                          {pkg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* মেয়াদ (Chips) */}
                  <div className="space-y-3">
                    <label className={`text-sm font-bold ml-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>মেয়াদ (Validity)</label>
                    <div className="flex flex-wrap gap-3">
                      {[{l: '১ দিন', v: '1d'}, {l: '৭ দিন', v: '7d'}, {l: '১৫ দিন', v: '15d'}, {l: '৩০ দিন', v: '30d'}].map(val => (
                        <button 
                          key={val.v} type="button"
                          onClick={() => setFormData({...formData, validity: val.v})}
                          className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${formData.validity === val.v ? 'border-purple-500 bg-purple-500/10 text-purple-500' : `${isDark ? 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}`}
                        >
                          {val.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className={`w-full text-white font-bold text-lg py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl mt-4 relative overflow-hidden group ${loading ? 'bg-indigo-400 cursor-wait' : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right active:scale-[0.98]'}`}>
                    {loading ? (
                      <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>ভাউচার জেনারেট করুন <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" /></>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* লাইভ ভাউচার প্রিভিউ (ডান দিক) */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="xl:col-span-5 relative">
                <div className="sticky top-28">
                  <div className="flex items-center gap-2 mb-4 ml-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>লাইভ প্রিভিউ</p>
                  </div>
                  
                  {/* টিকেট ডিজাইন কার্ড */}
                  <div className={`rounded-[2.5rem] p-8 border relative overflow-hidden ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-b from-indigo-500 to-blue-700 border-blue-400 shadow-2xl shadow-blue-500/30'} text-white`}>
                    
                    {/* টিকেট কাট-আউট ইফেক্ট */}
                    <div className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full -translate-y-1/2 ${isDark ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}></div>
                    <div className={`absolute top-1/2 -right-4 w-8 h-8 rounded-full -translate-y-1/2 ${isDark ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}></div>
                    <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-white/20 -translate-y-1/2"></div>

                    <div className="text-center pb-8 border-b border-white/10 relative z-10">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md mb-4 border border-white/20">
                        <Wifi className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-extrabold tracking-tight">PK-NET WIFI</h2>
                      <p className="text-blue-200 font-medium mt-1">প্রিমিয়াম ইন্টারনেট সার্ভিস</p>
                    </div>

                    <div className="pt-8 space-y-5 relative z-10">
                      <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 group">
                        <div>
                          <p className="text-blue-200 text-xs font-bold uppercase mb-1">ইউজারনেম</p>
                          <p className="text-2xl font-mono font-bold tracking-wider">{formData.username || 'xxxxxx'}</p>
                        </div>
                        <button onClick={() => handleCopy(formData.username, 'username')} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                          {copied === 'username' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 group">
                        <div>
                          <p className="text-blue-200 text-xs font-bold uppercase mb-1">পাসওয়ার্ড</p>
                          <p className="text-2xl font-mono font-bold tracking-wider">{formData.password || 'xxxxxx'}</p>
                        </div>
                        <button onClick={() => handleCopy(formData.password, 'password')} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                          {copied === 'password' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex justify-between items-center px-2 pt-2">
                        <div>
                          <p className="text-blue-200 text-xs font-bold uppercase mb-1">প্যাকেজ</p>
                          <p className="text-lg font-bold">{formData.package}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-200 text-xs font-bold uppercase mb-1">মেয়াদ</p>
                          <p className="text-lg font-bold">{formData.validity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>
        </main>
      </div>

      {/* মোবাইল বটম নেভিগেশন (Fixed) */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full z-40 px-6 py-4 backdrop-blur-xl border-t ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} flex justify-between items-center pb-safe`}>
        {[
          { icon: LayoutDashboard, active: true },
          { icon: Users, active: false },
          { icon: Activity, active: false },
          { icon: Settings, active: false }
        ].map((item, i) => (
          <button key={i} className={`p-3 rounded-2xl transition-all ${item.active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : `${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-100'}`}`}>
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>

    </div>
  );
}
