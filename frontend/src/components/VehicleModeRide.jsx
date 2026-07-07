import React, { forwardRef, useContext, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { UserHomeDataContext } from '../context/UserHomeContext'

const VehicleModeRide = forwardRef((props, ref) => {
  const {pickup, destination, vehiclePanelOpen, setVehiclePanelOpen, setPanelOpen, selectedVehicle, setSelectedVehicle, setConfirmRidePanel } = useContext(UserHomeDataContext)
  const panelRef = useRef(null)

  const car_image="data:image/jpeg;base64,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"
    const moto_image="data:image/jpeg;base64,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"
    const train_image="data:image/png;base64,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"
    
      const transportData = [
    {logo:car_image,id: 1, name: "Express Bus", price: "563.9", duration: "4h 30m", time: "10:30 AM", caption: "Non-Stop" },
    {logo:train_image,id: 2, name: "Rajdhani", price: "1,250.0", duration: "2h 15m", time: "08:00 AM", caption: "Premium" },
    {logo:train_image,id: 3, name: "Shatabdi", price: "1,000.0", duration: "2h 45m", time: "09:00 AM", caption: "Semi-Premium" },
    {logo:car_image,id: 4, name: "Garib Rath", price: "750.0", duration: "3h 30m", time: "11:00 AM", caption: "Budget" },
    {logo:car_image,id: 5, name: "Intercity Express", price: "500.0", duration: "4h 0m", time: "12:30 PM", caption: "Economy" },  
    ];

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(panelRef.current, {
        bottom: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(panelRef.current, {
        bottom: '-100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }, [vehiclePanelOpen])

  const handleBack = () => {
    setVehiclePanelOpen(false)
    setPanelOpen(true)
  }

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
  }

  if (!vehiclePanelOpen) return null

    return (
    <div 
      ref={panelRef}
      className='fixed inset-0 z-50 bg-white flex flex-col'
      style={{ bottom: '-100%', opacity: 0 }}
    >
      {/* Header with Uber Logo */}
      <div className='relative bg-white shadow-sm'>
        <button
          onClick={handleBack}
          className='absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition-colors duration-200'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className='flex justify-center py-4'>
          <img
            className='w-16 sm:w-20'
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>
      </div>

      {/* Trip Summary */}
      <div className='bg-gray-50 px-4 sm:px-6 py-4 border-b'>
        <h2 className='text-lg sm:text-xl font-bold text-gray-900 mb-3'>Choose a ride</h2>
        <div className='flex items-stretch gap-3'>
          <div className='flex flex-col items-center py-1'>
            <div className='w-2 h-2 bg-gray-900 rounded-full'></div>
            <div className='w-0.5 flex-1 bg-gray-300 my-1'></div>
            <div className='w-2 h-2 bg-gray-900 rounded-sm'></div>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <div className='bg-white px-3 py-2 rounded-lg border'>
              <p className='text-xs text-gray-500'>Pickup</p>
              <p className='text-sm font-medium text-gray-900 truncate'>{pickup || 'Current Location'}</p>
            </div>
            <div className='bg-white px-3 py-2 rounded-lg border'>
              <p className='text-xs text-gray-500'>Destination</p>
              <p className='text-sm font-medium text-gray-900 truncate'>{destination || 'Select Destination'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Options */}
      <div className='flex-1 overflow-y-auto'>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
              {transportData.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>{handleSelectVehicle(item)}}
                  className={`group flex w-full items-center justify-between gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] ${
                    selectedVehicle?.id === item.id
                      ? 'border-black bg-gray-50 shadow-lg ring-1 ring-black/10'
                      : 'border-gray-200 bg-white hover:border-gray-900/20 hover:bg-gray-50'
                  }`}
                >
            {/* Logo Section */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-sm">
              <img
                src={item.logo || ""}
                alt={item.name}
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col grow">
              <h1 className="font-semibold text-lg leading-tight text-gray-900 transition-colors duration-300 group-hover:text-black">
                {item.name}
                <span className="ml-2 text-xs font-normal text-blue-500 transition-colors duration-300 group-hover:text-blue-600">
                  Logo
                </span>
              </h1>

              <div className="flex gap-3 text-sm text-gray-600 mt-1 transition-colors duration-300 group-hover:text-gray-700">
                <span>{item.duration}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>

              <p className="text-gray-400 text-xs italic mt-1 transition-colors duration-300 group-hover:text-gray-500">
                {item.caption}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-center shrink-0">
              <span className="font-bold text-lg text-green-700 transition-colors duration-300 group-hover:text-green-800">
                ₹ {item.price}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
      </div>

      {/* Bottom Action */}
      <div className='bg-white border-t px-4 sm:px-6 py-4'>
        <button
          className='w-full py-3 sm:py-4 bg-black hover:bg-gray-900 text-white font-semibold text-base
          rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]'
          disabled={!selectedVehicle}
          onClick={() => {
            if (selectedVehicle) {
              setConfirmRidePanel(true)
              setVehiclePanelOpen(false)
            }
          }}
        >
          {selectedVehicle ? `Confirm ${selectedVehicle.name} — ₹${selectedVehicle.price}` : 'Select a ride'}
        </button>
      </div>
    </div>
  )
})

// VehicleModeRide.displayName = 'VehicleModeRide'

export default VehicleModeRide
