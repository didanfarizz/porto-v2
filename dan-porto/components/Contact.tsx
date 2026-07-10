import React from 'react';
import ContactForm from './ContactForm';
import { Phone, Mail, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const contact = [
    {
      title: '+62 858-9206-7750',
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone Call',
    },
    {
      title: 'didan.fariz@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      label: 'Gmail',
    },
    {
      title: 'didan.fariz@gmail.com',
      icon: <Send className="w-5 h-5" />,
      label: 'Outlook',
    },
    {
      title: 'live:.cid.2cdbeba83724a2fa',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Skype',
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-16 px-4 sm:px-10">
      {/* Title */}
      <h1 className="bg-gradient-to-r from-primary via-textMain to-textMain text-transparent bg-clip-text text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
        Contact
      </h1>
      <p className="text-sm text-textMain/60 max-w-md text-center mb-12">
        Let&apos;s build something together! Feel free to reach out anytime.
      </p>

      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-5xl bg-secondary/15 hover:bg-secondary/25 backdrop-blur-lg border border-purple/10 hover:border-primary/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-500 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Side: Contact Information */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 inline-block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-textMain leading-tight">
              Have a project in mind? <br />
              <span className="bg-gradient-to-r from-primary to-purple text-transparent bg-clip-text">Let&apos;s talk🚀</span>
            </h2>
            <p className="text-sm text-textMain/70 leading-relaxed">
              Feel free to reach out to me if you have any questions, collaboration opportunities, or just want to chat. I&apos;m always open to discussing new ideas, designs, or development workflows.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:mt-12">
            {contact.map((item, index) => (
              <div 
                key={index} 
                className="bg-secondary/10 hover:bg-secondary/30 border border-purple/5 hover:border-primary/25 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-xs font-semibold text-textMain break-all group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="w-full lg:w-1/2 bg-secondary/5 rounded-2xl p-5 sm:p-8 border border-purple/5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;