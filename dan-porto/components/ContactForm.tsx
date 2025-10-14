'use client';

import React, { useState } from 'react';

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
    setStatus('Mengirim...');

    try {
      const response = await fetch('https://porto-v2-production.up.railway.app/api/contact', {
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

  const getStatusClass = () => {
    if (status.includes('berhasil')) {
      return 'text-green-400';
    }
    if (status.includes('Gagal') || status.includes('kesalahan')) {
      return 'text-red-400';
    }
    return 'text-gray-300';
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-white font-medium" htmlFor="name">
            Name
          </label>
          <input className="w-full rounded-[15px] p-5 text-black focus:outline-none focus:ring-2 focus:ring-primary" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white font-medium" htmlFor="email">
            Email
          </label>
          <input className="w-full rounded-[15px] p-5 text-black focus:outline-none focus:ring-2 focus:ring-primary" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white font-medium" htmlFor="message">
            Your Message
          </label>
          <textarea className="w-full rounded-[15px] p-5 text-black focus:outline-none focus:ring-2 focus:ring-primary" id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required></textarea>
        </div>
        <button
          className="w-full bg-primary text-white rounded-[15px] p-5 hover:bg-purple hover:transition-all hover:ease-in-out hover:shadow-md hover:shadow-primary hover:font-bold focus:outline-none focus:ring-2 focus:ring-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
      {status && <p className={`mt-4 text-center text-sm ${getStatusClass()}`}>{status}</p>}
    </div>
  );
}
