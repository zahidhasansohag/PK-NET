'use client';
import React, { useState, useEffect } from 'react';

// ডামি রাউটার ডেটা
const initialRouters = [
  { id: 1, name: 'PK-NET Main Router', ip: '192.168.88.1', port: '8728', os: 'v7.12.1', uptime: '12d 4h 15m', cpu: 14, ram: 45, users: 124, status: 'online', ping: '12ms', lastActive: 'এখন' },
  { id: 2, name: 'Khidirpur AP', ip: '10.0.0.1', port: '8728', os: 'v6.49.7', uptime: '5d 1h 30m', cpu: 8, ram: 30, users: 45, status: 'online', ping: '25ms', lastActive: 'এখন' },
  { id: 3, name: 'Backup Mikrotik', ip: '192.168.1.1', port: '8728', os: 'v7.10.2', uptime: '0h 0m 0s', cpu: 0, ram: 0, users: 0, status: 'offline', ping: 'timeout', lastActive: '২ ঘণ্টা আগে' },
];

const initialLogs = [
  { id: 1, time: '১০:৪৫ AM', router: 'PK-NET Main Router', message: 'সিস্টেম অটো-ব্যাকআপ সম্পন্ন হয়েছে', type: 'info' },
  { id: 2, time: '০৯:৩০ AM', router: 'Backup Mikrotik', message: 'API কানেকশন টাইমআউট (Connection Lost)', type: 'error' },
  { id: 3, time: '০৮:১৫ AM', router: 'Khidirpur AP', message: 'নতুন অ্যাডমিন ইউজার লগইন করেছে', type: 'warning' },
];

export default function RouterManagement() {
  const [routers, setRouters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modals & Toasts
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [deleteModal, setDeleteModal] = useState({ show: false, routerId: null });
  const [routerModal, setRouterModal] = useState({ show: false, editMode: false, data: null });
  const [testingConnection, setTestingConnection] = useState(false);

  // সিমুলেটেড লোডিং ও অটো-রিফ্রেশ
  useEffect(() => {
    setTimeout(() => {
      setRouters(initialRouters);
      setLoading(false);
    }, 1000);

    // প্রতি ১০ সেকেন্ডে অটো রিফ্রেশ স্ট্যাটাস (সিমুলেশন)
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 800);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      showToast('কানেকশন সফল! রাউটার রেসপন্স করছে।');
    }, 2000);
  };

  const confirmDelete = () => {
    setRouters(routers.filter(r => r.id !== deleteModal.routerId));
    setDeleteModal({ show: false, routerId: null });
    showToast('রাউটার সফলভাবে রিমুভ করা হয়েছে!', 'error');
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col lg:flex-row font-medium relative">
      
      {/* টোস্ট নোটিফিকেশন */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      </div>

      {/* রাউটার অ্যাড/এডিট মডাল */}
      {routerModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-lg w-full shadow-2xl animate-[scale-in_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-800">{routerModal.editMode ? 'রাউটার এডিট করুন' : 'নতুন রাউটার যুক্ত করুন'}</h3>
              <button onClick={() => setRouterModal({ show: false })} className="text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setRouterModal({ show: false }); showToast('রাউটার সেভ করা হয়েছে!'); }} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 ml-1">রাউটারের নাম</label>
                <input type="text" required className="w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-slate-700" placeholder="e.g. PK-NET Main" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 ml-1">IP Address (বা DDNS)</label>
                  <input type="text" required className="w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-slate-700" placeholder="192.168.88.1" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 ml-1">API Port</label>
                  <input type="number" required defaultValue="8728" className="w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-slate-700" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 ml-1">API Username</label>
                  <input type="text" required className="w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-slate-700" placeholder="admin" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 ml-1">API Password</label>
                  <input type="password" required className="w-full px-4 py-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-slate-700" placeholder="••••••••" />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleTestConnection} disabled={testingConnection} className={`flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex justify-center items-center gap-2 ${testingConnection ? 'cursor-wait' : ''}`}>
                  {testingConnection ? <span className="animate-spin w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full"></span> : 'কানেকশন টেস্ট'}
                </button>
                <button type="submit" className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all">সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ডিলিট কনফার্মেশন */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">রাউটার ডিলিট করবেন?</h3>
            <p className="text-center text-slate-500 text-sm mb-6">সিস্টেম থেকে রাউটারটি মুছে যাবে, তবে রাউটারের ভেতরের ডেটা ঠিক থাকবে।</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false })} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">বাতিল</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-colors">ডিলিট করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* সাইডবার */}
      <aside className="w-full lg:w-72 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-6 lg:min-h-screen hidden lg:flex flex-col shadow-2xl relative">
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl font-bold mb-10 tracking-tight">PK-NET<span className="text-blue-400">.</span></h2>
          <nav className="space-y-3">
            <a href="/" className="block py-3 px-4 hover:bg-white/10 rounded-xl transition-all">ড্যাশবোর্ড</a>
            <a href="/users" className="block py-3 px-4 hover:bg-white/10 rounded-xl transition-all">ইউজার লিস্ট</a>
            <a href="/reports" className="block py-3 px-4 hover:bg-white/10 rounded-xl transition-all">সেলস রিপোর্ট</a>
            <div className="py-3 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-inner text-indigo-100">রাউটার কানেকশন</div>
          </nav>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট */}
      <main className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* হেডার */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              রাউটার ম্যানেজমেন্ট
              {refreshing && <span className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span> সিঙ্কিং...</span>}
            </h1>
            <p className="text-slate-500 mt-1">মাইক্রোটিক রাউটার যুক্ত করুন এবং লাইভ স্ট্যাটাস মনিটর করুন</p>
          </div>
          <button onClick={() => setRouterModal({ show: true, editMode: false })} className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            নতুন রাউটার যুক্ত করুন
          </button>
        </div>

        {/* হেলথ ওভারভিউ কার্ডস */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { title: 'মোট রাউটার', val: routers.length, icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01', color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'অ্যাক্টিভ ইউজার', val: routers.reduce((sum, r) => sum + r.users, 0), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { title: 'গড় CPU ইউজ', val: '১১%', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', color: 'text-orange-500', bg: 'bg-orange-50' },
            { title: 'অফলাইন রাউটার', val: routers.filter(r => r.status === 'offline').length, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'text-red-500', bg: 'bg-red-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-2xl font-extrabold text-slate-800 leading-none">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* রাউটার কার্ড গ্রিড */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {loading ? (
             [1, 2].map(n => <div key={n} className="bg-white h-64 rounded-[2rem] border border-slate-100 shadow-sm animate-pulse"></div>)
          ) : routers.length === 0 ? (
            <div className="col-span-full bg-white rounded-[2rem] p-12 text-center border border-slate-100 shadow-sm">
              <p className="text-slate-500 font-bold text-lg">কোনো রাউটার যুক্ত করা নেই!</p>
            </div>
          ) : (
            routers.map(router => (
              <div key={router.id} className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group hover:shadow-xl transition-all">
                
                {/* স্ট্যাটাস গ্লো */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 opacity-30 transition-colors ${router.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

                <div className="p-6 md:p-8">
                  {/* কার্ড হেডার */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border border-white ${router.status === 'online' ? 'bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600' : 'bg-gradient-to-br from-red-100 to-rose-50 text-red-500'}`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
                        </div>
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${router.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 leading-tight">{router.name}</h3>
                        <p className="text-slate-500 text-sm mt-1 font-semibold flex items-center gap-2">
                          {router.ip}:{router.port} 
                          <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider ${router.status === 'online' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {router.ping}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    {/* অ্যাকশন বাটনস */}
                    <div className="flex gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <button onClick={() => setRouterModal({ show: true, editMode: true, data: router })} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm" title="এডিট">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => setDeleteModal({ show: true, routerId: router.id })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm" title="ডিলিট">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>

                  {/* রিসোর্স গ্রিড */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">CPU Load</p>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-lg ${router.cpu > 80 ? 'text-red-500' : 'text-slate-700'}`}>{router.cpu}%</p>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-[40px]"><div className={`h-full ${router.cpu > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${router.cpu}%` }}></div></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">RAM Usage</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-slate-700">{router.ram}%</p>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-[40px]"><div className="h-full bg-indigo-500" style={{ width: `${router.ram}%` }}></div></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">Active Users</p>
                      <p className="font-bold text-lg text-emerald-600">{router.users}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">RouterOS</p>
                      <p className="font-bold text-lg text-slate-700">{router.os}</p>
                    </div>
                  </div>
                  
                  {/* আপটাইম ও লাস্ট অ্যাক্টিভ */}
                  <div className="mt-5 flex justify-between items-center text-sm border-t border-slate-100 pt-4">
                    <p className="text-slate-500 font-semibold"><span className="text-slate-400 mr-1">আপটাইম:</span> {router.uptime}</p>
                    <p className="text-slate-500 font-semibold"><span className="text-slate-400 mr-1">লাস্ট পিং:</span> {router.lastActive}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* অ্যাক্টিভিটি ও এরর লগস */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              রাউটার অ্যাক্টিভিটি লগস
            </h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">ক্লিয়ার লগস</button>
          </div>
          <div className="divide-y divide-slate-100">
            {logs.length === 0 ? (
               <div className="p-8 text-center text-slate-500">কোনো লগ পাওয়া যায়নি।</div>
            ) : (
              initialLogs.map(log => (
                <div key={log.id} className="p-4 md:p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${log.type === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : log.type === 'warning' ? 'bg-orange-400' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className={`font-bold ${log.type === 'error' ? 'text-red-600' : 'text-slate-800'}`}>{log.message}</p>
                    <p className="text-sm font-semibold text-slate-500 mt-0.5">{log.router}</p>
                  </div>
                  <div className="text-sm font-bold text-slate-400 whitespace-nowrap">{log.time}</div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
