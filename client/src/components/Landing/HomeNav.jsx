import React from 'react'
import { Link } from 'react-router-dom'

const HomeNav = () => {
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
                <p className='max-md:hidden text-sm text-gray-800 font-medium cursor-pointer'>Sign In</p>
                <p className='max-md:hidden text-sm text-white font-medium text-right px-2 py-1.5 bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-400 rounded-md hover:scale-102 transition-all cursor-pointer'>Get Started</p>
           </div>
        </div>
    </>
  )

}


export default HomeNav