import React from 'react'
import { Flag, Users, X } from 'lucide-react'
import RoleSelect from './RoleSelect'

const AddUserForm = ({onClose}) => {
    const handleSubmit = (e) => {
     e.preventDefault()
    }
  return (
     <div className='inset-0 flex justify-center bg-black/40 items-center fixed z-50'>
        <form onSubmit={handleSubmit} className='bg-white  max-w-2xl w-full overflow-auto h-4/5 rounded-lg shadow-md px-7 py-6 text-gray-800 space-y-3'>
          <div className='flex justify-between py-4 border-b border-gray-300 mb-5'>
          <h2 className='font-medium text-2xl'>Add New User Account</h2>
          <X onClick={onClose} className='font-light text-gray-500 cursor-pointer'/>
         </div>
           <div className='w-full space-y-2 flex justify-between'>
            <div>
               <h5 className='font-medium text-sm'>First Name *</h5>
             <input type="text" placeholder='Enter First Name' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none min-w-75'/>
            </div>

            <div>
               <h5 className='font-medium text-sm'>Last Name *</h5>
             <input type="text" placeholder='Enter Last Name' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none min-w-75'/>
            </div>
             </div>
           <div className='space-y-2'>
             <h5 className='font-medium text-sm'>Email Address *</h5>
             <input type="email" className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' placeholder='Enter Email Address'/>
           </div>

           <div className='space-y-2'>
              <span className='flex items-center'>
            <Flag className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Role *</h5>
            </span>
            <RoleSelect/>
            </div>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <Users className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Department *</h5>
            </span>
           <input type="text" placeholder='Input department' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' />
            </div>
            <div className='w-full flex justify-end gap-3 py-4 border-t border-gray-300 mt-5'>
              <button onClick={onClose} className='border px-3.5 py-2.5 rounded-md border-gray-300 text-gray-500 font-light cursor-pointer'>Cancel</button>
              <button className='bg-blue-600 text-white font-light px-3.5 py-2.5 rounded-md hover:bg-blue-700 transition-all cursor-pointer'>Add User</button>
            </div>
        </form>
    </div>
  )
}

export default AddUserForm