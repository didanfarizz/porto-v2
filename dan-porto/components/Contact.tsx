import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/constants'; 

const Contact = () => {
  const contact = [
    {
      title: '+62 858-9206-7750',
      image: '/phone-call.png',
    },
    {
      title: 'didan.fariz@gmail.com',
      image: '/email.png',
    },
    {
      title: 'didan.fariz@gmail.com',
      image: '/outlook.png',
    },
    {
      title: 'live:.cid.2cdbeba83724a2fa',
      image: '/skype.png',
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h1 className="bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text text-3xl sm:text-4xl font-bold">Contact</h1>
      <div className="px-4 sm:px-10 md:px-20 py-10 w-full">
        <div className="bg-foreground w-full flex flex-col lg:flex-row shadow-md border-primary border rounded-md overflow-hidden">
          <div className="w-full lg:w-1/2 py-10 px-6 sm:px-12 lg:px-16 space-y-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text">Contact Me</h1>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Have a project in mind? Let&apos;s talk🚀</h1>
            <p className="text-sm opacity-50">Feel free to reach out to me if you have any questions, collaboration opportunities, or just want to chat. I&apos;m always open to new ideas and collaborations.</p>

            <div className="pt-4">
              {contact.map((contact, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div className="p-3 w-12 h-12 rounded-full flex justify-center items-center bg-primary flex-shrink-0">
                    <Image
                      src={contact.image}
                      width={24}
                      height={24}
                      alt={contact.title}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL} 
                    />
                  </div>
                  <p className="text-sm text-white break-all">{contact.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-10 px-6 sm:px-12 lg:px-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;