import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const CaptainRiding = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const rideData = location.state?.ride || {}
  const [finishPanel, setFinishPanel] = useState(false)
  const finishPanelRef = useRef(null)

  const ride = {
    rider: rideData.rider || 'Amit Patel',
    pickup: rideData.pickup || '562/11-A, Kankariya Talab, Bhopal',
    destination: rideData.destination || 'Railway Station, Bhopal',
    fare: rideData.fare || '193.20',
    distance: rideData.distance || '4.2 km',
    duration: rideData.duration || '15 min'
  }

  useGSAP(() => {
    if (!finishPanelRef.current) return
    if (finishPanel) {
      gsap.to(finishPanelRef.current, {
        transform: 'translateY(0)',
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(finishPanelRef.current, {
        transform: 'translateY(100%)',
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [finishPanel])

  const handleFinishRide = () => {
    setFinishPanel(false)
    navigate('/captain-home')
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

      {/* Top Bar */}
      <div className='absolute top-0 left-0 right-0 z-30 px-5 pt-5 flex items-center justify-between'>
        <div className='bg-white rounded-xl px-4 py-2 shadow-lg'>
          <p className='text-xs text-gray-500'>Distance remaining</p>
          <p className='text-lg font-bold text-black'>{ride.distance}</p>
        </div>
        <div className='bg-white rounded-xl px-4 py-2 shadow-lg'>
          <p className='text-xs text-gray-500'>ETA</p>
          <p className='text-lg font-bold text-black'>{ride.duration}</p>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className='fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto'>
        {/* Drag Handle */}
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
        </div>

        {/* Ride Progress */}
        <div className='mx-5 mt-2 mb-3'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-lg font-bold text-black'>Ride in Progress</p>
            <span className='text-xs font-medium px-2.5 py-1 bg-green-100 text-green-700 rounded-full'>Active</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-1.5'>
            <div className='bg-green-600 h-1.5 rounded-full transition-all duration-1000' style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Rider + Destination Summary */}
        <div className='flex items-center gap-3 px-5 py-3 border-t border-gray-100'>
          <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className='flex-1'>
            <p className='text-sm font-bold text-black'>{ride.rider}</p>
            <p className='text-xs text-gray-500'>Heading to {ride.destination}</p>
          </div>
          <p className='text-base font-bold text-green-700'>\u20b9{ride.fare}</p>
        </div>

        {/* Finish Ride Button */}
        <div className='px-5 pt-2 pb-6'>
          <button
            onClick={() => setFinishPanel(true)}
            className='w-full py-3.5 bg-black hover:bg-gray-900 text-white font-bold text-base
            rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg'
          >
            Complete Ride
          </button>
        </div>
      </div>

      {/* ===== Finish Ride Popup ===== */}
      <div
        ref={finishPanelRef}
        className='fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto'
        style={{ transform: 'translateY(100%)', opacity: 0, pointerEvents: 'none' }}
      >
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
        </div>

        <h2 className='text-xl font-bold text-black px-5 pt-2 pb-3'>Ride Summary</h2>

        <div className='px-5 pb-3'>
          {/* Fare Card */}
          <div className='bg-green-50 rounded-xl p-4 mb-4 text-center'>
            <p className='text-sm text-gray-600'>Total Fare</p>
            <p className='text-3xl font-bold text-green-700 mt-1'>\u20b9{ride.fare}</p>
            <p className='text-xs text-gray-500 mt-1'>Cash Payment</p>
          </div>

          {/* Trip Details */}
          <div className='space-y-3 mb-4'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-500'>Rider</span>
              <span className='font-medium text-black'>{ride.rider}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-500'>Distance</span>
              <span className='font-medium text-black'>{ride.distance}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-500'>Duration</span>
              <span className='font-medium text-black'>{ride.duration}</span>
            </div>
          </div>

          {/* Locations */}
          <div className='border-t border-gray-100 pt-3 mb-4'>
            <div className='flex items-start gap-3 py-1.5'>
              <div className='mt-1'>
                <div className='w-2.5 h-2.5 rounded-full border-2 border-black'></div>
              </div>
              <p className='text-xs text-gray-600'>{ride.pickup}</p>
            </div>
            <div className='flex items-start gap-3 py-1.5'>
              <div className='mt-1'>
                <div className='w-2.5 h-2.5 bg-black rounded-sm'></div>
              </div>
              <p className='text-xs text-gray-600'>{ride.destination}</p>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3 pt-1 pb-3'>
            <button
              onClick={() => setFinishPanel(false)}
              className='flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm
              rounded-lg transition-all duration-200 active:scale-[0.98]'
            >
              Back
            </button>
            <button
              onClick={handleFinishRide}
              className='flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm
              rounded-lg transition-all duration-200 active:scale-[0.98]'
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainRiding