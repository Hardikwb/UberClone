import React, { useContext, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LocationSearchPanel from '../components/LocationSearchPanel'
import { UserHomeDataContext } from '../context/UserHomeContext'
import RecentPlaces from './RecentPlaces'

const Home = () => {
  const {pickup, setPickup, destination, setDestination, panelOpen, setPanelOpen, cursor, setCursor, vehiclePanelOpen, setVehiclePanelOpen} = useContext(UserHomeDataContext)
  const panelRef = useRef(null)
  const formRef = useRef(null)

  const suggestions = [
    { id: 1, name: 'Times Square', address: 'Manhattan, NY 10036' },
    { id: 2, name: 'Central Park', address: 'New York, NY 10024' },
    { id: 3, name: 'Empire State Building', address: '350 5th Ave, New York' },
    { id: 4, name: 'Brooklyn Bridge', address: 'Brooklyn Bridge, New York' },
    { id: 5, name: 'JFK Airport', address: 'Queens, NY 11430' },
  ]

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Pickup:', pickup)
    console.log('Destination:', destination)
    setPanelOpen(false)
    setVehiclePanelOpen(true)
  }

  const closeBtnRef = useRef(null)

  const panelCloseRef = useRef(null)
  
  useGSAP(() => {
    if (panelOpen) {
      // Form takes 30% from top
      gsap.to(formRef.current, {
        height: '39%',
        top: '10%',
        bottom: 'auto',
        borderRadius: '0 0 24px 24px',
        duration: 0.5,
        ease: 'power2.out',
      })
      // Panel takes 70% from bottom
      gsap.to(panelRef.current, {
        bottom: '0%',
        height: '50%',
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.out'
      })
      // Animate Close Button IN
      gsap.to(closeBtnRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        scale: 1,
        duration: 0.3,
        delay: 0.3
      })
       // Hide search bar
      gsap.to('.search-bar-view', {
        opacity: 0,
        display: 'none',
        duration: 0.3
      })
      // Show full form
      gsap.to('.full-form-view', {
        opacity: 1,
        display: 'block',
        delay: 0.1,
        duration: 0.3
      })
    } else {
      // Reset form to bottom
      gsap.to(formRef.current, {
        height: 'auto',
        top: 'auto',
        bottom: '0',
        borderRadius: '24px 24px 0 0',
        duration: 0.5,
        ease: 'power2.in'
      })
      // Hide panel
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      // Animate Close Button OUT
      gsap.to(closeBtnRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        scale: 0.8,
        duration: 0.2
      })
      // Show search bar
      gsap.to('.search-bar-view', {
        opacity: 1,
        display: 'block',
        delay: 0.1,
        duration: 0.3
      })
      // Hide full form
      gsap.to('.full-form-view', {
        opacity: 0,
        display: 'none',
        duration: 0.3
      })
    }
  }, [panelOpen])

  // Sample location suggestions

  return (
    <div className='h-screen w-screen relative overflow-hidden bg-gray-100'>
      {/* Uber Logo */}
      <img
        className='w-14 sm:w-16 md:w-20 absolute left-3 sm:left-5 top-3 sm:top-5 z-30 drop-shadow-lg'
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Map */}
      <div className='w-full h-full absolute inset-0'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* Close button - Animated via GSAP */}
      <button
        ref={closeBtnRef}
        onClick={() => setPanelOpen(false)}
        className='absolute top-6 right-6 z-30 w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-md hover:scale-105 transition-all
        opacity-0 pointer-events-none scale-0'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Form Container */}
      <div
        ref={formRef}
        className='bg-white absolute bottom-0 left-0 right-0 mx-auto w-full max-w-183
        rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 overflow-hidden'
      >
        {/* VIEW 1: Collapsed Search Bar (Visible when panelOpen is false) */}
        {!panelOpen && (
          <div className='search-bar-view p-5'>
             <h4 className='text-xl font-bold text-gray-900 mb-3'>Where to?</h4>
             <div 
               className='bg-gray-100 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-colors shadow-sm'
               onClick={() => setPanelOpen(true)}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className='text-lg font-medium text-gray-600'>Search Destination</span>
             </div>
             {/* Quick Actions */}
             <div className='flex gap-2 sm:gap-3 mt-4 overflow-x-auto pb-1 scrollbar-hide'>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors'>
                <span className='text-base'>🏠</span>
                <span className='text-sm font-medium'>Home</span>
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors'>
                <span className='text-base'>💼</span>
                <span className='text-sm font-medium'>Work</span>
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors'>
                <span className='text-base'>✈️</span>
                <span className='text-sm font-medium'>Airport</span>
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors'>
                <span className='text-base'>⭐</span>
                <span className='text-sm font-medium'>Saved</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: Full Form (Visible when panelOpen is true) */}
        <div className={`full-form-view rounded-2xl  p-3 sm:p-4 md:p-5 ${!panelOpen ? 'hidden opacity-0' : 'block opacity-100'}`}>
          {/* Drag Handle */}
          <div 
            className='w-10 sm:w-12 h-1  sm:h-1.5 bg-gray-300 rounded-full mx-auto mb-3 sm:mb-4 cursor-pointer'
            onClick={() => setPanelOpen(!panelOpen)}
          ></div>
          
          <h4 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>Where to?</h4>
          
          <form onSubmit={submitHandler} className='flex flex-col gap-2 sm:gap-3'>
            {/* Location Input Container */}
            <div className='relative flex items-stretch gap-2 sm:gap-3'>
              {/* Timeline dots */}
              <div className='flex flex-col items-center py-3 sm:py-4'>
                <div className='w-2 h-2 sm:w-3 sm:h-3 bg-gray-900 rounded-full'></div>
                <div className='w-0.5 h-full bg-gray-300 my-1'></div>
                <div className='w-2 h-2 sm:w-3 sm:h-3 bg-gray-900 rounded-sm'></div>
              </div>
              
              {/* Inputs */}
              <div className='flex-1 flex flex-col gap-2 sm:gap-3'>
                <input
                  id='pickup'
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 border-0 rounded-lg sm:rounded-xl
                  focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-500'
                  type='text'
                  onClick={() => {setPanelOpen(true); setCursor('pickUp')}}
                  value={pickup}
                  onChange={(e) => {setPickup(e.target.value)}}
                  
                  placeholder='Pickup location'
                  />
                <input
                  id='destination'
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 border-0 rounded-lg sm:rounded-xl
                  focus:ring-2 focus:ring-black transition-all duration-200 placeholder:text-gray-500'
                  type='text'
                  value={destination}
                  onClick={() => {setPanelOpen(true); setCursor('destination')}}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder='Where to?'
                />
              </div>
              
              {/* Add Stop Button */}
              <button 
                type='button'
                className='self-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
  
            <button
              type='submit'
              className='w-full py-2.5 sm:py-3 md:py-4 bg-black hover:bg-gray-900 text-white font-semibold text-sm sm:text-base
              rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]'
            >
              Find Rides
            </button>
          </form>
  
          {/* Quick Actions - Hidden when panel is open to save space */}
          
        </div>
      </div>

      {/* Suggestions Panel - 70% when open */}
      <div
        ref={panelRef}
        className='bg-white absolute bottom-0 left-0 right-0 mx-auto w-full max-w-183 h-0 opacity-0 overflow-y-auto z-10 rounded-t-3xl'
      >
        <div className='p-3 sm:p-4 md:p-5 pt-4 sm:pt-6'>
          <h5 className='sticky top-0 bg-white py-2 text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900'>Recent Places</h5>
          <RecentPlaces />
        {/* Divider */}
          <div className='h-px bg-gray-200 my-3 sm:my-5'></div>

          {/* Set location on map */}
          <button className='flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors text-left w-full'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className='flex-1'>
              <p className='font-medium text-sm sm:text-base text-gray-900'>Set location on map</p>
              <p className='text-xs sm:text-sm text-gray-500'>Choose your destination point</p>
            </div>
          </button>
        </div>
      </div>

      <LocationSearchPanel />
    </div>
  )
}

export default Home