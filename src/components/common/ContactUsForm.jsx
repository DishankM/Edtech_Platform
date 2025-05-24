import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/api';
import CountryCode from '../../data/countrycode.json';
import { toast } from 'react-toastify'; // Ensure you install react-toastify and import it

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log('Logging Data:', data);
    try {
      setLoading(true);
      const phoneNo = `${data.countrycode} ${data.phoneNumber}`;
      const { firstname, lastname, email, message } = data;

      const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, {
        firstname,
        lastname,
        email,
        message,
        phoneNo,
      });

      if (response.data.success) {
        toast.success('Message sent successfully');
      } else {
        toast.error('Something went wrong');
      }

      console.log(response);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to send message');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstname: '',
        lastname: '',
        message: '',
        phoneNumber: '',
        countrycode: CountryCode[0].code, // Reset to the first country code
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    
    <form 
    className='flex flex-col gap-7'
    onSubmit={handleSubmit(submitContactForm)}>
      {/* First Name */}
      <div className="flex flex-col gap-5  ">
        <div className="flex gap-5">
          <div className="flex flex-col lg:w-[48%]">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter the First Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="text-black rounded-md w-[210px] p-2 bg-richblack-700"
              {...register('firstname', { required: 'Please enter your first name' })}
            />
            {errors.firstname && <span>{errors.firstname.message}</span>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col ">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter the Last Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="text-black rounded-md w-[210px] p-2 bg-richblack-700"
              {...register('lastname')}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="text-black rounded-md p-2 bg-richblack-700"
            {...register('email', { required: 'Please enter your email address' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber">Phone Number</label>
          <div className="flex flex-row gap-5 ">
            {/* Dropdown */}
            <div className="flex w-[70px] text-richblue-5 ">
              <select
                name="countrycode"
                id="dropdown"
                className='bg-richblack-700 rounded-md '
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register('countrycode', { required: 'Please select a country code' })}
              >
                {CountryCode.map((element, index) => (
                  <option value={element.code} key={index}>
                    {element.code} - {element.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="number"
                name="phoneNumber"
                id="phonenumber"
                placeholder="1234 5678 90"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="text-black rounded-md p-2 w-[350px] bg-richblack-700"
                {...register('phoneNumber', {
                  required: 'Please enter your phone number',
                  maxLength: {
                    value: 10,
                    message: 'Invalid Phone Number',
                  },
                  minLength: {
                    value: 8,
                    message: 'Invalid Phone Number',
                  },
                })}
              />
            </div>
          </div>
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter Your Message Here"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="text-black rounded-md p-2 bg-richblack-700"
            {...register('message', { required: 'Please enter your message' })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>

        <button
          type="submit"
          className="rounded-md bg-yellow-25 px-10 text-[16px] font-bold text-richblack-600 pt-2 pb-2"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm;
