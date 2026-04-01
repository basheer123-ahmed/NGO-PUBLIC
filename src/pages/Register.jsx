import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockAuth } from '../mockApi';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  User,
  Shield,
  Briefcase
} from 'lucide-react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // High-Speed Identity Logging
            const { error: authError } = await mockAuth.signUp(email, password, role);

            if (authError) throw authError;

            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-900/20 mb-4 scale-110">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-950 tracking-tighter uppercase italic">Mission <span className="text-blue-600">Onboarding</span></h1>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-2">Join the SUN NGO Force</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-white p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full -mr-16 -mt-16"></div>
                    
                    {success ? (
                        <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <div className="w-10 h-10 bg-green-500 rounded-full animate-ping opacity-20 absolute"></div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                             </div>
                             <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Identity Logged</h2>
                             <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Redirecting to Secure Gateway...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleRegister} className="space-y-6 relative z-10">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 animate-shake text-xs font-black uppercase">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="email" 
                                        placeholder="Organization Email" 
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                                    <input 
                                        type="password" 
                                        placeholder="Secure Matrix Password" 
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none">
                                        {role === 'admin' ? <Shield className="w-5 h-5" /> : role === 'officer' ? <Briefcase className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                    </div>
                                    <select 
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">Public Contributor</option>
                                        <option value="officer">Field Personnel</option>
                                        <option value="admin">Executive Command</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 rotate-90 pointer-events-none" />
                                </div>
                            </div>

                            <button 
                                disabled={loading}
                                type="submit" 
                                className="w-full bg-gray-950 text-white p-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl group active:scale-95 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Register Identity <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Already part of the force? <Link to="/login" className="text-blue-600 hover:underline">Secure Gateway</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
