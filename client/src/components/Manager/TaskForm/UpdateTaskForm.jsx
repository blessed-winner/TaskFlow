import { Calendar, Flag, User, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import PrioritySelect from './PrioritySelect'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'

const UpdateTaskForm = ({ onClose, onTaskUpdated, task }) => {
  
    const { axios } = useAppContext()
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assigneeName, setAssigneeName] = useState("")
    const [priority, setPriority] = useState('Medium')
    const [dueDate, setDueDate] = useState("")

    // Initialize form with task data
    useEffect(() => {
        if (task) {
            setTitle(task.title || "")
            setDescription(task.description || "")
            setAssigneeName(`${task.user?.fName || ""} ${task.user?.lName || ""}`.trim())
            setPriority(task.priority || 'Medium')
            setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "")
        }
    }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateTask()
  }

  const handleUpdateTask = async () => {
    if (!task?.id) {
      toast.error("Task ID is missing")
      return
    }

    const formData = {
       title,
       description,
       assigneeName,
       priority,
       dueDate
    }

    try {
      const { data } = await axios.put(`/api/tasks/update/${task.id}`, formData)
      if(data.success){
        toast.success(data.message)
        onTaskUpdated(data.task)
        onClose()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }


  return (
    <div className='inset-0 flex justify-center bg-black/40 items-center fixed z-50'>
        <form onSubmit={handleSubmit} className='bg-white  max-w-2xl w-full overflow-auto h-4/5 rounded-lg shadow-md px-7 py-6 text-gray-800 space-y-3'>
          <div className='flex justify-between py-4 border-b border-gray-300 mb-5'>
          <h2 className='font-medium text-2xl'>Update Task</h2>
          <X onClick={onClose} className='font-light text-gray-500 cursor-pointer'/>
         </div>
           <div className='w-full space-y-2'>
             <h5 className='font-medium text-sm'>Task Title *</h5>
             <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Enter task title' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'/>
           </div>
           <div className='space-y-2'>
             <h5 className='font-medium text-sm'>Description *</h5>
             <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Describe task in details' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none h-30'></textarea>
           </div>

           <div className='flex justify-between'>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <User className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Assign To *</h5>
            </span>
           <input type="text" value={assigneeName} onChange={(e)=>setAssigneeName(e.target.value)} placeholder='Select team member' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' />
            </div>
            <div className='space-y-2'>
              <span className='flex items-center'>
            <Flag className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Priority *</h5>
            </span>
            <PrioritySelect value={priority} onChange={setPriority}/>
            </div>
           </div>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <Calendar className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Due Date *</h5>
            </span>
           <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} placeholder='Select team member' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' />
            </div>
            <div className='w-full flex justify-end gap-3 py-4 border-t border-gray-300 mt-5'>
              <button type="button" onClick={onClose} className='border px-3.5 py-2.5 rounded-md border-gray-300 text-gray-500 font-light cursor-pointer'>Cancel</button>
              <button type="submit" className='bg-blue-600 text-white font-light px-3.5 py-2.5 rounded-md hover:bg-blue-700 transition-all cursor-pointer'>Update Task</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateTaskForm