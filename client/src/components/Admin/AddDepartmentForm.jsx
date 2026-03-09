import { X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const AddDepartmentForm = ({ onClose, onDeptAdd }) => {
  const [departmentName, setDepartmentName] = useState('')
  const { axios } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddDepartment = async () => {
    const formData = {
      name: departmentName,
    }
    try {
      const { data } = await axios.post('/api/departments/add-department', formData)
      data.success ? toast.success(data.message) : toast.error(data.message)
      setDepartmentName('')
      onDeptAdd(data.dept)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='inset-0 flex justify-center bg-slate-900/45 items-center fixed z-50 px-4'>
      <form onSubmit={handleSubmit} className='panel max-w-xl w-full rounded-2xl px-7 py-6 text-slate-800 space-y-4'>
        <div className='flex justify-between py-2 border-b border-cyan-100'>
          <h2 className='font-semibold text-2xl text-slate-900'>Add New Department</h2>
          <X onClick={onClose} className='text-slate-500 cursor-pointer' />
        </div>
        <div>
          <h5 className='font-semibold text-sm mb-2'>Department Name *</h5>
          <input type='text' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} placeholder='Enter Department Name' className='form-input' />
        </div>
        <div className='w-full flex justify-end gap-3 pt-4 border-t border-cyan-100'>
          <button onClick={onClose} className='secondary-btn px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Cancel
          </button>
          <button onClick={handleAddDepartment} className='primary-btn text-white px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Add Department
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDepartmentForm

