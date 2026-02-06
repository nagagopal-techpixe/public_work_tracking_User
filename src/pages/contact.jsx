import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { Button } from "../App.jsx";
import { submitContactForm } from "../api/eventsApi.js"; // adjust path to your api file

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        phone: Number(form.phone) || 0, // convert to number
      };
      const response = await submitContactForm(payload);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "", phone: "" }); // reset form
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-white container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Get in Touch</h2>
          <p className="text-slate-600 mb-8">
            Have questions or want to volunteer? Reach out to our central office.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold">Central Office</h4>
                <p className="text-slate-600">
                  123, Democracy Avenue,<br />
                  Civil Lines, New Delhi - 110001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p className="text-slate-600">+91 11 2345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p className="text-slate-600">contact@civicprogress.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <form className="bg-orange-50 p-8 rounded-xl" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              required
            ></textarea>
            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
