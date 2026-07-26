'use client';

import React, { useState } from 'react';
import { User, Mail, MessageSquare, SendHorizontal, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address.';
      }
    }
    if (name === 'message' && value.trim().length < 10) {
      return 'Message must be at least 10 characters long.';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error on change if valid
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const msgErr = validateField('message', formData.message);

    if (nameErr || emailErr || msgErr) {
      setErrors({ name: nameErr, email: emailErr, message: msgErr });
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        const errorData = await response.json();
        setStatus('error');
        setErrorMessage(errorData.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Network error while sending. Please try again later.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-primary/10 border border-primary/30 rounded-2xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-textMain">Message Delivered!</h3>
        <p className="text-sm text-textMain/80 max-w-sm leading-relaxed">
          Thank you for reaching out! I have received your message and will get back to you shortly.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold tracking-wide flex items-center gap-2 hover:bg-purple transition-all shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5" noValidate>
        {/* Name Input */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center text-textMain/80 font-bold text-xs tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <label htmlFor="name">Name</label>
            </span>
            {errors.name && (
              <span className="text-[11px] font-medium text-red-400 normal-case">{errors.name}</span>
            )}
          </div>
          <input 
            className={`w-full rounded-xl px-5 py-3.5 bg-secondary/15 hover:bg-secondary/25 border text-sm text-textMain placeholder-textMain/40 focus:outline-none transition-all duration-300 ${
              errors.name 
                ? 'border-red-500/50 focus:ring-1 focus:ring-red-500' 
                : 'border-purple/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/30'
            }`} 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Your Name"
            value={formData.name} 
            onChange={handleChange} 
            onBlur={handleBlur}
            required 
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center text-textMain/80 font-bold text-xs tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <label htmlFor="email">Email Address</label>
            </span>
            {errors.email && (
              <span className="text-[11px] font-medium text-red-400 normal-case">{errors.email}</span>
            )}
          </div>
          <input 
            className={`w-full rounded-xl px-5 py-3.5 bg-secondary/15 hover:bg-secondary/25 border text-sm text-textMain placeholder-textMain/40 focus:outline-none transition-all duration-300 ${
              errors.email 
                ? 'border-red-500/50 focus:ring-1 focus:ring-red-500' 
                : 'border-purple/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/30'
            }`} 
            type="email" 
            id="email" 
            name="email" 
            placeholder="your.email@example.com"
            value={formData.email} 
            onChange={handleChange} 
            onBlur={handleBlur}
            required 
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center text-textMain/80 font-bold text-xs tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <label htmlFor="message">Your Message</label>
            </span>
            {errors.message && (
              <span className="text-[11px] font-medium text-red-400 normal-case">{errors.message}</span>
            )}
          </div>
          <textarea 
            className={`w-full rounded-xl px-5 py-3.5 bg-secondary/15 hover:bg-secondary/25 border text-sm text-textMain placeholder-textMain/40 focus:outline-none transition-all duration-300 resize-none ${
              errors.message 
                ? 'border-red-500/50 focus:ring-1 focus:ring-red-500' 
                : 'border-purple/15 focus:border-primary/50 focus:ring-1 focus:ring-primary/30'
            }`} 
            id="message" 
            name="message" 
            placeholder="Write your project details or questions here..."
            value={formData.message} 
            onChange={handleChange} 
            onBlur={handleBlur}
            rows={4} 
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-gradient-to-r from-primary to-purple hover:opacity-95 text-white rounded-xl py-4 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group/btn disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <SendHorizontal className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </form>

      {/* Modern Error Banner */}
      {status === 'error' && (
        <div className="mt-5 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-2.5 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
