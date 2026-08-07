"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform mock client-side validation & submit logic
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1 select-none">
          <a href="/" className="hover:text-[#0e52b2] transition-colors">Home</a>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">Contact Us</span>
        </div>

        {/* Section Header */}
        <div className="border-b border-gray-200 pb-3 mb-8">
          <h1 className="text-[#0c1f3c] text-2xl sm:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-7 bg-[#0e52b2] rounded-full inline-block"></span>
            Contact Us
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1.5 font-medium">
            Have questions about a product or solar packages? Get in touch with our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
            
            <h2 className="text-[#0c1f3c] text-lg font-bold mb-4">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-6 text-center text-emerald-800 animate-in fade-in duration-200">
                <span className="text-3xl mb-2 block">✓</span>
                <h3 className="font-bold text-base mb-1">Thank You!</h3>
                <p className="text-sm text-emerald-600">
                  Your message has been sent successfully. One of our support representatives will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#0e52b2] underline hover:text-[#0b3d87]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Adnan Alamin"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-md focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. adnan@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-md focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 01700-000000"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-md focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Inquiry about Solar Setup"
                      className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-md focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details of your query..."
                    className="w-full px-3.5 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-md focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold text-sm px-6 py-3 rounded-md shadow-sm transition-all duration-200 active:scale-[0.99]"
                >
                  Send Message
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#0c1f3c] text-white rounded-lg p-6 shadow-sm border border-slate-800">
              <h3 className="text-amber-400 font-bold text-base mb-4 uppercase tracking-wider">Quick Support</h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">📞</span>
                  <div>
                    <div className="font-bold text-white">Hotline Number</div>
                    <div>+880 9678-300400</div>
                    <div>01712-345678</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✉</span>
                  <div>
                    <div className="font-bold text-white">Email Address</div>
                    <div>support@intouchgadgets.com</div>
                    <div>info@intouchgadgets.com</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">⏱</span>
                  <div>
                    <div className="font-bold text-white">Working Hours</div>
                    <div>Daily: 10:00 AM - 08:00 PM (Friday Closed)</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Address Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[#0c1f3c] font-bold text-base mb-3">🏢 Head Office Address</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 leading-relaxed">
                Multiplan Center, Level 10, Suite 1005,<br />
                New Elephant Road, Dhaka-1205, Bangladesh.
              </p>
              <div className="text-xs text-gray-400 font-medium italic border-t border-gray-100 pt-3">
                * Customer pickup and package consultations are available directly at our office.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
