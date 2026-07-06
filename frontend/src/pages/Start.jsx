import React from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
      <div className='h-screen w-full'>
          {/* <div className='bg-[url("https://images.unsplash.com/photo-1567988255211-32baf6ccd755?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dWJlciUyMGxhbmRpbmclMjBwYWdlfGVufDB8fDB8fHww")] */}
          <div className='bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
              bg-cover bg-center p-7 min-h-screen w-full flex  flex-col justify-end items-center'>

          <div className="filter brightness-0 invert absolute top-7 left-7">
            <img className='w-20 md:w-32' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
          </div>
            <div className='bg-transparent p-6 md:p-10 flex flex-col items-center justify-center gap-5 w-full md:w-fit md:min-w-100 rounded-lg shadow-xl'>
              <h2 className='text-2xl md:text-5xl mb-5 font-bold text-center md:text-left text-white'>Get Started with Uber</h2>
              <Link to="/login" className='bg-black text-white px-6 py-4 flex items-center  justify-center rounded-xl text-xl md:text-2xl cursor-pointer hover:bg-gray-800 transition-colors w-full'>
                Continue
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Start