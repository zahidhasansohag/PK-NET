'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // লিঙ্ক করার জন্য এটি জরুরি
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Users, Activity, CreditCard, Menu, Bell, Sun, Moon, 
  Copy, Check, LayoutDashboard, Settings, LogOut, Ticket, Zap, ShieldCheck
} from 'lucide-react';

export default function PremiumDashboard() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [copied, setCopied] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', package: '5Mbps', validity: '30d' });
  const [isDark, setIsDark] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    showToast(`${type} কপি হয়েছে!`);
    setTimeout(() => setCopied(''), 2000);
  };

  const generateRandom = () => {
    const code = Math.random().toString(36).substring(2, 8).toLowerCase();
    setFormData({ ...formData, username: code, password: code });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-medium ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      <div className="flex h-screen overflow-hidden">
        
        {/* সাইডবার - লিঙ্কসহ */}
        <aside className={`hidden lg:flex flex-col w-72 border-r ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/70 border-slate-200'} backdrop-blur-xl p-6 z-20`}>
          <div className="flex items-center gap-3 mb-10"><div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center"><Wifi className="text-white" /></div><h1 className="text-2xl font-extrabold">PK-NET.</h1></div>

          <nav className="space-y-2 flex-1">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold border border-indigo-500/20"><LayoutDashboard className="w-5 h-5" /> ড্যাশবোর্ড</Link>
            <Link href="/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all"><Users className="w-5 h-5" /> ইউজার লিস্ট</Link>
            <Link href="/reports" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all"><Activity className="w-5 h-5" /> সেলস রিপোর্ট</Link>
            <Link href="/routers" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-all"><Settings className="w-5 h-5" /> রাউটার সেটিং</Link>
          </nav>
          
          <button onClick={() => { fetch('/api/auth/logout', {method: 'POST'}); window.location.href='/login'; }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold"><LogOut className="w-5 h-5" /> লগআউট</button>
        </aside>

        {/* মেইন কন্টেন্ট */}
        <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            
            {/* ভাউচার জেনারেটর ফর্ম */}
            <div className={`rounded-[2.5rem] p-8 border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
              <h3 className="text-2xl font-bold mb-6">স্মার্ট ভাউচার জেনারেটর</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" placeholder="ইউজারনেম" />
                  <input type="text" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" placeholder="পাসওয়ার্ড" />
                </div>
                <button type="button" onClick={generateRandom} className="text-indigo-600 font-bold">অটো কোড তৈরি করুন</button>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all">ভাউচার জেনারেট করুন</button>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
