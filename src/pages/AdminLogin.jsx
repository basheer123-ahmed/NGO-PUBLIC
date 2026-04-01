import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Heart, ArrowRight, Loader2, KeyRound, AlertCircle, X } from 'lucide-react';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.autoFill) {
            setFormData({ email: 'basha@gmail.com', password: '123456' });
        }
    }, [location.state]);

    useEffect(() => {
        // Removed auto-hide timer to keep toast persistent until interaction
    }, [showToast]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (loginError) throw loginError;
            
            navigate('/admin-dashboard');
        } catch (err) {
            setError(err.message);
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const useDemoLogin = () => {
        setFormData({ email: 'basha@gmail.com', password: '123456' });
        setShowToast(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-gradient-to-br from-green-50/50 to-blue-50/50 relative overflow-hidden">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="bg-white border-2 border-orange-100 rounded-[2rem] shadow-2xl p-7 max-w-sm relative group ring-1 ring-orange-50">
                        <button 
                            onClick={() => setShowToast(false)}
                            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-start space-x-6">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="flex-grow pr-4">
                                <h4 className="text-xl font-black text-gray-950 mb-2">Login Issue</h4>
                                <p className="text-sm font-bold text-gray-500 leading-relaxed mb-4">
                                    If you are facing issues, please use demo credentials:<br/>
                                    <span className="text-orange-600 text-base font-black">basha@gmail.com / 123456</span>
                                </p>
                                <button 
                                    onClick={useDemoLogin}
                                    className="w-full sm:w-auto text-xs font-black uppercase tracking-[0.2em] text-white bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl transition-all shadow-lg shadow-orange-200"
                                >
                                    Use Demo Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-sm relative z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="flex flex-col items-center group">
                        <div className="p-3 bg-green-600 rounded-2xl shadow-xl shadow-green-200 group-hover:scale-110 transition duration-500 mb-6 font-bold">
                            <Heart className="h-8 w-8 text-white fill-white" />
                        </div>
                        <span className="text-2xl font-black text-gray-950 uppercase tracking-tighter">SUN <span className="text-green-600">NGO</span> ADMIN</span>
                    </Link>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition duration-700">
                        <KeyRound className="w-32 h-32 text-green-700" />
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Admin Login</h2>
                    <p className="text-gray-500 font-medium mb-8 text-sm leading-relaxed">Enter your master credentials to access the secure portal.</p>

                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-red-50">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group/field">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 text-gray-400 group-focus-within/field:text-green-600 transition-colors rounded-xl font-bold">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="System Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold shadow-sm"
                                    required
                                />
                            </div>

                            <div className="relative group/field">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 text-gray-400 group-focus-within/field:text-green-600 transition-colors rounded-xl font-bold">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Master Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-950 hover:bg-black text-white font-black text-base py-4 rounded-2xl shadow-xl transition duration-300 flex items-center justify-center group/btn disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <div className="flex items-center">
                                    Authenticate <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-10">
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest leading-loose">
                        Need a sub-admin account? <Link to="/admin-register" className="text-green-600 hover:text-green-700 underline decoration-green-300 underline-offset-8 decoration-4 ml-1">Begin Registration</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
