import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <div className="">
        <form action="">
          <input type="name" id='name' placeholder='Name' className='bg-transparent border-b-2 border-white' />
          <input type="email" id='email' placeholder='Email' className='bg-transparent border-b-2 border-white' />
          <input type="subject" id='subject' placeholder='Subject' className='bg-transparent border-b-2 border-white' />
          <textarea name="message" id="message" rows={10} placeholder='Message' className='bg-transparent border-b-2 border-white'></textarea>
        </form>
      </div>
    </div>
  )
}

export default ContactForm