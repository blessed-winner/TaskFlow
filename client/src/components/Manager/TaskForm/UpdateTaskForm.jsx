import { Calendar, Flag, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import PrioritySelect from './PrioritySelect'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'

const UpdateTaskForm = ({ onClose, onTaskUpdated, task }) => {
  const { axios } = useAppContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeName, setAssigneeName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setAssigneeName(`${task.user?.fName || ''} ${task.user?.lName || ''}`.trim())
      setPriority(task.priority || 'Medium')
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '')
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateTask()
  }

  const handleUpdateTask = async () => {
    if (!task?.id) {
      toast.error('Task ID is missing')
      return
    }

    const formData = {
      title,
      description,
      assigneeName,
      priority,
      dueDate,
    }

    try {
      const { data } = await axios.put(`/api/tasks/update/${task.id}`, formData)
      if (data.success) {
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
    <div className='inset-0 flex justify-center bg-slate-900/45 items-center fixed z-50 px-4'>
      <form onSubmit={handleSubmit} className='panel max-w-2xl w-full overflow-auto max-h-[85vh] rounded-2xl px-7 py-6 text-slate-800 space-y-4'>
        <div className='flex justify-between py-2 border-b border-cyan-100 mb-1'>
          <h2 className='font-semibold text-2xl text-slate-900'>Update Task</h2>
          <X onClick={onClose} className='text-slate-500 cursor-pointer' />
        </div>
        <div>
          <h5 className='font-semibold text-sm mb-1.5'>Task Title *</h5>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter task title' className='form-input' />
        </div>
        <div>
          <h5 className='font-semibold text-sm mb-1.5'>Description *</h5>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Describe task in detail' className='form-input h-28 resize-none'></textarea>
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <span className='flex items-center gap-1 mb-1.5'>
              <User className='w-4' />
              <h5 className='font-semibold text-sm'>Assign To *</h5>
            </span>
            <input type='text' value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} placeholder='Select team member' className='form-input' />
          </div>
          <div>
            <span className='flex items-center gap-1 mb-1.5'>
              <Flag className='w-4' />
              <h5 className='font-semibold text-sm'>Priority *</h5>
            </span>
            <PrioritySelect value={priority} onChange={setPriority} />
          </div>
        </div>
        <div>
          <span className='flex items-center gap-1 mb-1.5'>
            <Calendar className='w-4' />
            <h5 className='font-semibold text-sm'>Due Date *</h5>
          </span>
          <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='form-input' />
        </div>
        <div className='w-full flex justify-end gap-3 pt-4 border-t border-cyan-100 mt-2'>
          <button type='button' onClick={onClose} className='secondary-btn px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Cancel
          </button>
          <button type='submit' className='primary-btn text-white px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Update Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateTaskForm

