import React from 'react';
import { Camera, ZoomIn, Instagram, Heart, Share2 } from 'lucide-react';
import foodImg from '../assets/food.png';
import eduImg from '../assets/education.png';
import medImg from '../assets/medical.png';
import digImg from '../assets/digital_literacy.png';
import womImg from '../assets/women.png';
import menImg from '../assets/mentorship.png';
import envImg from '../assets/environment.png';
import heroImg from '../assets/ngohero.png';

const Gallery = () => {
    const images = [
        { src: foodImg, cap: 'Feeding children in rural communities with nutrient-dense meals.', tag: 'Healthcare' },
        { src: eduImg, cap: 'Classrooms brought to life for bright young minds in remote villages.', tag: 'Education' },
        { src: medImg, cap: 'Mobile clinics delivering essential healthcare to the doorstep.', tag: 'Life Saviours' },
        { src: digImg, cap: 'Bridging the digital divide through hands-on technology workshops.', tag: 'Tech Saala' },
        { src: womImg, cap: 'Financial independence through sustainable craft and skill development.', tag: 'Elite Queens' },
        { src: menImg, cap: 'Nurturing future leaders through dedicated peer-mentorship circles.', tag: 'Guiding Lights' },
        { src: envImg, cap: 'Sustainability at the heart of rural land management and greening.', tag: 'Eco Warriors' },
        { src: heroImg, cap: 'Our community coming together to build a stronger nation.', tag: 'Impact' }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Gallery Header */}
            <div className="pt-24 pb-16 px-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-2 rounded-full mb-6">
                    <Camera className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700 uppercase tracking-widest text-xs">Visual Proof of Change</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">Our <span className="text-green-600">Moments</span></h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    A visual journey through our impact-driven initiatives across rural India. Every image tells a story of transformation and hope.
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                    {images.map((item, idx) => (
                        <div key={idx} className="relative group overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 break-inside-avoid">
                            <img 
                                src={item.src} 
                                alt={`Gallery ${idx}`} 
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <span className="text-green-400 font-black uppercase tracking-widest text-[10px] mb-2">{item.tag}</span>
                                <h4 className="text-white font-bold text-sm mb-4 leading-tight">{item.cap}</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden ring-4 ring-transparent hover:ring-white transition-all cursor-pointer">
                                                <img src={`https://i.pravatar.cc/100?u=${idx + i}`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-red-500 transition-colors text-white">
                                            <Heart className="w-4 h-4 fill-transparent hover:fill-white" />
                                        </button>
                                        <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-blue-600 transition-colors text-white">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instagram Call to Action */}
                <div className="mt-32 p-12 lg:p-24 bg-gray-950 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full"></div>
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
                    
                    <div className="relative z-10">
                        <Instagram className="w-12 h-12 text-white mx-auto mb-8 animate-pulse" />
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Want to See Live <span className="text-green-500">Updates?</span></h2>
                        <p className="text-xl text-gray-400 mb-12 font-medium max-w-xl mx-auto">
                            Follow our official social media handles for daily updates, live stories, and more behind-the-scenes action.
                        </p>
                        <a 
                            href="https://www.instagram.com/nationalngodelhi/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-gray-950 font-black px-12 py-5 rounded-[2rem] hover:scale-105 transition-transform shadow-xl shadow-white/5 active:scale-95"
                        >
                            Follow @nationalngodelhi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
