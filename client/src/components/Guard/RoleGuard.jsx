import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Loading from '../utils/Loading'

const RoleGuard = ({ role,children }) => {
    const{token,loading,authUser} = useAppContext()

    if(loading) return <Loading/>

    if(!authUser || !token){
        return <Navigate to='/'/>
    }


    
    if(authUser.role !== role){
        return <Navigate to='/unauthorized'/>
    }

    return children
}

export default RoleGuard