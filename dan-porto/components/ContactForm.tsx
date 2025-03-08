'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/mail-form';
import { mailFormSchema } from '../utils/validation/mail-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(mailFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-10 space-y-5">
          <div className="">
            <input type="name" id="name" placeholder="Name" className="bg-transparent bg-white p-3 border-b-2 border-white text-black" {...register('name')} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="">
            <input type="email" id="email" placeholder="Email" className="bg-white p-3 border-b-2 border-white" {...register('email')} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="">
            <input type="subject" id="subject" placeholder="Subject" className="bg-white p-3 border-b-2 border-white" {...register('subject')} />
            {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
          </div>
          <div className="">
            <textarea id="message" rows={4} placeholder="Message" className="w-full bg-white p-3 border-b-2 border-white" {...register('message')}></textarea>
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}
          </div>
          <button className="w-full bg-primary py-2 text-white hover:bg-primary/80 hover:transition-all hover:ease-in-out" type="submit">
            {isSubmitting ? 'Processing' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
