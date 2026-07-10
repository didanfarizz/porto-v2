'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare, SendHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Mengirim pesan...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Pesan berhasil terkirim!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(`Gagal mengirim pesan: ${errorData.message || 'Terjadi kesalahan.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Terjadi kesalahan saat mengirim. Coba lagi nanti.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        {/* Name Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1.5 text-textMain/75 font-bold text-xs tracking-wider uppercase">
            <User className="w-3.5 h-3.5 text-primary" />
            <label htmlFor="name">Name</label>
          </div>
          <input 
            className="w-full rounded-xl px-5 py-3.5 bg-secondary/10 hover:bg-secondary/20 border border-purple/10 focus:border-primary/50 text-sm text-textMain placeholder-textMain/30 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300" 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Your Name"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1.5 text-textMain/75 font-bold text-xs tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <label htmlFor="email">Email Address</label>
          </div>
          <input 
            className="w-full rounded-xl px-5 py-3.5 bg-secondary/10 hover:bg-secondary/20 border border-purple/10 focus:border-primary/50 text-sm text-textMain placeholder-textMain/30 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300" 
            type="email" 
            id="email" 
            name="email" 
            placeholder="your.email@example.com"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1.5 text-textMain/75 font-bold text-xs tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-primary" />
            <label htmlFor="message">Your Message</label>
          </div>
          <textarea 
            className="w-full rounded-xl px-5 py-3.5 bg-secondary/10 hover:bg-secondary/20 border border-purple/10 focus:border-primary/50 text-sm text-textMain placeholder-textMain/30 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none" 
            id="message" 
            name="message" 
            placeholder="Write your message details here..."
            value={formData.message} 
            onChange={handleChange} 
            rows={4} 
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-gradient-to-r from-primary to-purple hover:opacity-95 text-white rounded-xl py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group/btn disabled:opacity-50"
          type="submit"
          disabled={status.includes('Mengirim')}
        >
          <span>Send Message</span>
          <SendHorizontal className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </button>
      </form>

      {/* Modern Status Banner */}
      {status && (
        <div className={`mt-5 p-4 rounded-xl border text-center flex items-center justify-center gap-2.5 text-xs font-semibold transition-all duration-300 animate-fade-in ${
          status.includes('berhasil') 
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : status.includes('Mengirim')
            ? 'bg-primary/10 border-primary/20 text-primary'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {status.includes('berhasil') ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : status.includes('Mengirim') ? (
            <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{status}</span>
        </div>
      )}
    </div>
  );
}
