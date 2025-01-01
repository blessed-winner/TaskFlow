import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()
  return (
    <div className='h-[100vh] bg-blue-50/50 flex flex-col justify-center items-center'>
         <h1 className='font-semibold text-red-700 text-8xl mb-5'>401</h1>
         <div className='flex gap-2 items-center'>
            <h3 className='font-medium text-xl text-gray-700'>You are not authenticated</h3>
            <p onClick={()=>navigate('/auth') } className='text-blue-500 hover:underline transition-all text-sm cursor-pointer'>Sign in</p>
         </div>
    </div>
  )
}

export default Unauthorized