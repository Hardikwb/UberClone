import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Riding = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const rideData = location.state || {}

  const driver = rideData.driver || {
    name: 'Rahul Sharma',
    rating: 4.8,
    vehicle: 'White Maruti Suzuki Alto',
    plate: 'MP 04 AB 1234',
    trips: 1247
  }
  const pickup = rideData.pickup || '562/11-A, Kankariya Talab'
  const destination = rideData.destination || 'Railway Station, Bhopal'
  const fare = rideData.fare || '193.20'
  const otp = rideData.otp || '4829'

  const handlePayment = () => {
    navigate('/home')
  }

  return (
    <div className='h-screen w-screen relative overflow-hidden bg-gray-100'>
      {/* Live Map */}
      <div className='w-full h-full absolute inset-0'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Live Map"
        />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        className='absolute top-5 left-5 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-200'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Bottom Panel */}
      <div className='fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto'>
        {/* Drag Handle */}
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
        </div>

        {/* ETA Progress */}
        <div className='mx-5 mt-2 mb-3'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-lg font-bold text-black'>On the way</p>
            <p className='text-sm text-gray-500'>Est. 15 min</p>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-1.5'>
            <div className='bg-black h-1.5 rounded-full transition-all duration-1000' style={{ width: '35%' }}></div>
          </div>
        </div>

        {/* Driver Info */}
        <div className='flex items-center gap-4 px-5 py-3 border-t border-gray-100'>
          <div className='relative'>
            <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white'></div>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-bold text-black'>{driver.name}</p>
            <p className='text-xs text-gray-500'>{driver.vehicle} \u2022 {driver.plate}</p>
          </div>
          <div className='flex gap-2'>
            <button className='w-10 h-10 bg-green-50 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className='w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ride Locations */}
        <div className='px-5 py-2 border-t border-gray-100'>
          <div className='flex items-start gap-3 py-2'>
            <div className='mt-1.5'>
              <div className='w-2.5 h-2.5 rounded-full border-2 border-black'></div>
            </div>
            <div>
              <p className='text-xs text-gray-500'>Pickup</p>
              <p className='text-sm font-medium text-black'>{pickup}</p>
            </div>
          </div>
          <div className='flex items-start gap-3 py-2'>
            <div className='mt-1.5'>
              <div className='w-2.5 h-2.5 bg-black rounded-sm'></div>
            </div>
            <div>
              <p className='text-xs text-gray-500'>Drop-off</p>
              <p className='text-sm font-medium text-black'>{destination}</p>
            </div>
          </div>
        </div>

        {/* Fare & Payment */}
        <div className='flex items-center justify-between px-5 pt-3 pb-6 border-t border-gray-100'>
          <div>
            <p className='text-xs text-gray-500'>Fare</p>
            <p className='text-xl font-bold text-black'>\u20b9{fare}</p>
            <p className='text-xs text-gray-500'>Cash Payment</p>
          </div>
          <button
            onClick={handlePayment}
            className='px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm
            rounded-lg transition-all duration-200 active:scale-[0.98]'
          >
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Riding