import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="p-1 bg-green-600 rounded-md">
                                <Heart className="h-6 w-6 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold text-white uppercase tracking-wider">
                                SUN NGO
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                            Student Union for Nation is dedicated to empowering lives, protecting the environment, and building a stronger nation through education, health, and social welfare programs.
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://www.facebook.com/100067494638158/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition duration-300">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a 
                                href="https://www.instagram.com/student_union_for_nation?igsh=c2tuajNwb2h4MW15" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-green-600 transition duration-300">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
                        <div className="flex flex-col space-y-3">
                            <Link to="/about" className="text-gray-400 hover:text-green-500 transition-colors">Vision & Mission</Link>
                            <Link to="/works" className="text-gray-400 hover:text-green-500 transition-colors">Our Work</Link>
                            <Link to="/volunteer" className="text-gray-400 hover:text-green-500 transition-colors">Become Volunteer</Link>
                            <Link to="/gallery" className="text-gray-400 hover:text-green-500 transition-colors">Explore Gallery</Link>
                            <Link to="/contact" className="text-gray-400 hover:text-green-500 transition-colors">Reach Us</Link>
                            <Link to="/admin" className="text-gray-900/0 hover:text-green-500 transition-colors text-[8px] uppercase tracking-[0.3em] mt-4 block">Admin Portal</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400 font-medium text-sm">
                            <li className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>NGO Colony, Anantapur, AP, India</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>support@studentunion.org</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Student Union for Nation (SUN NGO). All Rights Reserved.</p>
                    <p className="mt-4 md:mt-0 flex items-center space-x-1">
                        Developed for <span className="text-green-600 font-bold ml-1">NGO Website</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
