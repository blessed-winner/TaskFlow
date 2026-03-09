import { Calendar, Flag, User, X } from 'lucide-react'
import { useState } from 'react'
import PrioritySelect from './PrioritySelect'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'

const CreateTaskForm = ({ onClose, onTaskAdded }) => {
  const { axios } = useAppContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeName, setAssigneeName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleCreateTask = async () => {
    const formData = {
      title,
      description,
      assigneeName,
      priority,
      dueDate,
    }

    try {
      const { data } = await axios.post('/api/tasks/add-task', formData)
      if (data.success) {
        toast.success(data.message)
        onTaskAdded(data.task)

        setTitle('')
        setDescription('')
        setAssigneeName('')
        setDueDate('')
        setPriority('Medium')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='inset-0 flex justify-center bg-slate-900/45 items-center fixed z-50 px-4'>
      <form onSubmit={handleSubmit} className='panel max-w-2xl w-full overflow-auto max-h-[85vh] rounded-2xl px-7 py-6 text-slate-800 space-y-4'>
        <div className='flex justify-between py-2 border-b border-cyan-100 mb-1'>
          <h2 className='font-semibold text-2xl text-slate-900'>Create New Task</h2>
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
          <button onClick={onClose} className='secondary-btn px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Cancel
          </button>
          <button onClick={handleCreateTask} className='primary-btn text-white px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTaskForm

