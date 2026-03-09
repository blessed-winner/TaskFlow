import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const TaskTableData = ({ task, fetchTasks, fetchManagerDashboard, onEditTask }) => {
  const { axios } = useAppContext()

  const { title, description, dueDate, user, priority, status } = task

  const deleteTask = async () => {
    const confirm = window.confirm('Are you sure you want to delete this task ?')
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
      toast.error(error)
    }
  }

  return (
    <tr className='border-b border-cyan-100 text-slate-800 hover:bg-cyan-50/60 transition-all'>
      <td className='py-3 px-3 xl:px-5'>
        <div className='space-y-1'>
          <h4 className='font-semibold'>{title}</h4>
          <p className='font-medium text-sm text-slate-500'>{description.length > 40 ? `${description.slice(0, 40)}...` : description}</p>
        </div>
      </td>
      <td className='py-3 px-3 xl:px-5 space-x-2'>
        <h1 className='text-white bg-cyan-500 w-8 h-8 inline-flex items-center justify-center rounded-full font-semibold'>{user.fName.slice(0, 1)}</h1>
        <p className='font-medium inline-block text-slate-700'>{`${user.fName} ${user.lName}`}</p>
      </td>
      <td className='py-3 px-3 xl:px-5 font-light'>
        <span
          className={`px-2.5 py-1 rounded-full font-semibold text-xs capitalize ${
            status.toLowerCase() === 'in_progress' && 'text-cyan-800 bg-cyan-100/70'
          } ${status.toLowerCase() === 'completed' && 'text-emerald-800 bg-emerald-100/70'} ${status.toLowerCase() === 'pending' && 'text-amber-800 bg-amber-100/70'}`}
        >
          {status.toLowerCase().replace('_', ' ')}
        </span>
      </td>
      <td className='py-3 px-3 xl:px-5'>
        <span
          className={`px-2.5 py-1 rounded-full font-semibold text-xs capitalize ${
            priority.toLowerCase() === 'high' && 'text-red-800 bg-red-100/60'
          } ${priority.toLowerCase() === 'medium' && 'text-orange-700 bg-orange-100/60'} ${priority.toLowerCase() === 'low' && 'text-yellow-800 bg-yellow-100/60'}`}
        >
          {priority.toLowerCase()}
        </span>
      </td>
      <td className='py-3 px-3 xl:px-5 font-medium text-slate-600'>{new Date(dueDate).toLocaleDateString()}</td>
      <td className='py-3 px-3 xl:px-5'>
        <div className='flex gap-4 font-semibold text-sm'>
          <span onClick={() => onEditTask(task)} className='text-cyan-500 cursor-pointer hover:text-cyan-700 transition-all'>
            Edit
          </span>
          <span onClick={deleteTask} className='text-red-500 cursor-pointer hover:text-red-700 transition-all'>
            Delete
          </span>
        </div>
      </td>
    </tr>
  )
}

export default TaskTableData

