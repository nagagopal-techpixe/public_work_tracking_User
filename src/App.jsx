import React, { useState, useEffect } from 'react';
import Events from "../src/pages/Events.jsx";
import ViewDetail from "./pages/UserWorkDetails.jsx";
import News from "./pages/News.jsx";
import NewsDetails from "./pages/NewsDetails.jsx";
import {Contact} from "./pages/contact.jsx";
import axios from 'axios';
import { 
  Menu, X, ChevronRight, Calendar, Users, FileText, 
  Award, Phone, MapPin, Mail, PlayCircle, Heart, 
  CheckCircle, ArrowRight, Download, Facebook, Twitter, Instagram, Youtube
} from 'lucide-react';

/**
 * MOCK DATA & CONFIGURATION
 * In a real app, these would come from the provided Backend APIs.
 */

const PARTY_NAME = "Civic Progress Alliance";
const SLOGAN = "Building a Better Tomorrow, Together.";
const THEME = {
  // Switched to Orange as primary
  primary: "bg-orange-600",
  primaryText: "text-slate-900", // Keep main text dark for readability
  // Used darker orange or slate for accents
  accent: "bg-slate-900",
  accentText: "text-orange-700",
  light: "bg-orange-50",
};

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'events', label: 'Works' },
  // { id: 'viewdetail', label: 'View Detail' },  
  { id: 'news', label: 'News' },
  { id: 'organization', label: 'Organization' },
  { id: 'media', label: 'Media' },
  { id: 'join', label: 'Join Us', isCta: true },
  { id: 'contact', label: 'Contact' },

];



const LEADERSHIP = [
  { id: 1, name: "Dr. Aravind Sharma", role: "Founder & President", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Sarah Jenkins", role: "General Secretary", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Michael Chen", role: "Youth Wing Head", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-12 ${align === "left" ? "text-left" : "text-center"}`}>
    <h2 className={`text-3xl md:text-4xl font-bold ${THEME.primaryText} mb-3`}>{title}</h2>
    {subtitle && <div className="h-1 w-20 bg-orange-600 mx-auto rounded-full"></div>}
  </div>
);

export const Button = ({ children, variant = "primary", onClick, type = "button", disabled = false, className = "" }) => {
  const baseStyle = "px-6 py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    // Primary button is now Orange (via THEME.primary)
    primary: `${THEME.primary} text-white hover:bg-orange-700 shadow-lg hover:shadow-xl disabled:opacity-50`,
    secondary: "bg-white text-orange-700 border-2 border-orange-600 hover:bg-orange-50 disabled:opacity-50",
    // Accent button is now Slate for contrast
    accent: `${THEME.accent} text-white hover:bg-slate-700 shadow-lg disabled:opacity-50`,
    outline: "border border-slate-300 text-slate-600 hover:bg-slate-50"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- PAGES ---

const Home = ({ navigate, latestWorks = [], loadingWorks = false }) => (

  <div className="animate-in fade-in duration-500">
    {/* Hero Section */}
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Changed overlay to a warm orange/brown tint */}
      <div className="absolute inset-0 bg-orange-900/70 z-10" />
      <img 
        src="https://images.unsplash.com/photo-1447933601400-b88538e6e71c?auto=format&fit=crop&q=80&w=1920" 
        alt="Rally" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">{PARTY_NAME}</h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">{SLOGAN}</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate('join')}>Join The Movement</Button>
          <Button variant="secondary" className="bg-transparent text-white border-white hover:bg-white/10" onClick={() => navigate('achievements')}>Our Achievements</Button>
        </div>
      </div>
    </section>

    {/* Highlights / Daily Work */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Latest Highlights</h2>
          <button onClick={() => navigate('events')} className="text-orange-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>
        {/* Horizontal Scroll Snap for Mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide">
         <div className="flex overflow-x-auto snap-x snap-mandatory gap-10 pb-6 scrollbar-hide">
  {loadingWorks ? (
    <p className="text-center text-slate-500 py-10">Loading latest works...</p>
  ) : (
    latestWorks.map((item) => (
      <div key={item._id} className="snap-center shrink-0 w-80 md:w-96 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="h-64 overflow-hidden">
          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{new Date(item.createdAt).toLocaleDateString()}</span>
          <h3 className="text-xl font-bold mt-2 mb-2 text-slate-800">{item.title}</h3>
          <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
        </div>
      </div>
    ))
  )}
</div>



        </div>
      </div>
    </section>

    {/* Founder Section */}
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-200 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
                alt="Founder" 
                className="relative rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h4 className="text-orange-600 font-bold uppercase tracking-wide mb-2">From the President's Desk</h4>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Serving the Nation with Integrity</h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              "Our mission is not just to govern, but to serve. Every policy we craft and every initiative we launch is centered around the common man. Join us in this journey of transformation."
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-bold text-slate-900 text-xl">Dr. Aravind Sharma</p>
                <p className="text-slate-500">Founder & President</p>
              </div>
              <Button variant="outline" onClick={() => navigate('about')}>Read Full Bio</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quick Links - Changed to Orange Background */}
    <section className="py-16 bg-orange-700 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Initiatives" subtitle align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Past Campaigns", icon: Users },
            { title: "Completed Works", icon: CheckCircle },
            { title: "Schemes", icon: FileText },
            { title: "Join Movement", icon: Heart }
          ].map((link, idx) => (
            // Cards are now slightly darker orange/red or white/10 for contrast
            <div key={idx} className="bg-orange-800/50 border border-orange-500/30 p-8 rounded-xl text-center hover:bg-white hover:text-orange-700 transition-colors cursor-pointer group">
              <link.icon className="mx-auto mb-4 w-10 h-10 text-white group-hover:text-orange-600 transition-colors" />
              <h3 className="font-bold text-lg">{link.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const About = () => (
  <div className="py-12 bg-white animate-in slide-in-from-bottom-4 duration-500">
    <div className="container mx-auto px-4">
      <SectionTitle title="About The Organization" subtitle />
      
      {/* Vision & Mission */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 bg-blue-50 rounded-2xl border-l-4 border-blue-600">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
            <MapPin size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-slate-700 leading-relaxed">
            To create a self-reliant, prosperous, and inclusive society where every citizen has access to equal opportunities, justice, and growth.
          </p>
        </div>
        <div className="p-8 bg-orange-50 rounded-2xl border-l-4 border-orange-600">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
            <Award size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-slate-700 leading-relaxed">
            Grassroots empowerment through sustainable development policies, transparent governance, and active youth participation in nation-building.
          </p>
        </div>
      </div>

      {/* Leadership Grid */}
      <h3 className="text-2xl font-bold mb-8 text-center text-slate-800">Our Leadership</h3>
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {LEADERSHIP.map((leader) => (
          <div key={leader.id} className="group relative overflow-hidden rounded-xl">
            <img src={leader.img} alt={leader.name} className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/90 to-transparent p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
              <h4 className="text-xl font-bold">{leader.name}</h4>
              <p className="text-orange-200 font-medium">{leader.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* History Timeline */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-8 text-center text-slate-800">Our Journey</h3>
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 space-y-12 pl-8 md:pl-0">
          {[
            { year: "2015", title: "Foundation", desc: "Established with a core team of 50 volunteers focused on rural education." },
            { year: "2018", title: "State Recognition", desc: "Recognized as a registered political entity after successful local elections." },
            { year: "2023", title: "National Expansion", desc: "Launched wings in 12 states with over 1 million active members." }
          ].map((item, idx) => (
            <div key={idx} className="md:flex items-center justify-between relative">
              <div className="absolute -left-[39px] md:left-1/2 md:-ml-[9px] w-5 h-5 rounded-full bg-orange-600 border-4 border-white shadow-sm z-10"></div>
              <div className={`md:w-1/2 mb-2 md:mb-0 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:hidden'}`}>
                <span className="text-3xl font-bold text-orange-200">{item.year}</span>
              </div>
              <div className={`md:w-1/2 ${idx % 2 !== 0 ? 'md:pl-12' : 'md:text-right md:pr-12'}`}>
                <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                <p className="text-slate-600 mt-2">{item.desc}</p>
              </div>
              <div className={`md:w-1/2 hidden ${idx % 2 === 0 ? 'md:block md:pl-12' : ''}`}>
                 <span className="text-3xl font-bold text-orange-200">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Achievements = () => (
  <div className="py-12 bg-orange-50">
    <div className="container mx-auto px-4">
      <SectionTitle title="Our Impact" subtitle />
      
      {/* Masonry-ish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {[
          { size: "row-span-2", img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=600", title: "Mega Rally 2023" },
          { size: "", img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600", title: "Clean Water Initiative" },
          { size: "row-span-2", img: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=600", title: "Women Empowerment" },
          { size: "row-span-2", img: "https://images.unsplash.com/photo-1541872703-74c5963631df?auto=format&fit=crop&q=80&w=600", title: "Tech Education" },
          { size: "", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600", title: "Board Meeting" },
        ].map((item, idx) => (
          <div key={idx} className={`relative group overflow-hidden rounded-xl ${item.size}`}>
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-orange-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-bold text-lg">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
          <PlayCircle className="text-orange-600" /> Video Gallery
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
             <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center relative group cursor-pointer">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <PlayCircle size={32} className="text-orange-600 ml-1" />
                </div>
                <img src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover rounded-lg -z-10 opacity-80" alt="Video thumbnail" />
             </div>
             <h4 className="font-bold mt-4 text-lg">Annual General Meeting Speech</h4>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
             <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center relative group cursor-pointer">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <PlayCircle size={32} className="text-orange-600 ml-1" />
                </div>
                <img src="https://images.unsplash.com/photo-1496307667243-6b5d74479913?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover rounded-lg -z-10 opacity-80" alt="Video thumbnail" />
             </div>
             <h4 className="font-bold mt-4 text-lg">Press Conference: Education Policy</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JoinUs = () => {
  // FORM STATE LOGIC
  const [joinAs, setJoinAs] = useState('member'); // member, volunteer, donor
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mock Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0,0);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-green-50">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-2">Registration Successful!</h2>
        <p className="text-green-700 text-center max-w-md mb-8">
          Thank you for joining {PARTY_NAME}. Your application ID is <span className="font-mono font-bold">#CPA-{Math.floor(Math.random() * 10000)}</span>. 
          We will contact you shortly.
        </p>
        <Button onClick={() => setSubmitted(false)}>Submit Another Application</Button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-orange-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle title="Join The Movement" subtitle />

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header of Form - now Orange */}
          <div className="bg-orange-700 p-6 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileText size={20} /> Membership Registration
            </h3>
            <p className="text-orange-100 text-sm mt-1">Please fill out all details accurately.</p>
          </div>

          <div className="p-8 space-y-8">
            {/* 1. Applicant Type */}
            <section>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">I want to join as a:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[ 'volunteer', 'donor'].map((type) => (
                  <label key={type} className={`
                    border-2 rounded-lg p-4 cursor-pointer flex items-center justify-center gap-2 capitalize font-bold transition-all
                    ${joinAs === type ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 hover:border-slate-300'}
                  `}>
                    <input 
                      type="radio" 
                      name="joinType" 
                      value={type} 
                      checked={joinAs === type}
                      onChange={(e) => setJoinAs(e.target.value)}
                      className="accent-orange-600" 
                    />
                    {type}
                  </label>
                ))}
              </div>
            </section>

            {/* CONDITIONAL RENDER: Branch & Position (Only for Member/Volunteer) */}
            {joinAs !== 'donor' && (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
                <section>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Select Wing / Branch</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3 custom-scrollbar">
                    {['Youth Wing', 'Women Wing', 'Student Wing', 'IT & Digital', 'Social Service', 'Legal Cell', 'Media Wing', 'Rural Dev'].map(wing => (
                      <label key={wing} className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded">
                        <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-slate-700">{wing}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <section>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Interested Position</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3 custom-scrollbar">
                    {['District Coordinator', 'Block Coordinator', 'City Coordinator', 'Field Volunteer', 'Social Media Volunteer', 'Office Exec'].map(role => (
                      <label key={role} className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded">
                        <input type="checkbox" className="rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-slate-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Personal Details (Always Visible) */}
            <section className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                <input required type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input required type="tel" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="+91 98765 43210" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="john@example.com" />
              </div>
            </section>

            {/* Location (Only Member/Volunteer) */}
            {joinAs !== 'donor' && (
               <section className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">State *</label>
                  <select required className="w-full border border-slate-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="">Select State</option>
                    <option>New York</option>
                    <option>California</option>
                    <option>Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">District *</label>
                  <select required className="w-full border border-slate-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="">Select District</option>
                    <option>North District</option>
                    <option>South District</option>
                  </select>
                </div>
              </section>
            )}

            {/* Payment Section (Conditional) */}
            <section className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                {joinAs === 'donor' ? 'Donation Details' : 'Registration Fee'}
              </h4>
              
              {joinAs === 'donor' ? (
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1">Donation Amount (₹) *</label>
                   <div className="flex gap-4 mb-3">
                     {[500, 1000, 5000].map(amt => (
                       <button key={amt} type="button" className="px-4 py-1 bg-white border border-slate-300 rounded hover:border-orange-500 text-sm font-medium">₹{amt}</button>
                     ))}
                   </div>
                   <input required type="number" min="100" className="w-full border border-slate-300 rounded-md px-4 py-2" placeholder="Enter custom amount" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Standard Membership Fee</p>
                    <p className="text-xs text-slate-400">Valid for 1 year</p>
                  </div>
                  <span className="text-xl font-bold text-slate-900">₹ 100.00</span>
                </div>
              )}
            </section>

            {/* Declaration */}
            <label className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg cursor-pointer border border-orange-100">
              <input required type="checkbox" className="mt-1 rounded text-orange-600 focus:ring-orange-500" />
              <span className="text-sm text-slate-700">
                I hereby declare that the above information is true and correct. I subscribe to the ideology of {PARTY_NAME} and agree to abide by its constitution.
              </span>
            </label>

            <Button type="submit" variant="primary" className="w-full text-lg h-12" disabled={submitting}>
              {submitting ? 'Processing...' : (joinAs === 'donor' ? 'Proceed to Pay' : 'Submit Application')}
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
};

// Simple placeholders for other pages to keep file length manageable


const Organization = () => (
  <div className="py-12 bg-white container mx-auto px-4">
    <SectionTitle title="Organizational Structure" subtitle />
    <div className="max-w-4xl mx-auto space-y-4">
      {['National Executive Committee', 'State Working Committees', 'District Units', 'Ward Committees'].map((level, idx) => (
        <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
           <div className="bg-slate-50 p-4 font-bold flex justify-between items-center cursor-pointer hover:bg-orange-50">
             <span className="flex items-center gap-3"><Users className="text-orange-500"/> {level}</span>
             <ChevronRight className="text-slate-400" />
           </div>
        </div>
      ))}
    </div>
  </div>
);





// --- MAIN APP SHELL ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [latestWorks, setLatestWorks] = useState([]);
const [loadingWorks, setLoadingWorks] = useState(true);
useEffect(() => {
  const fetchWorks = async () => {
    try {
      setLoadingWorks(true);
      const res = await axios.get('http://localhost:3007/work_tracking/auth/user/GetAllWorks?page=1&limit=3');
      setLatestWorks(res.data.data || []); 
    } catch (err) {
      console.error(err);
      setLatestWorks([]);
    } finally {
      setLoadingWorks(false);
    }
  };
  fetchWorks();
}, []);




  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': 
  return <Home 
           navigate={setCurrentPage} 
           latestWorks={latestWorks} 
           loadingWorks={loadingWorks} 
         />;

      case 'about': return <About />;
      case 'achievements': return <Achievements />;
      case 'join': return <JoinUs />;
      case 'news':
  return (
    <News
      navigate={setCurrentPage}
      setSelectedNewsId={setSelectedNewsId}
    />
  );

      case 'organization': return <Organization />;
      case 'contact': return <Contact />;
     case 'events':
  return (
    <Events
      navigate={setCurrentPage}
      setSelectedEventId={setSelectedEventId}
    />
  );

case 'viewdetail':
  return (
    <ViewDetail
      eventId={selectedEventId}
      navigate={setCurrentPage}
    />
  );
  case 'newsdetail':
  return (
    <NewsDetails
      newsId={selectedNewsId}
      navigate={setCurrentPage}
    />
  );

      default: return <div className="p-20 text-center">Page Under Construction</div>;
    }
  };

  return (
    <div className={`min-h-screen font-sans text-slate-900 ${THEME.light}`}>
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar (Desktop only) */}
        <div className={`hidden md:block ${THEME.primary} text-white py-2 px-4 text-xs`}>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Phone size={12}/> +91 1800-123-4567</span>
              <span className="flex items-center gap-1"><Mail size={12}/> info@civicprogress.org</span>
            </div>
            <div className="flex gap-3">
               <Facebook size={14} className="cursor-pointer hover:text-slate-200"/>
               <Twitter size={14} className="cursor-pointer hover:text-slate-200"/>
               <Instagram size={14} className="cursor-pointer hover:text-slate-200"/>
               <Youtube size={14} className="cursor-pointer hover:text-slate-200"/>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-lg">
              CP
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight uppercase text-orange-700 tracking-tight">Civic Progress</h1>
              <span className="text-xs text-slate-500 font-medium tracking-widest">ALLIANCE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`
                  px-3 py-2 text-sm font-semibold rounded-md transition-colors
                  ${link.isCta 
                    ? 'bg-slate-900 text-white hover:bg-slate-800 ml-4 shadow-md px-5' 
                    : currentPage === link.id 
                      ? 'text-orange-700 bg-orange-50' 
                      : 'text-slate-600 hover:text-orange-700 hover:bg-orange-50'
                  }
                `}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-orange-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col px-4 space-y-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg font-semibold
                    ${link.isCta 
                      ? 'bg-orange-600 text-white text-center mt-2' 
                      : currentPage === link.id ? 'bg-orange-50 text-orange-600' : 'text-slate-700'
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
      

      {/* MAIN CONTENT AREA */}
      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <footer className={`${THEME.primary} text-white pt-16 pb-8`}>
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">CIVIC PROGRESS</h3>
            <p className="text-orange-100 mb-6">
              Dedicated to the service of the nation. Join us in our journey towards a brighter, self-reliant future.
            </p>
            <div className="flex gap-4 text-orange-200">
               <Facebook className="hover:text-white cursor-pointer"/>
               <Twitter className="hover:text-white cursor-pointer"/>
               <Instagram className="hover:text-white cursor-pointer"/>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-orange-100">
              <li onClick={() => setCurrentPage('about')} className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">About Leadership</li>
              <li onClick={() => setCurrentPage('achievements')} className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Our Achievements</li>
              <li onClick={() => setCurrentPage('news')} className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Press Releases</li>
              <li onClick={() => setCurrentPage('join')} className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Become a Member</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 text-orange-100">
              <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Download Manifesto</li>
              <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Party Constitution</li>
              <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">Volunteer Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-orange-100 mb-4 text-sm">Stay updated with our latest initiatives.</p>
            <div className="flex">
              <input type="email" placeholder="Your Email" className="bg-orange-800 text-white placeholder-orange-300 px-4 py-2 rounded-l-md outline-none w-full focus:ring-1 focus:ring-white" />
              <button className="bg-slate-900 px-4 py-2 rounded-r-md hover:bg-slate-800 font-bold">GO</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-orange-500 text-center text-orange-200 text-sm">
          <p>&copy; 2024 Civic Progress Alliance. All rights reserved.</p>
          <p className="mt-2">Privacy Policy | Terms of Use | Accessibility</p>
        </div>
      </footer>

    </div>
  );
};

export default App;