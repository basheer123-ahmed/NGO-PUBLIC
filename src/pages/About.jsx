import React from 'react';
import { Target, Users, TrendingUp, Cpu, Heart, CheckCircle } from 'lucide-react';

const About = () => {
    const team = [
        { name: "Yashwanth", role: "Co-Founder", bio: "Visionary leader dedicated to global health and community empowerment.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" },
        { name: "Krishnaprasad", role: "Co-Founder & CEO", bio: "Drives our mission with innovative strategies and sustainable planning.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
        { name: "Pavan", role: "Co-Founder", bio: "Champions educational access and mentorship for underprivileged youth.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }
    ];

    const visionPoints = [
        "Create a world where every student is a contributor to national growth.",
        "Ensure healthcare and food security are accessible to the marginalized.",
        "Build a sustainable and green environment for the next generation.",
        "Empower rural communities through technological inclusion."
    ];

    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="relative py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">About <span className="text-green-600">SUN Foundation</span></h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        Forging a Sustainable and Equitable Future. Dedicated to creating positive change in communities across India through education, healthcare, and sustainable development initiatives.
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col justify-center transform hover:-translate-y-1 transition duration-500">
                        <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <Target className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">Our Mission</h2>
                        <p className="text-base text-gray-600 font-medium leading-relaxed">
                            To bridge the gap between education and social responsibility. We mobilize student volunteers to address critical issues in food, health, and environment.
                        </p>
                    </div>
                    <div className="bg-gray-950 p-8 md:p-10 rounded-[2rem] shadow-2xl text-white flex flex-col justify-center transform hover:-translate-y-1 transition duration-500">
                        <div className="bg-blue-600/30 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Our Vision</h2>
                        <div className="space-y-3">
                            {visionPoints.map((point, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <div className="mt-1 bg-green-500/20 p-0.5 rounded-full">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium leading-snug">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <span className="text-green-600 font-black uppercase tracking-[0.2em] text-xs mb-3 block">Our Origin Story</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">How Did It Start?</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
                            Founded by three passionate individuals — Yashwanth, Krishnaprasad, and Pavan — SUN Foundation started as a mission to impact lives and build communities.
                        </p>
                        <p className="text-base text-gray-500 mb-8 leading-relaxed italic border-l-4 border-green-600 pl-6 border-opacity-50">
                            "It all started when we went to a school for guidance. The principal asked: 'Who are you?'. That single question sparked our identity and mission to build a brighter future for the nation."
                        </p>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative group max-w-md mx-auto">
                            <div className="absolute -inset-4 bg-green-500/10 rounded-[3rem] blur-2xl group-hover:bg-green-500/20 transition duration-500"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" 
                                alt="Our Origin" 
                                className="relative rounded-[2.5rem] shadow-2xl w-full h-[400px] object-cover grayscale-[10%] group-hover:grayscale-0 transition duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">The Hearts Behind SUN</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-base font-medium leading-relaxed">
                            Meet the visionary team leading our operations and driving change on the ground.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Yashwanth", role: "Co-Founder", bio: "Visionary leader dedicated to global health equity.", tags: ["Health", "Education"], img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" },
                            { name: "Krishnaprasad", role: "Co-Founder & CEO", bio: "Drives our mission with innovative strategies.", tags: ["Innovation", "Leadership"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop", active: true },
                            { name: "Pavan", role: "Co-Founder", bio: "Champions educational access for all.", tags: ["Education", "Equity"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }
                        ].map((member, i) => (
                            <div key={i} className={`bg-white p-8 rounded-[2rem] shadow-xl border-2 transition-all duration-300 hover:-translate-y-2 ${member.active ? 'border-orange-400' : 'border-transparent'}`}>
                                <div className="flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-full overflow-hidden mb-6 border-4 ${member.active ? 'border-orange-400' : 'border-gray-200'}`}>
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-tighter">{member.role}</p>
                                    <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                                        {member.bio}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {member.tags.map((tag, j) => (
                                            <span key={j} className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                tag === 'Health' ? 'bg-blue-100 text-blue-600' : 
                                                tag === 'Education' ? 'bg-green-100 text-green-600' :
                                                tag === 'Innovation' ? 'bg-purple-100 text-purple-600' :
                                                tag === 'Leadership' ? 'bg-red-100 text-red-600' :
                                                'bg-indigo-100 text-indigo-600'
                                            }`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
