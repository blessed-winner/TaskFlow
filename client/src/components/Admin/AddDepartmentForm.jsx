import { X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const AddDepartmentForm = ({onClose,onDeptAdd}) => {

    const [departmentName,setDepartmentName] = useState('')
    const { axios } = useAppContext()

    const handleSubmit = (e) => {
       e.preventDefault()
    }
    const handleAddDepartment = async () => {
      const formData = {
        name:departmentName
      }
      try {
        const{ data } = await axios.post("/api/departments/add-department",formData)
        data.success ? toast.success(data.message) : toast.error(data.message)
        setDepartmentName("")
        onDeptAdd(data.dept)
        
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
      <div className='inset-0 flex justify-center bg-black/40 items-center fixed z-50'>
        <form onSubmit={handleSubmit} className='bg-white  max-w-2xl w-full overflow-auto h-3/5 rounded-lg shadow-md px-7 py-6 text-gray-800 space-y-3'>
          <div className='flex justify-between py-4 border-b border-gray-300 mb-8'>
          <h2 className='font-medium text-2xl'>Add New Department</h2>
          <X onClick={onClose} className='font-light text-gray-500 cursor-pointer'/>
         </div>
            <div>
               <h5 className='font-medium text-sm mb-3'>Department Name *</h5>
             <input type="text" value={departmentName} onChange={(e)=>setDepartmentName(e.target.value)} placeholder='Enter Department Name' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'/>
            </div>
        <div className='w-full flex justify-end gap-3 py-6 border-t border-gray-300 mt-10'>
              <button onClick={onClose} className='border px-3.5 py-2.5 rounded-md border-gray-300 text-gray-500 font-light cursor-pointer'>Cancel</button>
              <button onClick={handleAddDepartment} className='bg-blue-600 text-white font-light px-3.5 py-2.5 rounded-md hover:bg-blue-700 transition-all cursor-pointer'>Add Department</button>
            </div>
        </form>
    </div>
  )
}

export default AddDepartmentForm