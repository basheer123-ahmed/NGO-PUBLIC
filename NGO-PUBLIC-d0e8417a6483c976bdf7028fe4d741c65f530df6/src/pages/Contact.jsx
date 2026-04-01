import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Linkedin, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import { supabase } from '../supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'

    const handleShootMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'General Enquiry',
                    message: formData.message,
                    created_at: new Date()
                }]);

            if (error) throw error;

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Contact Hero */}
            <div className="pt-24 pb-16 px-4 bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">Have <span className="text-blue-600">Questions?</span></h1>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
                        Whether it's a suggestion, a query, or a desire to partner with us, we are just a message away.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Contact Info Card */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight leading-tight">Our Global <br /> <span className="text-green-600 text-2xl uppercase tracking-widest">Headquarters</span></h2>
                        
                        <div className="space-y-6 mb-12">
                            <div className="flex items-start space-x-4 border-b border-gray-50 pb-6 hover:border-blue-100 transition-colors group">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-sm">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 leading-none">Registered Address</h4>
                                    <p className="text-lg text-gray-800 font-bold leading-tight max-w-xs">Door No. 12-3, NGO Colony, Anantapur, Andhra Pradesh - 515001, India</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 border-b border-gray-50 pb-6 hover:border-green-100 transition-colors group">
                                <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition duration-300 shadow-sm">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 leading-none">Helpline</h4>
                                    <p className="text-lg text-gray-800 font-bold leading-none">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 border-b border-gray-50 pb-6 hover:border-orange-100 transition-colors group">
                                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition duration-300 shadow-sm">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 leading-none">Email Support</h4>
                                    <p className="text-lg text-gray-800 font-bold leading-none underline underline-offset-4 decoration-orange-300">support@studentunion.org</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 group">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition duration-300 shadow-sm">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1 leading-none">Office Timing</h4>
                                    <p className="text-lg text-gray-800 font-bold leading-none">Mon - Sat: 10:00 AM to 5:00 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-950 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full"></div>
                            <h4 className="text-base font-black uppercase tracking-widest text-gray-400 mb-6">Stay Connected</h4>
                            <div className="flex space-x-3">
                                <a 
                                    href="https://www.facebook.com/100067494638158/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group border border-white/5"
                                >
                                    <Facebook className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" />
                                </a>
                                <a 
                                    href="https://www.instagram.com/student_union_for_nation?igsh=c2tuajNwb2h4MW15" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group border border-white/5"
                                >
                                    <Instagram className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" />
                                </a>
                                <div className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group border border-white/5">
                                    <Twitter className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" />
                                </div>
                                <div className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group border border-white/5">
                                    <Linkedin className="w-5 h-5 text-white group-hover:text-green-400 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="lg:w-1/2">
                        <div className="bg-white border border-gray-100 shadow-2xl shadow-gray-100 rounded-[2.5rem] p-8 lg:p-12">
                            <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tighter uppercase underline decoration-blue-500 decoration-8 underline-offset-4 decoration-current/30">Drop us a line</h3>
                            <form className="space-y-4" onSubmit={handleShootMessage}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm" 
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm" 
                                    />
                                </div>
                                <select 
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-xl outline-none transition-all cursor-pointer font-bold text-sm appearance-none"
                                >
                                    <option value="">Subject of Enquiry</option>
                                    <option value="General Query">General Query</option>
                                    <option value="Donation Related">Donation Related</option>
                                    <option value="Partner with us">Partner with us</option>
                                    <option value="Grievance">Grievance</option>
                                </select>
                                <textarea 
                                    rows="4" 
                                    placeholder="Your Message" 
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-600 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm resize-none"
                                ></textarea>
                                
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                                    {status === 'success' ? (
                                        <div className="flex items-center space-x-2 text-green-600 text-[10px] font-black uppercase tracking-[0.2em] animate-in slide-in-from-left-4 duration-500">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span>Message Transmitted Successfully</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>Verified Entry</span>
                                        </div>
                                    )}
                                    <button 
                                        disabled={loading}
                                        className="w-full sm:w-auto bg-gray-950 text-white font-black px-10 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center hover:bg-black active:scale-95 group text-sm uppercase tracking-widest disabled:bg-gray-400"
                                    >
                                        {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : 'Shoot Message'}
                                        {!loading && <Send className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 text-[10px] font-black uppercase mt-2">Transmission Matrix Error. Please retrying.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Locate Us</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Find us on your map</p>
                    </div>
                    <div className="w-full h-[500px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-100">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15468.618684711835!2d77.5947!3d14.6819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14a72d73f1d27%3A0x7d0b38c35d96e5d!2sAnantapur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1711950000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
