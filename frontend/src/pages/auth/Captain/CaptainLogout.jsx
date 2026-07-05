import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {
  const token = localStorage.getItem('captainToken')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((response) => {
          if (response.status === 200) {
              localStorage.removeItem('captainToken')
              navigate('/captain-login')
          }
    })
  }, [token, navigate])

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout