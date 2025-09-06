import React from 'react'

const Unauthorized = () => {
  return (
    <div className='h-[100vh] bg-blue-50/50 flex flex-col justify-center items-center'>
         <h1 className='font-semibold text-red-700 text-8xl mb-5'>401</h1>
         <h3 className='font-medium text-xl text-gray-700'>You are not authenticated</h3>
    </div>
  )
}

export default Unauthorized