import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

function ContactFormSection() {
  return (
    <div className='mx-auto'>
        <h1 className='text-3xl font-bold h-9 items-center text-center'>
            Get in Touch
        </h1>
        <p className='text-xl mt-2 text-richblack-400'>
            we'd love to here for you, Please fill out this form.
        </p>
        <div className='mt-4'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection