import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomeNav = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleNavigation = () => {
       const role = user.role
       if(role === 'ADMIN') navigate('/admin')
       if(role === 'MANAGER' ) navigate('/manager')
       if(role === 'USER') navigate('user')
  }

   return (
       <>
        <div className='flex justify-between items-center px-8 py-4 bg-white border-b border-gray-300 shadow fixed z-1 right-0 left-0 top-0'>
          <div className='flex gap-3 items-center'>
              <h1 className='font-bold text-xl text-gray-900'>TaskFlow</h1>
          </div>
          <div className='flex gap-2 text-sm text-gray-800 font-medium'>
              <Link className='cursor-pointer hover:scale-102 transiton-all'>Features</Link>
              <Link className='cursor-pointer hover:scale-102 transition-all'>About</Link>
          </div>
           <div className='flex gap-5 items-center'>
                { token && user ?  (<p onClick={handleNavigation} className='max-md:hidden text-sm text-white font-medium text-right px-2 py-1.5 bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-400 rounded-md hover:scale-102 transition-all cursor-pointer'>Dashboard</p>) :  (<><p onClick={()=>navigate('/auth')} className='max-md:hidden text-sm text-gray-800 font-medium cursor-pointer'>Sign In</p>
                <p className='max-md:hidden text-sm text-white font-medium text-right px-2 py-1.5 bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-400 rounded-md hover:scale-102 transition-all cursor-pointer'>Get Started</p></>) }
               
           </div>
        </div>
    </>
  )

}


export default HomeNav