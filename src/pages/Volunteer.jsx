import React, { useState } from 'react';
import { User, Mail, Phone, Heart, CheckCircle2, Send, Quote, Users, Award, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '../supabase';

const Volunteer = () => {
    const [totalVolunteers, setTotalVolunteers] = useState(1284);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Full name is required";
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email format is invalid";
        }
        if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
        if (!formData.interest) tempErrors.interest = "Please select an area of interest";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                // Save to Supabase 'volunteers' table
                const { error } = await supabase
                    .from('volunteers')
                    .insert([
                        { 
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            interest: formData.interest,
                            status: 'Pending'
                        }
                    ]);

                if (error) {
                    console.error("Supabase Error:", error);
                    alert(`Error: ${error.message}`);
                } else {
                    setIsSubmitted(true);
                    setTotalVolunteers(prev => prev + 1);
                }
            } catch (err) {
                console.error("Unexpected Error:", err);
                alert("An unexpected error occurred. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Split Section Layout */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Side: Info & Stats */}
                <div className="lg:w-5/12 bg-gray-950 text-white p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full"></div>
                    <div className="relative z-10">
                        <span className="text-green-500 font-black uppercase tracking-[0.2em] text-xs mb-4 inline-block">Join the Tribe</span>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">Become a <br /><span className="text-green-400">Force for Good</span></h1>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 italic opacity-80 border-l-2 border-green-500/30 pl-4">
                            "The best way to find yourself is to lose yourself in the service of others." <br /> — Mahatma Gandhi
                        </p>
                        
                        <div className="space-y-6 mb-12">
                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-green-500/10 text-green-400 rounded-xl group-hover:bg-green-500 group-hover:text-white transition duration-300 ring-1 ring-green-400/20">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black tracking-tight">{totalVolunteers}</h4>
                                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Total Volunteers</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition duration-300 ring-1 ring-blue-400/20">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black tracking-tight">15+</h4>
                                    <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">States Covered</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-800 backdrop-blur-md">
                            <div className="flex items-center space-x-3 mb-4">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span className="font-bold text-sm text-gray-300 uppercase tracking-widest">Why Volunteer?</span>
                            </div>
                            <ul className="space-y-3 text-gray-400 font-bold text-sm">
                                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span>Gain leadership skills</span></li>
                                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span>Real-world social impact</span></li>
                                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span>Network with professionals</span></li>
                                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <span>Certificate of appreciation</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-7/12 p-8 lg:p-16 flex items-center justify-center bg-gray-50">
                    <div className="w-full max-w-xl">
                        {!isSubmitted ? (
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 relative">
                                <div className="absolute top-0 right-10 -translate-y-1/2 p-4 bg-green-600 rounded-2xl shadow-xl shadow-green-200">
                                    <Heart className="w-6 h-6 text-white fill-white" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2">Volunteer Form</h2>
                                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                                    Fill in your details below and our team will get in touch with you within 48 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Full Name"
                                            className={`w-full pl-12 pr-5 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-4 focus:ring-green-100 focus:bg-white outline-none transition-all ${
                                                errors.name ? 'border-red-400' : 'border-transparent focus:border-green-600'
                                            }`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-4 tracking-wide">{errors.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address"
                                                className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-[1.5rem] focus:ring-4 focus:ring-green-100 focus:bg-white outline-none transition-all ${
                                                    errors.email ? 'border-red-400' : 'border-transparent focus:border-green-600'
                                                }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-4 tracking-wide">{errors.email}</p>}
                                        </div>

                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                className={`w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-[1.5rem] focus:ring-4 focus:ring-green-100 focus:bg-white outline-none transition-all ${
                                                    errors.phone ? 'border-red-400' : 'border-transparent focus:border-green-600'
                                                }`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs font-bold mt-2 ml-4 tracking-wide">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <select
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleChange}
                                            className={`w-full px-6 py-5 bg-gray-50 border-2 rounded-[1.5rem] focus:ring-4 focus:ring-green-100 focus:bg-white outline-none appearance-none transition-all cursor-pointer ${
                                                errors.interest ? 'border-red-400' : 'border-transparent focus:border-green-600'
                                            }`}
                                        >
                                            <option value="">Interested Area of Work</option>
                                            <option value="education">Education (Teaching)</option>
                                            <option value="food">Food Distribution</option>
                                            <option value="medical">Medical Outreach</option>
                                            <option value="environment">Environmental Projects</option>
                                            <option value="media">Social Media & PR</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <Quote className="w-5 h-5 rotate-180" />
                                        </div>
                                        {errors.interest && <p className="text-red-500 text-xs font-bold mt-2 ml-4 tracking-wide">{errors.interest}</p>}
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full bg-green-600 hover:bg-green-700 text-white font-black text-lg py-4 rounded-xl shadow-xl shadow-green-200 transition duration-300 flex items-center justify-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <>Processing <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                                            ) : (
                                                <>Send Application <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
                                            )}
                                        </button>
                                        <p className="text-center mt-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Secure & Confidential</p>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="text-center bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-green-100 animate-in zoom-in-95 duration-500">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8 ring-4 ring-green-50 shadow-lg shadow-green-100">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Success!</h3>
                                <p className="text-base text-gray-600 font-medium leading-relaxed mb-8 max-w-sm mx-auto">
                                    Hey <span className="text-green-700 font-bold underline underline-offset-4 decoration-green-300">{formData.name}</span>, your application has been successfully received. Welcome to the tribe.
                                </p>
                                <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 mb-8 flex items-center justify-center space-x-8">
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-2">Queue ID</p>
                                        <p className="text-xl font-black text-gray-900">SUN-#{Math.floor(Math.random() * 8888) + 1111}</p>
                                    </div>
                                    <div className="w-px h-10 bg-gray-200"></div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none mb-2">Status</p>
                                        <p className="text-xl font-black text-green-600 animate-pulse">Processing...</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="bg-gray-900 text-white font-black px-10 py-4 rounded-xl hover:bg-black transition-all text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Volunteer;
