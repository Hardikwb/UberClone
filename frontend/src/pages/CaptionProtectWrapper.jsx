import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptionProtectWrapper = ({children}) => {
    const captain_token = localStorage.getItem('captainToken')
    const navigate = useNavigate()
    useEffect(() => {
        if (!captain_token) {
            navigate('/captain-login',{replace:true})
        }
    }, [captain_token, navigate])
    
    return (
        <>
            {children}
        </>
    )
}

export default CaptionProtectWrapper