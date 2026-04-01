import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Utensils, Stethoscope, Leaf, Facebook, Twitter, Instagram, Linkedin, ArrowRight, CheckCircle2, Globe, Heart, Users, BarChart3, Target } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import heroImg from '../assets/hero_group.jpg';
import eduImg from '../assets/education.png';
import foodImg from '../assets/food.png';
import medImg from '../assets/medical.png';
import envImg from '../assets/environment.png';

const Home = ({ onDonateClick }) => {
  const navigate = useNavigate();

  const highlights = [
    { title: 'Education', icon: <BookOpen className="w-8 h-8" />, color: 'bg-blue-500', img: eduImg, desc: 'Empowering minds through quality education and skill development.' },
    { title: 'Food', icon: <Utensils className="w-8 h-8" />, color: 'bg-orange-500', img: foodImg, desc: 'Eradicating hunger by providing nutritious meals to those in need.' },
    { title: 'Medical', icon: <Stethoscope className="w-8 h-8" />, color: 'bg-red-500', img: medImg, desc: 'Delivering healthcare services to the most remote corners.' },
    { title: 'Environment', icon: <Leaf className="w-8 h-8" />, color: 'bg-green-500', img: envImg, desc: 'Protecting and restoring our natural heritage for the future.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="NGO Hero" 
            className="w-full h-full object-cover object-center scale-[1.05]"
          />
          {/* Enhanced Dark Overlay for readability of white text */}
          <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div className="max-w-3xl text-left">
            <span className="inline-block px-4 py-1.5 bg-green-600 text-white text-xs font-black uppercase rounded-full mb-6 tracking-[0.2em] animate-pulse">
              Join the Nation Building
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl italic uppercase">
              Student Union <br /> for <span className="text-green-500">Nation</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-10 max-w-2xl font-medium leading-relaxed drop-shadow-md">
              A youth-led movement transforming rural communities through healthcare, education, and environmental sustainability across India.
            </p>
            <div className="flex flex-col md:flex-row gap-5">
              <button 
                onClick={() => navigate('/volunteer')}
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-2xl shadow-green-900/30 hover:scale-105 active:scale-95 group"
              >
                Join as Volunteer <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onDonateClick}
                className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      {/* Activities Carousel Section */}
      <ImageCarousel />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Our Dedicated Teams</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">Meet our passionate teams working tirelessly to create positive change in communities across India.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Feeding Hands", desc: "Dedicated to providing nutritious meals to underprivileged children and families.", img: foodImg, tag: "Hunger Relief" },
              { title: "Life Saviours", desc: "Providing healthcare services and medical assistance to rural communities.", img: medImg, tag: "Healthcare" },
              { title: "Tech Saala", desc: "Empowering youth with digital literacy and technology skills in rural areas.", img: eduImg, tag: "Technology" },
              { title: "Elite Queens", desc: "Empowering women through skill development and entrepreneurship.", img: envImg, tag: "Empowerment" },
              { title: "Visual Vibes", desc: "Creating compelling visual content to amplify our mission globally.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", tag: "Media" },
              { title: "Guiding Lights", desc: "Providing educational support and mentorship to students.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop", tag: "Education" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 group">
                <div className="h-48 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{item.tag}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6">{item.desc}</p>
                  <button className="text-green-600 font-bold flex items-center hover:translate-x-2 transition-transform duration-300">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics Banner */}
      <section className="px-4 md:px-8 lg:px-16 mb-20">
        <div className="max-w-7xl mx-auto bg-gray-950 rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
          {/* Animated Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-green-500/20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-blue-500/20"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
            {[
              { icon: Globe, val: "25+", label: "Cities Covered", color: "text-green-500" },
              { icon: Users, val: "12,500", label: "Lives Impacted", color: "text-blue-400" },
              { icon: BarChart3, val: "94%", label: "Funds Efficiently Used", color: "text-orange-400" },
              { icon: Target, val: "200K", label: "Trees Planted", color: "text-purple-400" }
            ].map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`${metric.color} mb-4 transition-transform duration-500 group-hover:scale-110`}>
                  <metric.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h4 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter">{metric.val}</h4>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs leading-tight">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 p-4">
              <div className="relative group mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-green-500/20 rounded-[3rem] blur-2xl group-hover:bg-green-500/30 transition duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                  alt="NGO Mission" 
                  className="relative rounded-[2.5rem] shadow-2xl w-full h-[320px] lg:h-[350px] object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h4 className="text-green-600 font-black uppercase tracking-[0.2em] mb-3 text-xs">About SUN Foundation</h4>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">Empowering Communities, Transforming Lives</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
                Founded by three passionate individuals — Yashwanth, Krishnaprasad, and Pavan — SUN Foundation started as a mission to impact lives and build communities. We believe in building bridges between opportunity and need.
              </p>
              <div className="space-y-6">
                {[
                  "Fostering inclusive education for underprivileged children.",
                  "Sustainable healthcare solutions for rural communities.",
                  "Environmental advocacy and local ecological restoration.",
                  "Empowering youth to become future leaders."
                ].map((text, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 bg-green-50 p-1 rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-gray-500 mb-6 font-medium italic">Join our social community to stay updated:</p>
                <div className="flex space-x-4 text-gray-400">
                  <Facebook className="w-6 h-6 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Twitter className="w-6 h-6 hover:text-blue-400 cursor-pointer transition-colors" />
                  <Instagram className="w-6 h-6 hover:text-pink-600 cursor-pointer transition-colors" />
                  <Linkedin className="w-6 h-6 hover:text-blue-800 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
