'use client';
import React, { useState, useEffect, useMemo } from 'react';

// ডামি ইউজার ডেটা (ভবিষ্যতে এটি মাইক্রোটিক API থেকে আসবে)
const initialUsers = [
  { id: 1, username: 'pk-user1', package: '5Mbps', uptime: '12d 4h', dataUsage: '14.5 GB', status: 'active', isOnline: true, expireDate: '২০২৬-০৬-১৫' },
  { id: 2, username: 'sohag99', package: '2Mbps', uptime: '1d 2h', dataUsage: '1.2 GB', status: 'active', isOnline: false, expireDate: '২০২৬-০৫-২৫' },
  { id: 3, username: 'guest_007', package: 'Default', uptime: '0h 45m', dataUsage: '300 MB', status: 'expired', isOnline: false, expireDate: '২০২৬-০৫-২০' },
  { id: 4, username: 'pk-vip', package: '10Mbps', uptime: '20d 1h', dataUsage: '45.8 GB', status: 'disabled', isOnline: false, expireDate: '২০২৬-০৬-০১' },
  { id: 5, username: 'user_xyz', package: '5Mbps', uptime: '4d 10h', dataUsage: '5.4 GB', status: 'active', isOnline: true, expireDate: '২০২৬-০৬-১০' },
  { id: 6, username: 'test_id', package: '2Mbps', uptime: '7d 0h', dataUsage: '8.1 GB', status: 'active', isOnline: true, expireDate: '২০২৬-০৬-০৫' },
];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modals & Toasts
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [deleteModal, setDeleteModal] = useState({ show: false, userId: null });
  const [detailsModal, setDetailsModal] = useState({ show: false, user: null });

  // সিমুলেটেড লোডিং ইফেক্ট
  useEffect(() => {
    setTimeout(() => {
      setUsers(initialUsers);
      setLoading(false);
    }, 1500);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // সার্চ এবং ফিল্টার লজিক
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchQuery, filterStatus]);

  // অ্যাকশন হ্যান্ডলার
  const toggleUserStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus, isOnline: false } : u));
    showToast(`ইউজার ${newStatus === 'active' ? 'অ্যাক্টিভ' : 'ডিজেবল'} করা হয়েছে!`);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== deleteModal.userId));
    setDeleteModal({ show: false, userId: null });
    showToast('ইউজার সফলভাবে ডিলিট হয়েছে!', 'error'); // error style for delete action
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex flex-col lg:flex-row font-medium relative">
      
      {/* টোস্ট নোটিফিকেশন */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      </div>

      {/* ডিলিট কনফার্মেশন মডাল */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-[scale-in_0.2s_ease-out]">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 mb-2">ইউজার ডিলিট করবেন?</h3>
            <p className="text-center text-slate-500 text-sm mb-6">এই অ্যাকশনটি বাতিল করা যাবে না। আপনি কি নিশ্চিত?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, userId: null })} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">বাতিল</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-colors">ডিলিট করুন</button>
            </div>
          </div>
        </div>
      )}

      {/* ইউজার ডিটেইলস মডাল */}
      {detailsModal.show && detailsModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setDetailsModal({ show: false, user: null })} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-white shadow-sm">
                <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{detailsModal.user.username}</h3>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-2 ${detailsModal.user.isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                <span className={`w-2 h-2 rounded-full ${detailsModal.user.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                {detailsModal.user.isOnline ? 'অনলাইনে আছে' : 'অফলাইন'}
              </div>
            </div>
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0">
                <span className="text-slate-500 text-sm">প্যাকেজ</span>
                <span className="font-bold text-slate-800">{detailsModal.user.package}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0">
                <span className="text-slate-500 text-sm">মোট আপটাইম</span>
                <span className="font-bold text-slate-800">{detailsModal.user.uptime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0">
                <span className="text-slate-500 text-sm">ডাটা ইউজ</span>
                <span className="font-bold text-slate-800">{detailsModal.user.dataUsage}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-200/60 last:border-0">
                <span className="text-slate-500 text-sm">মেয়াদ শেষ</span>
                <span className="font-bold text-red-500">{detailsModal.user.expireDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* সাইডবার (একই ডিজাইন) */}
      <aside className="w-full lg:w-72 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-6 lg:min-h-screen relative overflow-hidden hidden lg:flex flex-col">
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl font-bold mb-2 tracking-tight">PK-NET<span className="text-blue-400">.</span></h2>
          <p className="text-indigo-200 text-sm mb-10 opacity-80">অ্যাডভান্সড হটস্পট সিস্টেম</p>
          <nav className="space-y-3">
            <a href="/" className="flex items-center gap-3 py-3 px-4 hover:bg-white/5 rounded-xl transition-all text-indigo-100 hover:text-white">
              <span>ড্যাশবোর্ড</span>
            </a>
            <div className="flex items-center gap-3 py-3 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-inner cursor-pointer transition-all">
              <span className="font-semibold tracking-wide">ইউজার লিস্ট</span>
            </div>
          </nav>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 w-full max-w-7xl mx-auto overflow-hidden">
        
        {/* হেডার ও স্ট্যাটস */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-1">ম্যানেজ ইউজার্স</h1>
            <p className="text-slate-500 text-sm">মোট {users.length} জন ইউজার সিস্টেমে আছে</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-700">{users.filter(u => u.isOnline).length} অনলাইন</span>
            </div>
          </div>
        </div>

        {/* সার্চ ও ফিল্টার বার */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 relative z-10">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="ইউজারনেম দিয়ে খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-700" 
            />
          </div>
          <div className="w-full md:w-48 relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none text-sm font-bold text-slate-700"
            >
              <option value="all">সব ইউজার</option>
              <option value="active">অ্যাক্টিভ</option>
              <option value="expired">মেয়াদোত্তীর্ণ</option>
              <option value="disabled">ডিজেবল</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* ইউজার কার্ড গ্রিড */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-pulse h-48">
                <div className="flex gap-4 items-center mb-4"><div className="w-12 h-12 bg-slate-200 rounded-full"></div><div className="space-y-2"><div className="w-24 h-4 bg-slate-200 rounded"></div><div className="w-16 h-3 bg-slate-200 rounded"></div></div></div>
                <div className="space-y-3"><div className="w-full h-3 bg-slate-200 rounded"></div><div className="w-2/3 h-3 bg-slate-200 rounded"></div></div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-700">কোনো ইউজার পাওয়া যায়নি</h3>
            <p className="text-slate-500 text-sm mt-1">আপনার সার্চ বা ফিল্টারের সাথে মিল থাকা কোনো ডেটা নেই।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all group relative overflow-hidden">
                
                {/* স্ট্যাটাস সাইড-কালার লাইন */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${user.status === 'active' ? 'bg-blue-500' : user.status === 'expired' ? 'bg-red-500' : 'bg-orange-400'}`}></div>

                {/* টপ সেকশন: নাম ও ব্যাজ */}
                <div className="flex justify-between items-start mb-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg border border-indigo-100">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${user.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg leading-tight">{user.username}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${
                          user.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                          user.status === 'expired' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* থ্রি-ডট অ্যাকশন মেনুর বদলে সরাসরি বাটন */}
                  <div className="flex gap-1">
                    <button onClick={() => setDetailsModal({ show: true, user })} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="বিস্তারিত">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    <button onClick={() => toggleUserStatus(user.id, user.status)} className={`p-2 rounded-lg transition-colors ${user.status === 'disabled' ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-orange-500 hover:bg-orange-50'}`} title={user.status === 'disabled' ? 'অ্যাক্টিভ করুন' : 'ডিজেবল করুন'}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
                    </button>
                    <button onClick={() => setDeleteModal({ show: true, userId: user.id })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ডিলিট">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>

                {/* ইনফো গ্রিড */}
                <div className="grid grid-cols-2 gap-y-3 pl-2 text-sm">
                  <div>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">প্যাকেজ</p>
                    <p className="font-bold text-slate-700">{user.package}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">ডাটা ইউজ</p>
                    <p className="font-bold text-slate-700">{user.dataUsage}</p>
                  </div>
                  <div className="col-span-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex justify-between items-center mt-1">
                    <div>
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">আপটাইম</p>
                      <p className="font-bold text-slate-700">{user.uptime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">মেয়াদ</p>
                      <p className={`font-bold ${user.status === 'expired' ? 'text-red-500' : 'text-slate-700'}`}>{user.expireDate}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
