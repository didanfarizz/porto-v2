'use client';
import { useState } from 'react';

export default function Contact() {
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
      const response = await fetch('http://localhost:8080/api/contact', {
        // Ganti dengan URL backend Go Anda jika berbeda
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
    <div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">Hubungi Saya</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nama:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Pesan Anda:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required></textarea>
        </div>
        <button type="submit">Kirim Pesan</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
