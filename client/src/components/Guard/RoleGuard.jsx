import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const RoleGuard = ({ role,children }) => {
    const{token} = useAppContext()
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user || !token){
        return <Navigate to='/auth'/>
    }

    
    if(user.role !== role){
        return <Navigate to='/unauthorized'/>
    }

    return children
}

export default RoleGuard