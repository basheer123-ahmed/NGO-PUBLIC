import React from 'react';
import { 
  Users, 
  Globe, 
  ShieldCheck, 
  Heart, 
  ChevronRight, 
  GraduationCap, 
  Utensils, 
  Stethoscope, 
  Leaf,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ onDonateClick }) => {
  const stats = [
    { label: 'Verified Volunteers', value: '1,000+', icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'States Covered', value: '15+', icon: <Globe className="w-5 h-5" />, color: 'bg-green-500' },
    { label: 'Operations Sync', value: '24/7', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Security Protocols', value: '100%', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-orange-500' },
  ];

  const features = [
    { 
      title: 'Digital Literacy', 
      desc: 'Empowering children with next-gen technical education and resources.', 
      icon: <GraduationCap className="w-6 h-6" />,
      gradient: 'from-blue-600 to-cyan-500'
    },
    { 
      title: 'Nutritional Support', 
      desc: 'Strategic food distribution protocols for high-priority rural sectors.', 
      icon: <Utensils className="w-6 h-6" />,
      gradient: 'from-green-600 to-emerald-500'
    },
    { 
      title: 'Medical Response', 
      desc: 'Deploying high-fidelity healthcare camps across underserved territories.', 
      icon: <Stethoscope className="w-6 h-6" />,
      gradient: 'from-rose-600 to-pink-500'
    },
    { 
      title: 'Environmental Audit', 
      desc: 'Leading sustainable initiatives to restore the local ecological balance.', 
      icon: <Leaf className="w-6 h-6" />,
      gradient: 'from-amber-600 to-orange-500'
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Sector */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-40 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-green-50/50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-400/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-10 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-black uppercase text-[9px] tracking-[0.2em] shadow-sm">
                < Award className="w-3 h-3" />
                <span>Empowering Communities with Technology</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter leading-[0.95] italic uppercase">
                Transforming Lives Through <br />
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">NGO Innovation</span>
              </h1>
              
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We build a high-fidelity platform that connects volunteers, donors, and communities to create meaningful impact across the Indian landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link to="/volunteer" className="w-full sm:w-auto px-10 py-5 bg-gray-950 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-2xl shadow-blue-900/10 group cursor-pointer">
                  Join as Volunteer <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button onClick={onDonateClick} className="w-full sm:w-auto px-10 py-5 bg-white text-gray-950 border-2 border-gray-100 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:border-green-600 hover:text-green-600 transition-all shadow-xl shadow-gray-200/50 cursor-pointer">
                  Donate Now
                </button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="flex-1 relative animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-green-500/20 blur-[80px] rounded-full scale-90"></div>
              <div className="relative bg-white/40 backdrop-blur-3xl p-4 rounded-[3.5rem] border border-white/60 shadow-2xl overflow-hidden group">
                <img 
                  src="/ngo_saas_hero_impact_1775049285353.png" 
                  alt="Mission Impact" 
                  className="w-full h-auto rounded-[3rem] object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
                />
                {/* Floating Heart Badge */}
                <div className="absolute top-10 right-10 bg-white p-5 rounded-3xl shadow-2xl flex items-center space-x-4 animate-bounce-slow border border-gray-50">
                  <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 shadow-inner">
                    <Heart className="w-6 h-6 fill-rose-600" />
                  </div>
                  <div className="pr-4">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Global Impact</p>
                    <p className="text-sm font-black text-gray-950 tracking-tighter">Verified Mission Done</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Stats Matrix */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group p-8 rounded-[3rem] hover:bg-gray-50 transition-all duration-500 border border-transparent hover:border-gray-100">
                <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white shadow-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-gray-950 tracking-tighter italic mb-2 uppercase leading-none">{stat.value}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Features Grid */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="max-w-3xl mb-24 text-center mx-auto space-y-6">
            <h2 className="text-base font-black uppercase tracking-[0.5em] text-blue-600">Our Strategic Domains</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter leading-none italic uppercase">Expanding the <br /> <span className="text-green-600 underline underline-offset-[12px] decoration-gray-950/5">Human Potential</span></h3>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-white shadow-2xl shadow-gray-200 group hover:-translate-y-3 transition-all duration-700 relative overflow-hidden h-full">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 blur-[40px] rounded-full -mr-16 -mt-16`}></div>
                
                <div className={`w-16 h-16 mb-10 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-2xl shadow-gray-200 group-hover:rotate-12 transition-transform`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-2xl font-black text-gray-950 mb-4 tracking-tighter uppercase italic">{feature.title}</h4>
                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-10">
                  {feature.desc}
                </p>
                
                <button className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-950 group-hover:text-blue-600 transition-colors">
                  Explore Mission <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-End CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gray-950 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden text-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
             <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
             </div>
             
             <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none"> Ready to Build a <br /> <span className="text-green-500">Stronger Nation?</span> </h2>
             
             <p className="text-gray-400 text-lg uppercase font-bold tracking-[0.3em]">Aggregate Your Impact with SUN NGO today.</p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link to="/volunteer" className="w-full sm:w-auto px-12 py-6 bg-white text-gray-950 rounded-[1.5rem] font-black uppercase text-[12px] tracking-widest hover:scale-105 transition-all shadow-2xl">Start Volunteering</Link>
                <button onClick={onDonateClick} className="w-full sm:w-auto px-12 py-6 bg-green-600 text-white rounded-[1.5rem] font-black uppercase text-[12px] tracking-widest hover:bg-green-700 transition-all shadow-2xl shadow-green-900/20">Donate Now</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
