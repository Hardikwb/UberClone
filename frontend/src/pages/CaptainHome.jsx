import React, { useContext, useRef, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import {UserRound,LogOut} from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { DataHomeCaptionContext } from '../context/HomeCaptainContext'
import CaptainDetails from '../components/Captain/CaptainDetails'
import CaptainNavBar from '../components/Captain/CaptainNavBar'
// import RidePopUp from '../components/RidePageOptions'
const CaptainHome = () => {
  const { captain } = useContext(CaptainDataContext)
  const navigate = useNavigate()
  const {ridePopup,setRidePopup,confirmRidePopup,setConfirmRidePopup,currentRide,setCurrentRide,ridePopupRef,confirmRidePopupRef}=useContext(DataHomeCaptionContext)

  // Mock ride requests
  

  // useGSAP(() => {
  //   if (!ridePopupRef.current) return
  //   if (ridePopup) {
  //     gsap.to(ridePopupRef.current, {
  //       transform: 'translateY(0)',
  //       opacity: 1,
  //       pointerEvents: 'auto',
  //       duration: 0.4,
  //       ease: 'power2.out'
  //     })
  //   } else {
  //     gsap.to(ridePopupRef.current, {
  //       transform: 'translateY(100%)',
  //       opacity: 0,
  //       pointerEvents: 'none',
  //       duration: 0.3,
  //       ease: 'power2.in'
  //     })
  //   }
  // }, [ridePopup])

  // useGSAP(() => {
  //   if (!confirmRidePopupRef.current) return
  //   if (confirmRidePopup) {
  //     gsap.to(confirmRidePopupRef.current, {
  //       transform: 'translateY(0)',
  //       opacity: 1,
  //       pointerEvents: 'auto',
  //       duration: 0.4,
  //       ease: 'power2.out'
  //     })
  //   } else {
  //     gsap.to(confirmRidePopupRef.current, {
  //       transform: 'translateY(100%)',
  //       opacity: 0,
  //       pointerEvents: 'none',
  //       duration: 0.3,
  //       ease: 'power2.in'
  //     })
  //   }
  // }, [confirmRidePopup])

  

  const handleConfirmRide = () => {
    setConfirmRidePopup(false)
    navigate('/captain-riding', {
      state: {
        ride: currentRide
      }
    })
  }

  const captainName = captain?.fullname?.firstName || 'Captain'

  return (
    <div className='h-screen w-screen relative overflow-hidden bg-gray-100'>

      {/* Captain Navbar */}
      <CaptainNavBar />

      {/* Bottom Dashboard */}
      <CaptainDetails  />

      {/* ===== Ride Request Popup ===== */}
      {/* <RidePopUp /> */}

      {/* ===== Confirm Ride Popup ===== */}
      {/* <div
        ref={confirmRidePopupRef}
        className='fixed bottom-0 left-0 right-0 z-60 bg-white rounded-t-3xl flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto'
        style={{ transform: 'translateY(100%)', opacity: 0, pointerEvents: 'none' }}
      >
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
        </div>

        <h2 className='text-xl font-bold text-black px-5 pt-2 pb-3'>Confirm to Start</h2>

        {currentRide && (
          <div className='px-5 pb-3'>


            {/* Rider */}
            {/* <div className='flex items-center gap-3 py-3 border-t border-gray-100'>
              <div className='w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='text-sm font-bold text-black'>{currentRide.rider}</p>
                <p className='text-xs text-gray-500'>{currentRide.distance}</p>
              </div>
              <p className='text-lg font-bold text-green-700'>\u20b9{currentRide.fare}</p>
            </div>  */}

            {/* Pickup */}
            {/* <div className='flex items-start gap-3 py-2'>
              <div className='mt-1'>
                <div className='w-3 h-3 rounded-full border-2 border-black'></div>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Pickup</p>
                <p className='text-sm font-medium text-black'>{currentRide.pickup}</p>
              </div>
            </div> */}

            {/* Destination */}
            {/* <div className='flex items-start gap-3 py-2'>
              <div className='mt-1'>
                <div className='w-3 h-3 bg-black rounded-sm'></div>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Destination</p>
                <p className='text-sm font-medium text-black'>{currentRide.destination}</p>
              </div>
            </div> */}

            {/* OTP Input */}
            {/* <div className='bg-gray-50 rounded-xl p-4 mt-2 mb-3'>
              <p className='text-xs text-gray-500 mb-2 font-medium'>Enter OTP from rider to start</p>
              <div className='flex gap-2 justify-center'>
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    type='text'
                    maxLength={1}
                    className='w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg
                    focus:border-black focus:ring-0 transition-colors bg-white'
                  />
                ))}
              </div>
            </div> */}

            {/* Actions */}
            {/* <div className='flex gap-3 pt-2'>
              <button
                onClick={() => { setConfirmRidePopup(false); setRidePopup(true) }}
                className='flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm
                rounded-lg transition-all duration-200 active:scale-[0.98]'
              >
                Back
              </button>
              <button
                onClick={handleConfirmRide}
                className='flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm
                rounded-lg transition-all duration-200 active:scale-[0.98]'
              >
                Start Ride
              </button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  )
}

export default CaptainHome