import React from "react";
import { useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { submitNewsletter } from "../api/eventsApi";
const Footer = ({ THEME, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitNewsletter({ email });
      alert("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      alert("Failed to subscribe to newsletter.");
    }
  };
  return (
    <footer className={`${THEME.primary} text-white pt-16 pb-8`}>
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">CIVIC PROGRESS</h3>
          <p className="text-orange-100 mb-6">
            Dedicated to the service of the nation. Join us in our journey towards a brighter, self-reliant future.
          </p>
          <div className="flex gap-4 text-orange-200">
            <Facebook className="hover:text-white cursor-pointer" />
            <Twitter className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-3 text-orange-100">
            <li
              onClick={() => setCurrentPage("about")}
              className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform"
            >
              About Leadership
            </li>
            <li
              onClick={() => setCurrentPage("achievements")}
              className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform"
            >
              Our Achievements
            </li>
            <li
              onClick={() => setCurrentPage("news")}
              className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform"
            >
              Press Releases
            </li>
            <li
              onClick={() => setCurrentPage("join")}
              className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform"
            >
              Become a Member
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Resources</h4>
          <ul className="space-y-3 text-orange-100">
            <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">
              Download Manifesto
            </li>
            <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">
              Party Constitution
            </li>
            <li className="cursor-pointer hover:text-white hover:translate-x-1 transition-transform">
              Volunteer Guide
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-orange-100 mb-4 text-sm">
            Stay updated with our latest initiatives.
          </p>
          <div className="flex">
          <input
  type="email"
  placeholder="Your Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="bg-orange-800 text-white placeholder-orange-300 px-4 py-2 rounded-l-md outline-none w-full focus:ring-1 focus:ring-white"
/>

            <button className="bg-slate-900 px-4 py-2 rounded-r-md hover:bg-slate-800 font-bold" onClick={handleNewsletterSubmit}>
              GO
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-orange-500 text-center text-orange-200 text-sm">
        <p>&copy; 2024 Civic Progress Alliance. All rights reserved.</p>
        <p className="mt-2">Privacy Policy | Terms of Use | Accessibility</p>
      </div>
    </footer>
  );
};

export default Footer;
