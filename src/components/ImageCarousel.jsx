import React from 'react';
import { motion } from 'framer-motion';

const ImageCarousel = () => {
    const activities = [
        { title: "Educational Outreach", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2072&auto=format&fit=crop" },
        { title: "Community Service", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop" },
        { title: "Distribution Drive", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" },
        { title: "Tech Workshops", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" },
        { title: "Mentorship", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-12">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our <span className="text-green-600">Activities</span></h2>
                <p className="text-gray-500 mt-4 text-xl font-medium tracking-wide max-w-2xl">A visual journey through our on-ground impact and community transformation initiatives.</p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-8 px-4 md:px-8 lg:px-16 pb-12 scrollbar-hide cursor-grab active:cursor-grabbing snap-x snap-mandatory">
                {activities.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="flex-shrink-0 w-[260px] sm:w-[320px] md:w-[350px] lg:w-[380px] snap-center"
                    >
                        <div className="relative h-60 sm:h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
                            <img 
                                src={item.img} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent flex items-end p-8">
                                <h3 className="text-white font-bold text-2xl tracking-tight leading-tight">{item.title}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Custom CSS to hide scrollbar while keeping functionality */}
            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default ImageCarousel;
