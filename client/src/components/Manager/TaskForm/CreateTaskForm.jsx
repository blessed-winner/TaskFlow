import { Calendar, Flag, User, X } from 'lucide-react'
import { useState } from 'react'
import PrioritySelect from './PrioritySelect'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'
import ReactDOM from 'react-dom'

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
    if (!title || !description || !assigneeName || !dueDate) {
      toast.error('Required parameters missing')
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
      const { data } = await axios.post('/api/tasks/add-task', formData)
      if (data.success) {
        toast.success(data.message)
        onTaskAdded(data.task)
        onClose()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return ReactDOM.createPortal(
    <div className='inset-0 flex justify-center bg-black/70 items-center fixed z-[999] px-4 backdrop-blur-md'>
      <div className='card-vintage max-w-2xl w-full overflow-auto max-h-[90vh] fade-in-slide relative' style={{ background: 'var(--color-surface)', border: '1px solid var(--color-text)' }}>
        <div className='flex justify-between items-center py-6 border-b' style={{ borderColor: 'var(--color-border)', padding: '1.5rem 2rem' }}>
          <div>
            <p className='text-[10px] uppercase font-sans font-black tracking-[0.4em] mb-1' style={{ color: 'var(--color-accent)' }}>operational entry</p>
            <h2 className='text-3xl font-sans font-black uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Establish Protocol</h2>
          </div>
          <button onClick={onClose} className='p-2 hover:bg-black/5 transition-colors cursor-pointer border' style={{ borderColor: 'var(--color-border)' }}>
            <X className='h-4 w-4' style={{ color: 'var(--color-text)' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-8 space-y-8'>
          <div className='space-y-2'>
            <label className='text-[10px] uppercase font-sans font-black tracking-widest opacity-60' style={{ color: 'var(--color-text)' }}>Protocol Title</label>
            <input 
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder='Identifier for the operative sequence...' 
              className='w-full input-vintage' 
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] uppercase font-sans font-black tracking-widest opacity-60' style={{ color: 'var(--color-text)' }}>Objective Parameters</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder='Detailed execution instructions...' 
              className='w-full input-vintage h-32 resize-none'
            ></textarea>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <User className='w-3 h-3 opacity-40' />
                <label className='text-[10px] uppercase font-sans font-black tracking-widest opacity-60' style={{ color: 'var(--color-text)' }}>Assigned Operative</label>
              </div>
              <input 
                type='text' 
                value={assigneeName} 
                onChange={(e) => setAssigneeName(e.target.value)} 
                placeholder='Identify personnel...' 
                className='w-full input-vintage' 
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Flag className='w-3 h-3 opacity-40' />
                <label className='text-[10px] uppercase font-sans font-black tracking-widest opacity-60' style={{ color: 'var(--color-text)' }}>Priority Level</label>
              </div>
              <PrioritySelect value={priority} onChange={setPriority} />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Calendar className='w-3 h-3 opacity-40' />
              <label className='text-[10px] uppercase font-sans font-black tracking-widest opacity-60' style={{ color: 'var(--color-text)' }}>Verification Deadline</label>
            </div>
            <input 
              type='date' 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              className='w-full input-vintage' 
              style={{ colorScheme: 'light' }}
            />
          </div>

          <div className='flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t' style={{ borderColor: 'var(--color-border)' }}>
            <button 
              type='button'
              onClick={onClose} 
              className='btn-modern-vintage px-8 border'
              style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            >
              Abeyance
            </button>
            <button 
              type='button'
              onClick={handleCreateTask} 
              className='btn-modern-vintage px-8'
              style={{ background: 'var(--color-text)', color: 'var(--color-background)' }}
            >
              Establish Protocol
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default CreateTaskForm

