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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Pesan berhasil terkirim!');
        setFormData({ name: '', email: '', message: '' }); // Reset formulir
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
    <div className=''>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
        <div className='flex flex-col space-y-2'>
          <label className='text-white font-medium' htmlFor="name">Name</label>
          <input className='rounded-[15px] p-5 mr-20 text-black' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='flex flex-col space-y-2'>
          <label className='text-white font-medium' htmlFor="email">Email</label>
          <input className='rounded-[15px] p-5 mr-20 text-black' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='flex flex-col space-y-2'>
          <label className='text-white font-medium' htmlFor="message">Your Message</label>
          <textarea className='rounded-[15px] p-5 mr-20 text-black' id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required></textarea>
        </div>
        <button className='bg-primary text-white rounded-[15px] p-5 mr-20 hover:bg-purple hover:transition-all hover:ease-in-out hover:shadow-md hover:shadow-primary hover:font-bold' type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}