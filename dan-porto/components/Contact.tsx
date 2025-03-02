import React from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="bg-gradient-to-r from-primary via-white to-[#fff] text-transparent bg-clip-text text-4xl font-bold">Contact Me</h1>
      <div className="px-20 py-10 w-full">
        <div className="bg-foreground w-full flex shadow-md border-primary border rounded-md">
          <div className="w-1/2 flex justify-center items-center">
            <ContactForm />
          </div>
          <div className="w-1/2 flex justify-center items-center">friends</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
