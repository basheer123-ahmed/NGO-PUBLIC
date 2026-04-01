import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockAuth } from '../mockApi';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  User,
  Shield,
  Briefcase
} from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Mission Protocol: Auto-Redirection for Active Sessions
    useEffect(() => {
        const session = mockAuth.getSession();
        if (session) {
            if (session.role === 'admin' && session.email === 'basha@gmail.com') navigate('/admin-dashboard');
            else if (session.role === 'officer') navigate('/officer-dashboard');
            else navigate('/user-dashboard'); // Redirect users to dashboard after login as requested
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate with High-Speed Mock Matrix
            const { data, error: authError } = await mockAuth.signIn(email, password);

            if (authError) throw authError;

            // 2. Role-Based Verification
            const user = data.user;
            
            if (role === 'admin') {
                if (email === 'basha@gmail.com') {
                    navigate('/admin-dashboard');
                } else {
                    throw new Error("Access Denied: Admin privileges restricted.");
                }
            } 
            else if (role === 'officer') {
                navigate('/officer-dashboard');
            } 
            else {
                navigate('/user-dashboard'); // Return to sending Users to their dashboard first
            }

        } catch (err) {
            setError(err.message);
            mockAuth.signOut();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
            {/* Safe Abort Node */}
            <Link to="/" className="absolute top-8 left-8 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-600 transition-colors group">
                <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Mission Home</span>
            </Link>

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-green-600 rounded-[2rem] shadow-2xl shadow-green-900/20 mb-4 scale-110">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic">Secure Login <span className="text-green-600">Portal</span></h1>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-2">Sun NGO Mission Control</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-white p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[50px] rounded-full -mr-16 -mt-16"></div>
                    
                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 animate-shake">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-xs font-black uppercase tracking-tight leading-tight">{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Email Field */}
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none">
                                    {role === 'admin' ? <Shield className="w-5 h-5" /> : role === 'officer' ? <Briefcase className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                </div>
                                <select 
                                    className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">Public User</option>
                                    <option value="officer">Field Officer</option>
                                    <option value="admin">System Admin</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 rotate-90 pointer-events-none" />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full bg-gray-950 text-white p-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center hover:bg-green-600 transition-all shadow-2xl shadow-gray-400 group active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Verify & Access <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="text-center pt-2">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                New to the mission? <Link to="/register" className="text-green-600 hover:underline mx-1 italic">Register Here</Link>
                            </p>
                        </div>
                    </form>

                    {/* Guidelines Section */}
                    <div className="mt-10 pt-8 border-t border-gray-50">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-2" /> Login Guidelines
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {[
                                "Use registered email",
                                "Select correct role",
                                "Admin access restricted",
                                "Zero-trust protocol"
                            ].map((rule, i) => (
                                <li key={i} className="flex items-center text-[9px] font-bold text-gray-500">
                                    <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-gray-400 font-bold text-[10px] uppercase tracking-widest leading-loose">
                    Security Breach? <Link to="/contact" className="text-gray-600 hover:underline">Contact System Admin</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
