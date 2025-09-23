import React from 'react'

const HomeNav = () => {
   return (
       <>
        <div className='flex justify-between items-center px-8 py-4 bg-white border-b border-gray-300 shadow fixed z-1 right-0 left-0 top-0'>
          <div className='flex gap-3 items-center'>
              <h1 className='font-bold text-xl text-gray-900'>TaskFlow</h1>
          </div>
           <div className='flex gap-5'>
                <p className='max-md:hidden text-md text-gray-900 font-semibold'>Sign In</p>
                <p className='max-md:hidden text-md text-gray-500 font-light text-right'>Get Started</p>
           </div>
        </div>
    </>
  )

}


export default HomeNav