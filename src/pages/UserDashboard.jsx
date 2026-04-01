import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { User, Heart, ListTodo, MapPin, CheckCircle, RefreshCw, LogOut, ChevronRight, Mail, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [userDonations, setUserDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            if (!currentSession) return navigate('/login');
            setSession(currentSession);
            
            // In a real scenario, we'd filter by user email
            const { data: volData } = await supabase.from('volunteers').select('*').eq('email', currentSession.user.email);
            const { data: donData } = await supabase.from('donations').select('*').eq('email', currentSession.user.email);
            const { data: contactData } = await supabase.from('contacts').select('*').eq('email', currentSession.user.email);
            
            setUserSubmissions([...(volData || []), ...(contactData || [])]);
            setUserDonations(donData || []);
            setLoading(false);
        };
        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-500">
                {/* Header Profile */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-green-900/20 rotate-3 transition-transform hover:rotate-0 cursor-pointer">
                            {session?.user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-2">Member <span className="text-green-600 underline underline-offset-8 decoration-gray-950/10">Dashboard</span></h1>
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-[0.4em] flex items-center">
                                <Mail className="w-3 h-3 mr-2 text-blue-500" /> {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={() => navigate('/')} className="px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-green-600 transition-all shadow-sm">Home</button>
                        <button onClick={handleLogout} className="px-8 py-4 bg-gray-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl shadow-gray-400">Sign Out</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Activity Stats */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Submissions Section */}
                        <section>
                            <h3 className="text-base font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                                <ListTodo className="w-4 h-4 mr-3 text-blue-600" /> My Mission Links
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userSubmissions.length > 0 ? userSubmissions.map((sub, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-white shadow-2xl shadow-gray-100 relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[40px] rounded-full translate-x-12 -translate-y-12"></div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-50 text-gray-400 rounded-full border border-gray-100">
                                                {sub.interest ? 'Volunteer Hub' : 'Inquiry Node'}
                                            </div>
                                            <CheckCircle className={`w-5 h-5 ${sub.status === 'Approved' ? 'text-green-500' : 'text-orange-500 animate-pulse'}`} />
                                        </div>
                                        <h4 className="text-xl font-black text-gray-950 mb-1 tracking-tighter uppercase">{sub.interest || sub.subject}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-green-600 transition-colors">
                                            Status: {sub.status || 'Received'}
                                        </p>
                                        <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600">
                                            View Details <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full py-16 bg-white border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center text-center p-8">
                                        <LayoutDashboard className="w-12 h-12 text-gray-100 mb-4" />
                                        <p className="text-gray-300 font-black uppercase tracking-widest text-[10px] italic">No mission links detected.</p>
                                        <button onClick={() => navigate('/volunteer')} className="mt-6 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:scale-105 transition-transform">Start Journey →</button>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Impact Matrix */}
                        <section>
                             <h3 className="text-base font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center">
                                <Heart className="w-4 h-4 mr-3 text-rose-600" /> Financial Impact Matrix
                            </h3>
                            <div className="bg-white rounded-[3rem] border border-white shadow-2xl shadow-gray-100 overflow-hidden">
                                <div className="p-10 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-between">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Aggregate Contribution</p>
                                        <p className="text-4xl font-black text-green-500 tracking-tighter italic">₹{userDonations.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-3xl backdrop-blur-xl border border-white/10 group animate-pulse-slow">
                                        <Heart className="w-10 h-10 text-rose-600 fill-rose-600" />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                <th className="px-10 py-6">Link ID</th>
                                                <th className="px-10 py-6 text-right">Volume</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 text-[10px]">
                                            {userDonations.length > 0 ? userDonations.map((d, i) => (
                                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-10 py-6 font-bold uppercase tracking-widest text-gray-400">TRX-{d.id.toString().slice(0, 8)}</td>
                                                    <td className="px-10 py-6 text-right font-black text-gray-950">₹{d.amount.toLocaleString()}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="2" className="py-12 text-center text-gray-300 font-bold italic uppercase tracking-widest">Awaiting initial link</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-gray-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <Heart className="w-24 h-24 text-rose-500" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Elite <br /> <span className="text-green-500">Foundation</span></h4>
                                <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest mb-10">
                                    Your verified contributions are currently driving Mission Area 4-B healthcare centers.
                                </p>
                            </div>
                            <button className="w-full py-5 bg-white text-gray-950 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-green-600 hover:text-white transition-all shadow-xl">Expand Support</button>
                        </div>

                         <div className="bg-white p-10 rounded-[3rem] border border-white shadow-2xl shadow-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                            <MapPin className="w-10 h-10 text-blue-500 animate-bounce" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-950">Local Impact</h4>
                            <p className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
                                Your submissions are being reviewed by Sector Officers in Anantapur Node.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
