import React from 'react';
import { Target, Heart, Eye, Users, ChevronRight, Globe, BarChart3, TrendingUp } from 'lucide-react';
import foodImg from '../assets/food.png';
import medImg from '../assets/medical.png';
import eduImg from '../assets/education.png';
import envImg from '../assets/environment.png';

const Works = () => {
    const projects = [
        { 
            title: "Feeding Hands", 
            category: "Hunger Relief", 
            desc: "Dedicated to providing nutritious meals to underprivileged children and families. No child should go to bed hungry.", 
            img: foodImg, 
            impact: "10,000+ Meals" 
        },
        { 
            title: "Life Saviours", 
            category: "Healthcare", 
            desc: "Providing healthcare services and medical assistance to rural communities. Making healthcare accessible to all.", 
            img: medImg, 
            impact: "Medical Aid" 
        },
        { 
            title: "Tech Saala", 
            category: "Education", 
            desc: "Empowering youth with digital literacy and technology skills. Bridging the digital divide in rural areas.", 
            img: eduImg, 
            impact: "300+ Youth Skilled" 
        },
        { 
            title: "Elite Queens", 
            category: "Empowerment", 
            desc: "Empowering women through skill development and entrepreneurship. Creating leaders of tomorrow.", 
            img: envImg, 
            impact: "Women Leaders" 
        },
        { 
            title: "Guiding Lights", 
            category: "Mentorship", 
            desc: "Providing educational support and mentorship to students. Lighting the path to a brighter future.", 
            img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop", 
            impact: "500+ Students" 
        },
        { 
            title: "Visual Vibes", 
            category: "Media", 
            desc: "Creating compelling visual content and digital media to amplify our mission globally.", 
            img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", 
            impact: "Storytelling" 
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">Our <span className="text-blue-600">Impact</span></h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
                        Discover our dedicated teams and upcoming events. Through community-driven initiatives and sustainable partnerships, we are transforming lives across India.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden group hover:shadow-2xl transition duration-500 flex flex-col border border-gray-100">
                            <div className="relative h-56 md:h-64 overflow-hidden">
                                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg bg-blue-600/90 text-white">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex-grow">
                                <h3 className="text-xl font-black text-gray-900 mb-2 truncate">{project.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                    {project.desc}
                                </p>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-xl">
                                            <TrendingUp className="w-4 h-4 text-blue-700" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest leading-none mb-1">Impact</h4>
                                            <p className="text-gray-800 text-xs font-black">{project.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Impact Metrics */}
                <div className="mt-24 bg-gray-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
                        {[
                            { icon: Globe, val: "25+", label: "Cities Covered", color: "text-green-500" },
                            { icon: Users, val: "12,500", label: "Lives Impacted", color: "text-blue-400" },
                            { icon: BarChart3, val: "94%", label: "Funds Efficiently Used", color: "text-orange-400" },
                            { icon: Target, val: "200K", label: "Trees Planted", color: "text-purple-400" }
                        ].map((metric, idx) => (
                            <div key={idx}>
                                <metric.icon className={`w-10 h-10 ${metric.color} mx-auto mb-4`} />
                                <h4 className="text-4xl font-black mb-2">{metric.val}</h4>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Works;
