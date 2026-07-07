import React, { useContext, useRef } from 'react'
import { UserHomeDataContext } from '../context/UserHomeContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ConnectingWithDriver = () => {
  const {
    connectingWithDriver,
    setConnectingWithDriver,
    setConfirmRidePanel,
    setWaitingForDriver,
    selectedVehicle,
    pickup,
    destination
  } = useContext(UserHomeDataContext)
  const panelRef = useRef(null)

  useGSAP(() => {
    if (!panelRef.current) return
    if (connectingWithDriver) {
      gsap.to(panelRef.current, {
        transform: 'translateY(0)',
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(panelRef.current, {
        transform: 'translateY(100%)',
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [connectingWithDriver])

  const handleCancel = () => {
    setConnectingWithDriver(false)
    setConfirmRidePanel(true)
  }

  // Simulate driver found after some time (for demo)
  const simulateDriverFound = () => {
    setConnectingWithDriver(false)
    setWaitingForDriver(true)
  }

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 right-0 z-60 bg-white rounded-t-3xl flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-w-lg mx-auto"
      style={{ transform: 'translateY(100%)', opacity: 0, pointerEvents: 'none' }}
    >
      {/* Drag Handle */}
      <div className='flex justify-center pt-3 pb-1'>
        <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
      </div>

      {/* Title */}
      <h2 className='text-xl font-bold text-black px-5 pt-2 pb-2'>Looking for a driver</h2>
      <p className='text-sm text-gray-500 px-5 pb-4'>This may take a few moments...</p>

      {/* Pulsing Animation */}
      <div className='flex justify-center py-6'>
        <div className='relative flex items-center justify-center'>
          {/* Outer pulse rings */}
          <div className='absolute w-28 h-28 rounded-full bg-black/5 animate-ping' style={{ animationDuration: '2s' }}></div>
          <div className='absolute w-20 h-20 rounded-full bg-black/10 animate-ping' style={{ animationDuration: '1.5s' }}></div>
          {/* Center icon */}
          <div className='relative w-16 h-16 bg-black rounded-full flex items-center justify-center z-10 shadow-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className='flex items-center gap-4 px-5 py-3 mx-5 bg-gray-50 rounded-xl mb-3'>
        {selectedVehicle?.logo ? (
          <img src={selectedVehicle.logo} alt={selectedVehicle.name} className='h-12 w-12 object-contain' />
        ) : (
          <div className='h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
        )}
        <div>
          <p className='text-sm font-semibold text-black'>{selectedVehicle?.name || 'UberGo'}</p>
          <p className='text-xs text-gray-500'>₹{selectedVehicle?.price || '193.20'}</p>
        </div>
      </div>

      {/* Pickup Location */}
      <div className='flex items-start gap-3 px-5 py-3 border-t border-gray-200'>
        <div className='mt-1'>
          <div className='w-3 h-3 rounded-full border-2 border-black bg-transparent'></div>
        </div>
        <div>
          <p className='text-sm font-semibold text-black'>{pickup || '562/11-A'}</p>
          <p className='text-xs text-gray-500'>{pickup ? '' : 'Kankariya Talab, Bhopal'}</p>
        </div>
      </div>

      {/* Destination Location */}
      <div className='flex items-start gap-3 px-5 py-3 border-t border-gray-200'>
        <div className='mt-1'>
          <div className='w-3 h-3 bg-black rounded-sm'></div>
        </div>
        <div>
          <p className='text-sm font-semibold text-black'>{destination || '562/11-A'}</p>
          <p className='text-xs text-gray-500'>{destination ? '' : 'Kankariya Talab, Bhopal'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='px-5 pt-3 pb-6 flex gap-3'>
        <button
          className='flex-1 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-base
          rounded-lg transition-all duration-200 active:scale-[0.98]'
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className='flex-1 py-3.5 bg-black hover:bg-gray-900 text-white font-semibold text-base
          rounded-lg transition-all duration-200 active:scale-[0.98]'
          onClick={simulateDriverFound}
        >
          Simulate Found
        </button>
      </div>
    </div>
  )
}

export default ConnectingWithDriver