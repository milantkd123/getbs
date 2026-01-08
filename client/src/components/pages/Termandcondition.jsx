import React from 'react'
import Footer from '../footer/Footer'

const Termandcondition = () => {
  return (
    <>
      <div className='mt-14 sm:mt-20 px-2 sm:px-6'>
        {/* HEADER */}
        <div className='w-full flex flex-col justify-center items-center gap-3 sm:gap-5'>
          <h1 className='text-center text-2xl xs:text-3xl sm:text-6xl font-bold tracking-wide'>
            Terms & Conditions
          </h1>

          <p className='text-center text-sm xs:text-base sm:text-2xl max-w-[300px] xs:max-w-[420px] sm:max-w-4xl'>
            Welcome to Get Barcode Solutions. By accessing or using our website
            <span className='text-blue-500 cursor-pointer ml-1'>
              <a href="https://getbarcodesolutions.com/">
                getbarcodesolutions.com
              </a>
            </span>
            , you agree to be bound by these Terms & Conditions.
          </p>
        </div>

        {/* SECTION WRAPPER */}
        <div className='mt-8 sm:mt-10 ml-2 sm:ml-10'>
          <h1 className='text-lg sm:text-3xl font-black tracking-wide'>
            1 Nature of Business
          </h1>
          <ul className='mt-2 list-disc ml-4 sm:ml-10 text-sm sm:text-lg'>
            <li>Barcode labels</li>
            <li>Thermal transfer ribbons</li>
            <li>Label printers</li>
            <li>Related barcode and labeling products</li>
          </ul>
        </div>

        <div className='mt-8 sm:mt-10 ml-2 sm:ml-10'>
          <h1 className='text-lg sm:text-3xl font-black tracking-wide'>
            2 User Accounts
          </h1>
          <ul className='mt-2 list-disc ml-4 sm:ml-10 text-sm sm:text-lg'>
            <li>Users must create an account to place orders.</li>
            <li>You are responsible for account security.</li>
            <li>Accurate information is required.</li>
            <li>Accounts may be suspended if misused.</li>
          </ul>
        </div>

        <div className='mt-8 sm:mt-10 ml-2 sm:ml-10'>
          <h1 className='text-lg sm:text-3xl font-black tracking-wide'>
            3 Pricing & Payments
          </h1>
          <ul className='mt-2 list-disc ml-4 sm:ml-10 text-sm sm:text-lg'>
            <li>Prices are in INR.</li>
            <li>Payments via Razorpay.</li>
            <li>Multiple payment methods supported.</li>
            <li>Gateway failures are not our responsibility.</li>
          </ul>
        </div>

        <div className='mt-8 sm:mt-10 ml-2 sm:ml-10'>
          <h1 className='text-lg sm:text-3xl font-black tracking-wide'>
            4 Shipping & Delivery
          </h1>
          <ul className='mt-2 list-disc ml-4 sm:ml-10 text-sm sm:text-lg'>
            <li>Courier-based delivery.</li>
            <li>Delivery times may vary.</li>
            <li>Delays beyond our control.</li>
          </ul>
        </div>

        <div className='mt-8 sm:mt-10 ml-2 sm:ml-10'>
          <h1 className='text-lg sm:text-3xl font-black tracking-wide'>
            5 Contact Information
          </h1>
          <ul className='mt-2 list-disc ml-4 sm:ml-10 text-sm sm:text-lg break-words'>
            <li>
              <span className='font-black'>Email:</span>{' '}
              <a href="mailto:getbarcodesolutions@gmail.com">
                getbarcodesolutions@gmail.com
              </a>
            </li>
            <li>
              <span className='font-black'>Phone:</span>{' '}
              <a href="tel:+919978969978">+91 9978 96 9978</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='mt-10'>

      <Footer/>
      </div>
    </>
  )
}

export default Termandcondition
