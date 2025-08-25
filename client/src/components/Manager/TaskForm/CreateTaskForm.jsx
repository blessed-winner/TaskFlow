import { Calendar, Flag, User, X } from 'lucide-react'
import React from 'react'
import PrioritySelect from './PrioritySelect'

const CreateTaskForm = ({onClose}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='inset-0 flex justify-center bg-black/40 items-center fixed z-50'>
        <form onSubmit={handleSubmit} className='bg-white  max-w-2xl w-full overflow-auto h-4/5 rounded-lg shadow-md px-7 py-6 text-gray-800 space-y-3'>
          <div className='flex justify-between py-4 border-b border-gray-300 mb-5'>
          <h2 className='font-medium text-2xl'>Create New Task</h2>
          <X onClick={onClose} className='font-light text-gray-500 cursor-pointer'/>
         </div>
           <div className='w-full space-y-2'>
             <h5 className='font-medium text-sm'>Task Title *</h5>
             <input type="text" placeholder='Enter task title' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'/>
           </div>
           <div className='space-y-2'>
             <h5 className='font-medium text-sm'>Description *</h5>
             <textarea placeholder='Describe task in details' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none h-30'></textarea>
           </div>

           <div className='flex justify-between'>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <User className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Assign To *</h5>
            </span>
           <input type="text" placeholder='Select team member' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' />
            </div>
            <div className='space-y-2'>
              <span className='flex items-center'>
            <Flag className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Priority *</h5>
            </span>
            <PrioritySelect/>
            </div>
           </div>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <Calendar className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Due Date *</h5>
            </span>
           <input type="date" placeholder='Select team member' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' />
            </div>
            <div className='w-full flex justify-end gap-3 py-4 border-t border-gray-300 mt-5'>
              <button onClick={onClose} className='border px-3.5 py-2.5 rounded-md border-gray-300 text-gray-500 font-light cursor-pointer'>Cancel</button>
              <button className='bg-blue-600 text-white font-light px-3.5 py-2.5 rounded-md hover:bg-blue-700 transition-all cursor-pointer'>Create Task</button>
            </div>
        </form>
    </div>
  )
}

export default CreateTaskForm