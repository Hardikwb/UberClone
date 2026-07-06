import React, { createContext, useRef, useState } from 'react'

export const DataHomeCaptionContext = createContext()

const HomeCaptainContext = ({ children }) => {
  
  const [email, setEmail] = useState("vre")
  const [password, setPassword] = useState("vre")
  const [showPassword, setShowPassword] = useState(false)
  const [ridePopup, setRidePopup] = useState(false)
  const [confirmRidePopup, setConfirmRidePopup] = useState(false)
  const [currentRide, setCurrentRide] = useState(null)
  const ridePopupRef = useRef(null)
  const confirmRidePopupRef = useRef(null)

  const value ={email,setEmail,password,setPassword,showPassword,setShowPassword,
              ridePopup,setRidePopup,confirmRidePopup,setConfirmRidePopup,currentRide,setCurrentRide,ridePopupRef,confirmRidePopupRef
  }
  return (
    <div>
      {/* <DataHomeCaptionContext.Provider value={value}> */}
      <DataHomeCaptionContext.Provider value={value}>
        {children}
      </DataHomeCaptionContext.Provider>
    </div>
  )
}

export default HomeCaptainContext