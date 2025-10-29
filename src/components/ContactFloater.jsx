// src/components/ContactFloater.jsx
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ContactFloater() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSend = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill out all fields before sending.");
      return;
    }

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:admin@fusionitsolution.com?subject=${subject}&body=${body}`;
    setIsOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-purple-700 hover:to-blue-700 text-white font-semibold 
                   rounded-full shadow-lg px-6 py-3 flex items-center gap-2 z-50 
                   transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle size={20} /> Contact Us
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative 
                       animate-fadeIn font-inter tracking-tight leading-snug"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Contact Us
            </h2>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </>
  );
}
