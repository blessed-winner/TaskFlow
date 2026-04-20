import { Calendar, Flag, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
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

  return ReactDOM.createPortal(
    <div className='inset-0 flex justify-center items-center fixed z-[200] px-4' style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
      <form onSubmit={handleSubmit} className='card-vintage max-w-2xl w-full overflow-auto max-h-[90vh] space-y-10 relative' style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
        <button 
          type="button"
          onClick={onClose} 
          className='absolute top-6 right-6 p-2 transition-colors hover:text-accent'
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X className='w-5 h-5' />
        </button>

        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <span className='ornament w-8'></span>
            <p className='text-[10px] uppercase tracking-[0.3em] font-black' style={{ color: 'var(--color-accent)' }}>formal update</p>
          </div>
          <h2 className='text-4xl italic font-normal' style={{ color: 'var(--color-text)' }}>Update Task</h2>
          <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>Modify the work item instructions below.</p>
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Task Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter task title' className='input-vintage w-full' />
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Describe task in detail' className='input-vintage w-full h-28 resize-none' />
        </div>

        <div className='grid md:grid-cols-2 gap-10'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <User className='w-3 h-3 opacity-40' />
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Assign To</label>
            </div>
            <input type='text' value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} placeholder='Select team member' className='input-vintage w-full' />
          </div>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Flag className='w-3 h-3 opacity-40' />
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Priority Level</label>
            </div>
            <PrioritySelect value={priority} onChange={setPriority} />
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-3 h-3 opacity-40' />
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Deadline</label>
          </div>
          <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='input-vintage w-full' />
        </div>

        <div className='flex justify-end gap-8 pt-8 border-t' style={{ borderColor: 'var(--color-border)' }}>
          <button type="button" onClick={onClose} className='text-xs uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity'>
            Abort
          </button>
          <button type='submit' className='btn-modern-vintage btn-solid'>
            confirm changes
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}

export default UpdateTaskForm
