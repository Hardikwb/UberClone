import { Eye,EyeOff } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import CaptainDataContext from '../context/CaptainContext'
import {CaptainDataContext} from '../../../context/CaptainContext'

const CaptainSignUp = () => {
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vehicleType, setVehicleType] = useState("car")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleColor, setVehicleColor] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const {captain,setCaptain} = useContext(CaptainDataContext)

  const submitHandler = async(e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        vehicleNumber: vehicleNumber,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('captainToken', data.captainToken)
      navigate('/captain-home')
    }

    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setVehicleType("car")
    setVehicleNumber("")
    setVehicleColor("")
    setVehicleCapacity("")
  }

  const handleGoogleSignUp = () => {
    // Add Google OAuth logic here
    console.log('Google Sign Up clicked')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  
  return (
    <div className='min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4 relative'>
      {/* Logo in top left */}
      <img 
        className='absolute top-4 left-4 sm:top-6 sm:left-6 w-24 h-12 sm:w-32 sm:h-16 object-contain' 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" 
        alt="Uber Logo" 
      />
      
      <div className='w-full max-w-md px-2 sm:px-0 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Become a Captain</h2>
          <p className='text-gray-600'>Join our community and start earning</p>
        </div>

        {/* SignUp Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
      
          {/* Sign Up Form */}
          <form onSubmit={submitHandler} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                <input 
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='John' 
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                <input 
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Doe' 
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input 
                required
                className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email' 
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <div className='relative'>
                <input
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 pr-12 text-base transition-all duration-200 outline-none'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  type={showPassword ? "text" : "password"}
                  placeholder='Create a password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200'
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye/>
                  )}
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Type</label>
                <select
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Number</label>
                <input 
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder='ABC-1234' 
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Color</label>
                <input
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  placeholder='e.g. White, Black, Red'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Vehicle Capacity</label>
                <input
                  required
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-green-600 focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                  type="number"
                  min="1"
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  placeholder='e.g. 4'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-[#10b461] hover:bg-[#0ea152] text-white font-semibold rounded-xl px-4 py-3 text-lg transition-all duration-200 shadow-lg hover:shadow-xl'>
              Register as Captain
            </button>
          </form>

           {/* Divider */}
          <div className='flex items-center gap-4 mt-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='text-gray-500 text-sm font-medium'>OR</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            type='button'
            className='w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md text-gray-700 font-semibold rounded-xl px-4 py-3 transition-all duration-200 mt-2'>
            <svg className='w-5 h-5' viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className='text-center mt-6 text-gray-600'>
            Already a Captain? <Link to='/captain-login' className='text-green-600 hover:text-green-700 font-semibold hover:underline'>Sign In</Link>
          </p>

          {/* User Sign Up */}
          <p className='text-center mt-4 text-gray-600'>
            <Link to='/signup' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>Register as User</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignUp