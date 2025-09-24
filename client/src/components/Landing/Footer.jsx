import React from 'react'
import { footerLinks } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-blue-50/50 px-16 py-6'>
         
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 py-4'>
            <div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>TaskFlow</h3>
            <p className='max-w-xs text-gray-500'>Streamline your workflow and boost productivity with our intuitive task management platform.</p>
          </div>
            {footerLinks.map((l,idx)=>(
                <div key={idx}>
                    <h4 className='font-semibold mb-2 text-gray-800'>{l.title}</h4>
                    { l.links.map((link,index) => (
                        <p key={index} className='text-gray-500 cursor-pointer'>{link}</p>
                    )) }
                </div>
            ))}
        </div>
        <div className='py-4 border-t border-gray-300 text-center'>
            <p className='text-gray-500'>&copy; 2025 TaskFlow. All rights reserved</p>
        </div>
        </footer>
  )
}

export default Footer