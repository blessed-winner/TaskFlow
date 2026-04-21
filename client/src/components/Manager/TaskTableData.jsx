import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const TaskTableData = ({ task, fetchTasks, fetchManagerDashboard, onEditTask }) => {
  const { axios } = useAppContext()

  const { title, description, dueDate, user, priority, status } = task

  const deleteTask = async () => {
    const confirm = window.confirm('Are you sure you want to delete this protocol record?')
    if (!confirm) return
    try {
      const { data } = await axios.delete(`/api/tasks/delete/${task.id}`)
      if (data.success) {
        toast.success(data.message)
        await fetchTasks()
        await fetchManagerDashboard()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getStatusColor = (s) => {
    const statusLower = s.toLowerCase()
    if (statusLower === 'completed') return 'var(--color-emerald-500)'
    if (statusLower === 'in_progress') return 'var(--color-accent)'
    if (statusLower === 'pending') return '#f59e0b' // fallback amber
    return 'var(--color-text-muted)'
  }

  const getPriorityColor = (p) => {
    const pLower = p.toLowerCase()
    if (pLower === 'high') return '#ef4444' // red
    if (pLower === 'medium') return '#f97316' // orange
    return '#84cc16' // lime/yellow
  }

  return (
    <tr className='group border-b border-dashed transition-all hover:bg-black/5' style={{ borderColor: 'var(--color-border)' }}>
      <td className='py-5 px-5'>
        <div className='flex flex-col'>
          <h4 className='text-sm font-sans font-bold uppercase tracking-wider' style={{ color: 'var(--color-text)' }}>{title}</h4>
          <p className='text-[10px] uppercase tracking-widest font-medium opacity-40 mt-1' style={{ color: 'var(--color-text)' }}>
            {description.length > 50 ? `${description.slice(0, 50)}...` : description}
          </p>
        </div>
      </td>
      
      <td className='py-5 px-5'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 border flex items-center justify-center font-sans font-black text-[10px] uppercase shrink-0'
               style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)', borderColor: 'var(--color-border)' }}>
            {user.fName.slice(0, 1)}
          </div>
          <p className='text-[10px] uppercase tracking-widest font-bold' style={{ color: 'var(--color-text)' }}>{`${user.fName} ${user.lName}`}</p>
        </div>
      </td>

      <td className='py-5 px-5'>
        <span className='text-[9px] uppercase tracking-[0.2em] font-black px-2 py-0.5 border'
              style={{ 
                color: getStatusColor(status), 
                borderColor: 'var(--color-border)',
                background: 'var(--color-background)'
              }}>
          {status.toLowerCase().replace('_', ' ')}
        </span>
      </td>

      <td className='py-5 px-5'>
        <div className='flex items-center gap-2'>
           <div className='w-1.5 h-1.5' style={{ background: getPriorityColor(priority) }}></div>
           <span className='text-[10px] uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text)' }}>
             {priority.toLowerCase()}
           </span>
        </div>
      </td>

      <td className='py-5 px-5 text-[10px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text)' }}>
        {new Date(dueDate).toLocaleDateString()}
      </td>

      <td className='py-5 px-5 text-right'>
        <div className='flex justify-end gap-6'>
          <button
            className='text-[10px] uppercase tracking-widest font-black hover:text-accent transition-colors opacity-40 hover:opacity-100'
            onClick={() => onEditTask(task)}
          >
            edit
          </button>
          <button 
            className='text-[10px] uppercase tracking-widest font-black text-red-500/60 hover:text-red-500 transition-colors' 
            onClick={deleteTask}
          >
            erase
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TaskTableData
