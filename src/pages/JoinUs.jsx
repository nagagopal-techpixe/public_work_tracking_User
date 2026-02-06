import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import { PARTY_NAME } from "../App.jsx"; // Importing party name for use in the form
import {
  CheckCircle,
  FileText,
} from "lucide-react";

import { Button } from "../App"; // or correct path
export const JoinUs = () => {
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