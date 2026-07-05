import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../context/CaptainContext'
import {UserRound,LogOut} from 'lucide-react'
const CaptainNavBar = () => {
    const navigate = useNavigate()
    const { captain } = useContext(CaptainDataContext)
    const captainName = captain?.fullname?.firstName || 'Captain'
  return (
    <div>
          {/* Background Map */}
      <div className='w-full h-full absolute inset-0'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* Top Bar */}
      <div className='absolute top-0 left-0 right-0 z-30 px-5 pt-5 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg'>
           <UserRound />
          </div>
          <div>
            <p className='text-lg text-black font-bold drop-shadow-lg'>Hi, {captainName}</p>
            <p className='text-lg font-bold text-green-800/80 drop-shadow-lg'>Online</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/logout-captain')}
          className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors'
        >
          <LogOut />
        </button>
      </div>
    </div>
  )
}

export default CaptainNavBar