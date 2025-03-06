import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <div className="">
        <form action="" className='flex flex-col p-10 space-y-5'>
          <input type="name" id='name' placeholder='Name' className='bg-white p-3 border-b-2 border-white' />
          <input type="email" id='email' placeholder='Email' className='bg-white p-3 border-b-2 border-white' />
          <input type="subject" id='subject' placeholder='Subject' className='bg-white p-3 border-b-2 border-white' />
          <textarea name="message" id="message" rows={10} placeholder='Message' className='bg-white p-3 border-b-2 border-white'></textarea>
        </form>
      </div>
    </div>
  )
}

export default ContactForm