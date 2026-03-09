import { useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon, Calendar } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const MyTasks = () => {
  const { userDashboardData, userTasks, setUserTasks, fetchUserTasks, axios } = useAppContext()
  const user = JSON.parse(localStorage.getItem('user'))

  const toggleInProgress = async (taskId) => {
    try {
      const { data } = await axios.post(`/api/tasks/toggle-in-progress`, { id: taskId })
      if (data.success) {
        toast.success(data.message)
        setUserTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: 'IN_PROGRESS' } : task)))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleCompleted = async (taskId) => {
    try {
      const { data } = await axios.post('/api/tasks/toggle-completed', { id: taskId })
      if (data.success) {
        toast.success(data.message)
        setUserTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: 'COMPLETED' } : task)))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserTasks(user.id)
    }
  }, [user?.id])

  return (
    <div className='flex-1'>
      <h1 className='font-semibold text-3xl text-slate-900 mb-6'>My Tasks</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Total Tasks</p>
            <p className='text-2xl font-semibold text-cyan-600'>{userDashboardData.totalTasks}</p>
          </span>
          <ClockIcon className='text-cyan-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Completed</p>
            <p className='text-2xl font-semibold text-emerald-600'>{userDashboardData.completedTasks}</p>
          </span>
          <CheckCircle className='text-emerald-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>In Progress</p>
            <p className='text-2xl font-semibold text-cyan-600'>{userDashboardData.inProgressTasks}</p>
          </span>
          <AlertCircle className='text-cyan-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Pending</p>
            <p className='text-2xl font-semibold text-amber-600'>{userDashboardData.pendingTasks}</p>
          </span>
          <ClockIcon className='text-amber-600 h-7 w-7' />
        </div>
      </div>
      {userTasks && userTasks.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6'>
          {userTasks.map((task, index) => (
            <div
              key={index}
              className={`panel px-6 py-6 text-slate-800 rounded-2xl space-y-3 ${
                task.priority.toLowerCase() === 'high' && 'border-l-4 border-l-orange-400'
              } ${task.priority.toLowerCase() === 'medium' && 'border-l-4 border-l-amber-400'}`}
            >
              <span className='flex justify-between items-start gap-3'>
                <h3 className='font-semibold text-xl text-slate-900'>{task.title}</h3>
                <p
                  className={`text-xs px-2 py-1 font-semibold rounded-full capitalize ${
                    task.priority.toLowerCase() === 'high' && 'bg-red-100 text-red-800'
                  } ${task.priority.toLowerCase() === 'medium' && 'bg-amber-100 text-amber-800'} ${task.priority.toLowerCase() === 'low' && 'bg-emerald-100 text-emerald-800'}`}
                >
                  {task.priority.toLowerCase()}
                </p>
              </span>
              <p className='text-sm font-medium text-slate-600'>{task.description}</p>
              <p className='text-xs font-medium text-slate-500'>Assigned to {task.user?.fName} {task.user?.lName}</p>
              <div className='flex justify-between items-center'>
                <span className='flex gap-2 items-center'>
                  <Calendar className='h-4 w-4 text-slate-500' />
                  <p className='text-sm font-medium text-slate-600'>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </span>
                <p
                  className={`text-xs px-2 py-1 font-semibold rounded-full capitalize ${
                    task.status.toLowerCase() === 'pending' && 'bg-amber-100 text-amber-800'
                  } ${task.status.toLowerCase() === 'in_progress' && 'bg-cyan-100 text-cyan-800'} ${task.status.toLowerCase() === 'completed' && 'bg-emerald-100 text-emerald-800'}`}
                >
                  {task.status.toLowerCase().replace('_', ' ')}
                </p>
              </div>
              <button
                onClick={() => {
                  const status = task.status.toLowerCase()
                  if (status === 'pending') {
                    toggleInProgress(task.id)
                  } else if (status === 'in_progress') {
                    toggleCompleted(task.id)
                  }
                }}
                className={`w-full px-4 py-2.5 text-sm text-white rounded-xl font-medium cursor-pointer ${
                  task.status.toLowerCase() === 'pending' && 'primary-btn'
                } ${task.status.toLowerCase() === 'in_progress' && 'bg-emerald-600 hover:bg-emerald-700'} ${
                  task.status.toLowerCase() === 'completed' && 'bg-slate-400 cursor-not-allowed'
                }`}
              >
                {task.status.toLowerCase() === 'pending' && 'Start Task'}
                {task.status.toLowerCase() === 'in_progress' && 'Mark Completed'}
                {task.status.toLowerCase() === 'completed' && 'Completed'}
              </button>

              <div className='flex items-center gap-2'>
                <p className='text-xs font-semibold bg-cyan-100/80 text-cyan-700 px-2 py-1 rounded-full'>{task.department?.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='panel rounded-2xl flex items-center justify-center w-full min-h-60 mt-6'>
          <p className='text-slate-500'>No tasks available currently</p>
        </div>
      )}
    </div>
  )
}

export default MyTasks

