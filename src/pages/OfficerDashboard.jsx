import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Briefcase, Users, LayoutDashboard, Search, ListTodo, MapPin, CheckCircle, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OfficerDashboard = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        setLoading(true);
        const { data } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
        setVolunteers(data || []);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Simple Side Nav */}
            <aside className="w-64 bg-gray-950 text-white p-8 flex flex-col hidden lg:flex">
                <div className="flex items-center space-x-3 mb-12">
                    <Briefcase className="w-8 h-8 text-green-500 fill-green-500" />
                    <div>
                        <h1 className="text-xl font-black italic uppercase tracking-tighter">Officer <span className="text-green-500">Node</span></h1>
                        <p className="text-[8px] font-black uppercase text-gray-500 tracking-[0.3em]">Field operations</p>
                    </div>
                </div>

                <nav className="space-y-4">
                    <button className="w-full flex items-center space-x-4 p-4 bg-white/5 rounded-2xl text-green-500 font-black uppercase text-[10px] tracking-widest border border-white/5">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Operations</span>
                    </button>
                    <button className="w-full flex items-center space-x-4 p-4 text-gray-400 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">
                        <ListTodo className="w-4 h-4" />
                        <span>Assigned Tasks</span>
                    </button>
                </nav>

                <button onClick={handleLogout} className="mt-auto flex items-center space-x-4 p-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 rounded-2xl transition-all">
                    <LogOut className="w-4 h-4" />
                    <span>Terminate</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-10">
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-black text-gray-950 tracking-tighter uppercase italic leading-none">Field <span className="text-blue-600 underline underline-offset-8 decoration-gray-950/10">Operations</span></h2>
                            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-3 flex items-center">
                                <MapPin className="w-3 h-3 mr-2 text-red-500 animate-pulse" /> Active sector monitoring
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-gray-200/50 border border-white flex items-center space-x-4 px-8">
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Team Density</p>
                                    <p className="text-xl font-black text-gray-950 tracking-tighter">{volunteers.length} Active</p>
                                </div>
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                    <Users className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Assigned Tasks Grid */}
                    <section>
                        <h3 className="text-base font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                            <ListTodo className="w-4 h-4 mr-3 text-blue-600" /> Assigned Sector Tasks
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { task: "Rural Health Scan", location: "Sector 4-B", urgent: true },
                                { task: "Education Kit Distro", location: "Sector 1-A", urgent: false },
                                { task: "Env. Impact Audit", location: "Sector 9-G", urgent: false }
                            ].map((task, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-gray-100 hover:-translate-y-1 transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${task.urgent ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                            {task.urgent ? 'Urgent' : 'Routine'}
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-gray-100 group-hover:text-green-500 transition-colors" />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-950 mb-1 tracking-tighter uppercase">{task.task}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                        <MapPin className="w-2 h-2 mr-1 text-blue-500" /> {task.location}
                                    </p>
                                    <button className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors">Start Mission →</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Volunteer List Read-Only */}
                    <section>
                         <h3 className="text-base font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                            <Users className="w-4 h-4 mr-3 text-green-600" /> Field Personnel (Read-Only)
                        </h3>
                        <div className="bg-white rounded-[3rem] border border-white shadow-2xl shadow-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center space-x-4 bg-gray-50 px-5 py-3 rounded-2xl">
                                    <Search className="w-4 h-4 text-gray-300" />
                                    <input type="text" placeholder="Scan identities..." className="bg-transparent outline-none text-[10px] font-bold italic w-48" />
                                </div>
                                <button onClick={fetchVolunteers} className="p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                                            <th className="px-8 py-5">Personnel</th>
                                            <th className="px-8 py-5">Domain</th>
                                            <th className="px-8 py-5">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {volunteers.map(v => (
                                            <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="text-gray-950 font-black text-[10px] uppercase tracking-tighter">{v.name}</p>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{v.email}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[8px] px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-black uppercase tracking-widest">{v.interest}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-green-600">
                                                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                                        <span>Verified</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OfficerDashboard;
