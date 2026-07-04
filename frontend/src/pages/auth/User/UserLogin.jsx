import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../../../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // const [userData, setUserData] = useState({})

  const {setUser}=useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault()
    const userData = ({
      email:email,
      password:password
    })

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)
        
    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail("")
    setPassword("")
  }

  const handleGoogleSignIn = () => {
    // Add Google OAuth logic here
    console.log('Google Sign In clicked')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative'>
      {/* Logo in top left */}
      <img 
        className='absolute top-4 left-4 sm:top-6 sm:left-6 w-24 h-12 sm:w-32 sm:h-16 object-contain' 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" 
        alt="Uber Logo" 
      />
      
      <div className='w-full max-w-md px-2 sm:px-0'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Welcome back</h2>
          <p className='text-gray-600'>Sign in to continue your journey</p>
        </div>

        {/* Login Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
      
          {/* Email/Password Form */}
          <form onSubmit={submitHandler} className='space-y-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input 
                required
                className='w-full bg-gray-50 border-2 border-gray-300 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@email.com' 
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <div className='relative'>
                <input
                  className='w-full bg-gray-50 border-2 border-gray-300 focus:border-black focus:bg-white rounded-xl px-4 py-3 pr-12 text-base transition-all duration-200 outline-none'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200'
                >
                  {showPassword ? (
                    // Eye Slash Icon (Hide)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye Icon (Show)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-black hover:bg-gray-800 text-white font-semibold rounded-xl px-4 py-3 text-lg transition-all duration-200 shadow-lg hover:shadow-xl'>
              Sign In
            </button>
          </form>

           {/* Divider */}
          <div className='flex items-center gap-4 mt-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <span className='text-gray-500 text-sm font-medium'>OR</span>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            type='button'
            className='w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md text-gray-700 font-semibold rounded-xl px-4 py-3 transition-all duration-200 mt-2'>
            <svg className='w-5 h-5' viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className='text-center mt-6 text-gray-600'>
            New here? <Link to='/signup' className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'>Create new Account</Link>
          </p>

          {/* Captain Sign In */}
          <p className='text-center mt-4 text-gray-600'>
            <Link to='/captain-login' className='text-green-600 hover:text-green-700 font-semibold hover:underline'>Sign in as Captain</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin