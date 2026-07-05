import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


// TODO VALIDATE THE TOKEN ALSO
const UserProtectWrapper = ({children}) => {
    const token= localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [token, navigate])
    if (!token) {
        return null
    }
    return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper