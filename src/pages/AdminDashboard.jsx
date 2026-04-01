import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Heart, Clock, CheckCircle, XCircle, Trash2, 
  Search, Filter, RefreshCw, LayoutDashboard, TrendingUp,
  Globe, BarChart3, Menu, Mail, ShieldAlert, ShieldCheck
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [volunteers, setVolunteers] = useState([]);
    const [donations, setDonations] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filters & Search
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const navigate = useNavigate();

    // Admin Authorization Logic
    const isAdmin = session?.user?.email === 'basha@gmail.com';

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            
            if (!currentSession) {
                navigate('/admin-login');
                return;
            }

            setSession(currentSession);
            await fetchData();
        };

        checkAuthAndFetch();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/admin-login');
            } else {
                setSession(session);
                fetchData();
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Volunteers
            const { data: volData } = await supabase
                .from('volunteers')
                .select('*')
                .order('created_at', { ascending: false });
            setVolunteers(volData || []);

            // Fetch Donations
            const { data: donData } = await supabase
                .from('donations')
                .select('*')
                .order('created_at', { ascending: false });
            setDonations(donData || []);

            // Fetch Contacts/Inquiries
            const { data: contactData } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });
            setContacts(contactData || []);

        } catch (error) {
            console.error("Fetch error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus, table = 'volunteers') => {
        if (!isAdmin) return alert("Unauthorized access.");
        try {
            const { error } = await supabase
                .from(table)
                .update({ status: newStatus })
                .eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    const deleteEntry = async (id, table = 'volunteers') => {
        if (!isAdmin) return alert("Unauthorized access.");
        if (!window.confirm("Confirm permanent deletion? This action is irreversible.")) return;
        try {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    // Derived Stats
    const stats = {
        totalVolunteers: volunteers.length,
        approvedVolunteers: volunteers.filter(v => v.status === 'Approved').length,
        pendingVolunteers: volunteers.filter(v => v.status === 'Pending').length,
        totalDonations: donations.reduce((acc, curr) => acc + (curr.amount || 0), 0),
        contactCount: contacts.length
    };

    const filteredVolunteers = volunteers.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             v.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || v.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const renderContent = () => {
        if (!isAdmin && !loading) {
            return (
                <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="p-8 bg-red-50 rounded-[3rem] border-4 border-red-100 shadow-2xl">
                        <ShieldAlert className="w-20 h-20 text-red-600 animate-pulse" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-black text-gray-950 tracking-tighter uppercase italic">Access Denied</h2>
                        <p className="text-gray-500 font-bold text-sm mt-2 uppercase tracking-widest leading-loose">
                            Security Protocol Active. <br />
                            Your account lacks administrator privileges.
                        </p>
                        <button onClick={() => navigate('/')} className="mt-8 px-10 py-4 bg-gray-950 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-2xl shadow-red-500/20">
                            Safe Return to Home
                        </button>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                        {/* Stats Corridor */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: 'Active Force', val: stats.totalVolunteers, icon: Users, color: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-200', trend: 'Global Reach' },
                                { label: 'Verified Ops', val: stats.approvedVolunteers, icon: CheckCircle, color: 'from-green-600 to-green-400', shadow: 'shadow-green-200', trend: 'Ready' },
                                { label: 'Active Links', val: stats.contactCount, icon: Mail, color: 'from-orange-600 to-orange-400', shadow: 'shadow-orange-200', trend: 'Incoming' },
                                { label: 'Impact Fund', val: `₹${stats.totalDonations.toLocaleString()}`, icon: Heart, color: 'from-rose-600 to-rose-400', shadow: 'shadow-rose-200', trend: 'Live Support' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-7 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`}></div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-2xl ${stat.shadow} transform group-hover:rotate-6 transition-transform duration-500`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center space-x-1 uppercase text-[8px] font-black tracking-[0.2em] text-gray-400">
                                                <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                                <span>{stat.trend}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-black text-gray-950 tracking-tighter mb-1 font-sans">{stat.val}</h3>
                                    <p className="text-gray-400 font-extrabold uppercase text-[10px] tracking-[0.3em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Analytic Zone */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] border border-white relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-emerald-400 to-transparent"></div>
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h4 className="text-2xl font-black text-gray-950 flex items-center tracking-tighter uppercase">
                                            <TrendingUp className="w-6 h-6 mr-4 text-green-600 p-1 bg-green-50 rounded-lg" /> 
                                            Growth Impulse
                                        </h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1 ml-10">System performance analytics</p>
                                    </div>
                                </div>

                                <div className="h-72 relative flex items-end justify-between px-4 group/graph">
                                    {/* Realistic Crosshair Guide */}
                                    <div className="absolute inset-x-0 bottom-10 top-0 pointer-events-none z-0">
                                        <div className="absolute left-1/2 bottom-0 w-px h-full bg-green-500/20 opacity-0 group-hover/graph:opacity-100 transition-all duration-300 left-[var(--mouse-x,50%)]">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)]"></div>
                                        </div>
                                    </div>

                                    {/* Advanced SVG Visualization */}
                                    <svg className="absolute inset-x-0 bottom-10 w-full h-full px-4 overflow-visible z-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
                                                <stop offset="50%" stopColor="#16a34a" stopOpacity="0.05" />
                                                <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {[0, 25, 50, 75, 100].map(line => (
                                            <line key={line} x1="0" y1={line} x2="400" y2={line} stroke="#f8fafc" strokeWidth="1" />
                                        ))}
                                        
                                        <path d="M0,85 C40,82 80,45 120,55 C160,65 200,80 240,75 C280,70 320,15 360,18 C380,20 400,35 400,35 L400,100 L0,100 Z" fill="url(#chartGlow)" />
                                        <path d="M0,85 C40,82 80,45 120,55 C160,65 200,80 240,75 C280,70 320,15 360,18 C380,20 400,35 400,35" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_8px_12px_rgba(22,163,74,0.3)] animate-pulse-slow" />
                                    </svg>

                                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((val, i) => (
                                        <div key={i} className="relative z-20 flex flex-col items-center group/dot h-full justify-between pb-0">
                                            <div className="absolute opacity-0 group-hover/dot:opacity-100 transition-all duration-300 bg-gray-950 text-white text-[9px] px-3 py-1.5 rounded-xl font-black pointer-events-none shadow-2xl -translate-y-4 whitespace-nowrap" style={{ top: `85%` }}>
                                                REALTIME: {Math.floor(Math.random() * 100) + 200} pts
                                            </div>
                                            <div className="absolute w-4 h-4 bg-white border-[3px] border-green-600 rounded-full shadow-xl shadow-green-200 group-hover/dot:scale-125 transition-all cursor-pointer z-30" style={{ top: '85%' }}></div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-[-40px]">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group border border-white/5">
                                <div className="absolute top-0 right-0 p-12 pointer-events-none">
                                    <Globe className="w-32 h-32 text-green-500/10 animate-spin-slow rotate-12" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                                            <Globe className="w-10 h-10 text-green-500" />
                                        </div>
                                        <span className="bg-green-600 text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.4em] shadow-lg shadow-green-900/50">Global Ops</span>
                                    </div>
                                    <h4 className="text-3xl font-black mb-3 tracking-tighter leading-none italic uppercase">Reach <span className="text-green-500">X</span></h4>
                                    <p className="text-gray-400 text-xs font-bold leading-relaxed mb-10 max-w-[200px]">Simulated territorial tracking across 42+ active urban clusters.</p>
                                </div>
                                <button 
                                    onClick={() => setActiveTab('territory')}
                                    className="mt-10 w-full bg-white text-gray-950 hover:bg-green-500 hover:text-white p-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] transition-all duration-500 shadow-2xl relative z-10"
                                >
                                    Enter Territory Map
                                </button>
                                <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-500/5 blur-[100px] pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                );

            case 'territory':
                return (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic flex items-center">
                                    <Globe className="w-8 h-8 mr-4 text-green-600 animate-pulse" /> Territory Terminal
                                </h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Active Global Operations Map</p>
                            </div>
                            <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
                                <div className="flex flex-col items-end pr-4 border-r border-gray-100">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Clusters</span>
                                    <span className="text-lg font-black text-green-600 tracking-tighter">42+</span>
                                </div>
                                <div className="pl-2">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none block">Status</span>
                                    <div className="flex items-center space-x-1 mt-1 text-[10px] font-black text-green-600 uppercase italic">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                        <span>Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-white overflow-hidden relative group">
                            <div className="h-[600px] rounded-[2.5rem] overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15222.091010892!2d78.441113!3d17.436322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8e3c167d3%3A0xd96f137e289c8949!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                                ></iframe>
                            </div>
                            
                            {/* Terminal Overlays */}
                            <div className="absolute top-10 left-10 p-6 bg-gray-950/90 backdrop-blur-xl rounded-[2rem] border border-white/10 text-white shadow-2xl pointer-events-none group-hover:translate-x-2 transition-transform">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Coordination Hub</p>
                                <p className="text-sm font-black italic uppercase tracking-tighter">Telangana Sector X</p>
                            </div>

                            <div className="absolute bottom-10 right-10 p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-100 pointer-events-none group-hover:-translate-y-2 transition-transform max-w-[200px]">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-green-600 mb-3">Reach Insights</p>
                                <p className="text-xs font-bold text-gray-600 leading-relaxed">Cross-referencing donation inflow with verified volunteer density in urban clusters.</p>
                            </div>
                        </div>
                    </div>
                );

            case 'volunteers':
                return (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <Search className="text-gray-400 w-5 h-5 ml-4" />
                                <input 
                                    type="text" 
                                    placeholder="Scan identity database..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent text-gray-950 px-4 py-2 text-sm outline-none font-bold w-64 italic placeholder:text-gray-300"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <select 
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer shadow-sm"
                                >
                                    <option value="All">All Operations</option>
                                    <option value="Pending">Waiting</option>
                                    <option value="Approved">Verified</option>
                                    <option value="Rejected">Flagged</option>
                                </select>
                                <button onClick={fetchData} className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-green-600 transition-colors shadow-sm">
                                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-950 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                            <th className="px-10 py-8">Subject Identity</th>
                                            <th className="px-10 py-8">Domain</th>
                                            <th className="px-10 py-8">Timeline</th>
                                            <th className="px-10 py-8">Status</th>
                                            <th className="px-10 py-8 text-right">Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredVolunteers.length > 0 ? filteredVolunteers.map((v) => (
                                            <tr key={v.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                                <td className="px-10 py-7">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 rounded-[1.2rem] bg-gray-950 flex items-center justify-center text-white font-black text-sm shadow-xl group-hover:rotate-3 transition-transform">
                                                            {v.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-950 font-black text-sm uppercase tracking-tighter">{v.name}</p>
                                                            <p className="text-gray-400 text-[9px] font-bold tracking-widest">{v.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7">
                                                    <span className="text-[9px] px-3 py-1 bg-green-50 text-green-600 rounded-full font-black uppercase tracking-widest border border-green-100">
                                                        {v.interest}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-7 text-gray-500 text-[10px] font-black">
                                                    {new Date(v.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-10 py-7">
                                                    <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] ${
                                                        v.status === 'Approved' ? 'text-green-600' : v.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                                                    }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                                            v.status === 'Approved' ? 'bg-green-600' : v.status === 'Pending' ? 'bg-orange-500 animate-pulse' : 'bg-red-500'
                                                        }`}></div>
                                                        <span>{v.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7 text-right">
                                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => updateStatus(v.id, 'Approved')} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm">
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => updateStatus(v.id, 'Rejected')} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deleteEntry(v.id)} className="p-3 bg-gray-50 text-gray-400 hover:text-gray-950 rounded-xl transition-all shadow-sm">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="py-24 text-center">
                                                    <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-xs italic">No identity data matches current scan.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'donations':
                return (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                         <div className="bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden min-h-[500px]">
                            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
                                <h4 className="text-xl font-black text-white flex items-center tracking-tighter uppercase italic">
                                    <Heart className="w-6 h-6 mr-4 text-rose-500 fill-rose-500" /> Capital Inflow Matrix
                                </h4>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Aggregate Impact</p>
                                    <p className="text-3xl font-black text-green-500 tracking-tighter">₹{stats.totalDonations.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-50">
                                            <th className="px-10 py-8">Donor Identity</th>
                                            <th className="px-10 py-8">Financial Volume</th>
                                            <th className="px-10 py-8">Timeline</th>
                                            <th className="px-10 py-8 text-right">Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {donations.length > 0 ? donations.map((d) => (
                                            <tr key={d.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                                <td className="px-10 py-7">
                                                    <p className="text-gray-950 font-black text-sm uppercase tracking-tighter">{d.name}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Global Supporter</p>
                                                </td>
                                                <td className="px-10 py-7 font-black text-green-600 text-lg">₹{d.amount.toLocaleString()}</td>
                                                <td className="px-10 py-7 text-gray-500 text-[10px] font-black uppercase">
                                                    {new Date(d.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-10 py-7 text-right">
                                                    <button onClick={() => deleteEntry(d.id, 'donations')} className="p-3 opacity-0 group-hover:opacity-100 bg-gray-50 text-gray-400 hover:text-gray-950 rounded-xl transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="py-24 text-center">
                                                    <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-xs italic">Awaiting initial financial link.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'contacts':
                return (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[3rem] shadow-2xl border border-white overflow-hidden min-h-[500px]">
                            <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
                                <h4 className="text-xl font-black text-white flex items-center tracking-tighter uppercase italic">
                                    <Mail className="w-6 h-6 mr-4 text-blue-500 fill-blue-500" /> Incoming Link Terminal
                                </h4>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Unread Inquiries</p>
                                    <p className="text-3xl font-black text-blue-500 tracking-tighter">{stats.contactCount}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-50">
                                            <th className="px-10 py-8">Inquiry Subject</th>
                                            <th className="px-10 py-8">Transmission Body</th>
                                            <th className="px-10 py-8">Timeline</th>
                                            <th className="px-10 py-8 text-right">Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {contacts.length > 0 ? contacts.map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                                                <td className="px-10 py-7">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping"></div>
                                                        <div>
                                                            <p className="text-gray-950 font-black text-sm uppercase tracking-tighter">{c.name}</p>
                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{c.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7">
                                                    <div className="max-w-[300px]">
                                                        <p className="text-gray-600 text-xs font-medium leading-relaxed italic line-clamp-2">"{c.message}"</p>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-7 text-gray-500 text-[10px] font-black uppercase">
                                                    {new Date(c.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-10 py-7 text-right">
                                                    <button onClick={() => deleteEntry(c.id, 'contacts')} className="p-3 opacity-0 group-hover:opacity-100 bg-gray-50 text-gray-400 hover:text-gray-950 rounded-xl transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="py-24 text-center">
                                                    <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-xs italic">Zero active link-requests detected.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
            />

            <main className="flex-grow lg:ml-64 p-6 lg:p-12">
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white rounded-2xl border border-gray-100 shadow-xl">
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="px-3 py-1 bg-green-500 text-white text-[8px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-green-500/20">Operational</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-[10px] font-black text-gray-400 tracking-widest italic uppercase">V 2.1.0-alpha</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-950 tracking-tighter uppercase italic">
                                {activeTab === 'overview' ? 'Command Matrix' : `${activeTab} terminal`}
                            </h1>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-6">
                        <div className="text-right">
                            <p className="text-sm font-black text-gray-950 tracking-tight leading-none uppercase italic">{session?.user?.email === 'basha@gmail.com' ? 'PRIME ADMIN' : 'USER-GUEST'}</p>
                            <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em] mt-2 flex items-center justify-end">
                                <ShieldCheck className="w-3 h-3 mr-1" /> Authenticated Hub
                            </p>
                        </div>
                        <div className="w-14 h-14 rounded-[1.5rem] bg-gray-950 flex items-center justify-center text-white border-4 border-green-500 shadow-2xl shadow-green-200">
                            <Users className="w-7 h-7" />
                        </div>
                    </div>
                </header>

                <div className="relative">
                    {loading ? (
                        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
                            <RefreshCw className="w-12 h-12 text-green-600 animate-spin" />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] animate-pulse">Scanning Database...</p>
                        </div>
                    ) : renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
