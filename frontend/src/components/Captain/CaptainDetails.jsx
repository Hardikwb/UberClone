import React, { useContext, useState } from 'react'
import { DataHomeCaptionContext } from '../../context/HomeCaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainDetails = () => {
     // Stats mock
    const stats = {
        hours: 8.5,
        earnings: 147,
        trips: 12
    }
    const navigate = useNavigate()

    const {ridePopup,setRidePopup,confirmRidePopup,setConfirmRidePopup,currentRide,setCurrentRide}=useContext(DataHomeCaptionContext)
  return (
    <div>
        <div className='fixed bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto'>
        {/* Drag Handle */}
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
        </div>

        {/* Stats Cards */}
        <div className='flex gap-3 px-5 py-3'>
          <div className='flex-1 bg-gray-50 rounded-xl p-3 text-center'>
            <p className='text-xs text-gray-500'>Hours Online</p>
            <p className='text-lg font-bold text-black'>{stats.hours}</p>
          </div>
          <div className='flex-1 bg-gray-50 rounded-xl p-3 text-center'>
            <p className='text-xs text-gray-500'>Earnings</p>
            <p className='text-lg font-bold text-green-700'>Rs.{stats.earnings}</p>
          </div>
          <div className='flex-1 bg-gray-50 rounded-xl p-3 text-center'>
            <p className='text-xs text-gray-500'>Trips</p>
            <p className='text-lg font-bold text-black'>{stats.trips}</p>
          </div>
        </div>

        {/* Find Rides Button */}
        <div className='px-5 pt-2 pb-6'>
          <button
            // onClick={() => setRidePopup(true)}
            onClick={() => navigate('/captain-rideOptions')}
            className='w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base
            rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg'
          >
            Find Rides Nearby
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails