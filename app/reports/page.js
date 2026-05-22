'use client';
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts';

// ডামি সেলস ডেটা
const dailyData = [
  { name: 'শনি', sales: 450 }, { name: 'রবি', sales: 800 }, { name: 'সোম', sales: 600 },
  { name: 'মঙ্গল', sales: 1200 }, { name: 'বুধ', sales: 700 }, { name: 'বৃহঃ', sales: 1500 }, { name: 'শুক্র', sales: 2100 },
];

const monthlyData = [
  { name: 'জানু', total: 12000 }, { name: 'ফেব্রু', total: 15000 }, { name: 'মার্চ', total: 18000 }, { name: 'এপ্রিল', total: 14000 },
];

const packageData = [
  { name: '১ দিন', value: 45, color: '#6366f1' },
  { name: '৭ দিন', value: 25, color: '#8b5cf6' },
  { name: '১৫ দিন', value: 20, color: '#ec4899' },
  { name: '৩০ দিন', value: 10, color: '#f59e0b' },
];

const initialTransactions = [
  { id: 101, user: 'sohag_77', pkg: '১ দিন', price: 20, date: '২০২৬-০৫-২৩', time: '১০:৩০ AM', status: 'success' },
  { id: 102, user: 'pk-test', pkg: '৩০ দিন', price: 500, date: '২০২৬-০৫-২৩', time: '০৯:১৫ AM', status: 'success' },
  { id: 103, user: 'user_xyz', pkg: '৭ দিন', price: 100, date: '২০২৬-০৫-২২', time: '০৮:৪৫ PM', status: 'success' },
  { id: 104, user: 'pavel_pk', pkg: '১ দিন', price: 20, date: '২০২৬-০৫-২২', time: '০৪:২০ PM', status: 'failed' },
  { id: 105, user: 'jamal_net', pkg: '১৫ দিন', price: 250, date: '২০২৬-০৫-২২', time: '০১:১০ PM', status: 'success' },
];

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  const filteredHistory = transactions.filter(t => 
    t.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7fe] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold animate-pulse">রিপোর্ট লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col lg:flex-row font-medium">
      
      {/* সাইডবার (আগের মতোই) */}
      <aside className="w-full lg:w-72 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-6 lg:min-h-screen hidden lg:flex flex-col shadow-2xl">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-10 tracking-tight">PK-NET<span className="text-blue-400">.</span></h2>
          <nav className="space-y-4">
            <a href="/" className="block py-3 px-4 hover:bg-white/10 rounded-xl transition-all">ড্যাশবোর্ড</a>
            <a href="/users" className="block py-3 px-4 hover:bg-white/10 rounded-xl transition-all">ইউজার লিস্ট</a>
            <div className="py-3 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-inner">সেলস রিপোর্ট</div>
          </nav>
        </div>
      </aside>

      {/* মেইন এরিয়া */}
      <main className="flex-1 p-4 md:p-10 w-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* হেডার */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">সেলস ও অ্যানালিটিক্স</h1>
            <p className="text-slate-500 mt-1">আপনার ব্যবসার আয় এবং পারফরম্যান্স ট্র্যাক করুন</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-slate-700 font-bold px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              PDF এক্সপোর্ট
            </button>
            <button className="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30">
              আজকের রিপোর্ট
            </button>
          </div>
        </div>

        {/* সামারি কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'আজকের আয়', val: '৳ ১,৮৫০', trend: '+১২%', color: 'from-blue-500 to-indigo-600' },
            { label: 'সাপ্তাহিক আয়', val: '৳ ১২,৪০০', trend: '+৮%', color: 'from-purple-500 to-indigo-600' },
            { label: 'মোট ভাউচার সেল', val: '৪৫২ টি', trend: '+১৫%', color: 'from-emerald-500 to-teal-600' },
            { label: 'মোট নেট ইনকাম', val: '৳ ১,৮৫,০০০', trend: '+২০%', color: 'from-orange-500 to-pink-600' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-[0.03] -mr-10 -mt-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
              <h3 className="text-slate-500 text-sm font-bold mb-2">{item.label}</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-800">{item.val}</span>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* চার্ট সেকশন */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* ডেইলি সেলস লাইন চার্ট */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              সাপ্তাহিক সেলস ট্রেন্ড
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                    cursor={{stroke: '#6366f1', strokeWidth: 2}}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* প্যাকেজ ইউসেজ পাই চার্ট */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              জনপ্রিয় প্যাকেজ
            </h3>
            <div className="h-[300px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {packageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ট্রানজ্যাকশন হিস্ট্রি */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800">সাম্প্রতিক ট্রানজ্যাকশন</h3>
            <div className="relative max-w-xs w-full">
              <input 
                type="text" 
                placeholder="ইউজার দিয়ে খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 outline-none text-sm"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4 font-bold">ইউজারনেম</th>
                  <th className="px-8 py-4 font-bold">প্যাকেজ</th>
                  <th className="px-8 py-4 font-bold">আয়</th>
                  <th className="px-8 py-4 font-bold">তারিখ ও সময়</th>
                  <th className="px-8 py-4 font-bold">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredHistory.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-700">{t.user}</td>
                    <td className="px-8 py-5 text-slate-600">{t.pkg}</td>
                    <td className="px-8 py-5 font-extrabold text-indigo-600">৳ {t.price}</td>
                    <td className="px-8 py-5 text-slate-500 text-sm">
                      {t.date} <span className="mx-2 text-slate-300">|</span> {t.time}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {t.status === 'success' ? 'সফল' : 'ব্যর্থ'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              <p>দুঃখিত, কোনো ট্রানজ্যাকশন পাওয়া যায়নি!</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
