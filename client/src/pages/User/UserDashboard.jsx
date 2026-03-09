import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

const UserDashboard = () => {
  const { userDashboardData, userTasks, fetchUserTasks } = useAppContext()
  const user = JSON.parse(localStorage.getItem('user'))
  const [progress, setProgress] = useState(null)

  const completedTasks = userTasks?.filter((task) => task.status.toLowerCase() === 'completed') || []
  const completedCount = completedTasks.length || 0
  const totalTasks = userTasks || []
  const totalCount = totalTasks.length || 0
  const inProgressTasks = userTasks?.filter((task) => task.status.toLowerCase() === 'in_progress') || []
  const inProgressCount = inProgressTasks.length || 0
  const pendingTasks = userTasks?.filter((task) => task.status.toLowerCase() === 'pending') || []
  const pendingCount = pendingTasks.length || 0

  useEffect(() => {
    if (user?.id) {
      fetchUserTasks(user.id)
    }
  }, [user?.id])

  useEffect(() => {
    const totalCount = userTasks?.length || 0
    const completedCount = userTasks?.filter((t) => t.status.toLowerCase() === 'completed').length || 0
    const barProgress = totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0
    setProgress(barProgress)
  }, [userTasks])

  return (
    <div className='flex-1'>
      <h1 className='font-semibold text-3xl text-slate-900 mb-6'>My Dashboard</h1>
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
            <p className='text-sm font-semibold text-slate-600'>Completion Rate</p>
            <p className='text-2xl font-semibold text-indigo-600'>{userDashboardData.completionRate}%</p>
          </span>
          <div className='h-8 w-8 bg-indigo-600 flex items-center justify-center rounded-full'>
            <span className='text-white text-sm font-bold'>%</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-5'>
        <div className='panel p-6 rounded-2xl'>
          <h2 className='font-semibold text-slate-900 text-lg mb-5'>Recent Tasks</h2>
          <div className='flex flex-col gap-3'>
            {totalCount > 0 ? (
              totalTasks.map((task, index) => (
                <div key={index} className='soft-panel px-4 py-3 rounded-xl flex justify-between items-center'>
                  <span className='space-y-1'>
                    <h4 className='font-semibold text-slate-900'>{task.title}</h4>
                    <p className='text-sm font-medium text-slate-500'>{new Date(task.dueDate).toLocaleDateString()}</p>
                  </span>
                  <p
                    className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
                      task.status.toLowerCase() === 'in_progress' && 'text-cyan-700 bg-cyan-100/70'
                    } ${task.status.toLowerCase() === 'pending' && 'text-orange-700 bg-orange-100/70'} ${task.status.toLowerCase() === 'completed' && 'text-green-700 bg-green-100/70'}`}
                  >
                    {task.status.toLowerCase().replace('_', ' ')}
                  </p>
                </div>
              ))
            ) : (
              <div className='w-full min-h-50 flex items-center justify-center'>
                <h3 className='font-medium text-lg text-emerald-600'>No Tasks Available</h3>
              </div>
            )}
          </div>
        </div>
        <div className='panel p-6 rounded-2xl text-sm'>
          <h2 className='font-semibold text-slate-900 text-lg mb-5'>Today's Progress</h2>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h4 className='font-semibold text-slate-800'>Tasks Completed Today</h4>
              <p className='font-semibold text-2xl text-emerald-600'>{completedCount > 0 ? completedCount : 0}</p>
            </div>
            <div className='w-full bg-slate-300 rounded-full h-2'>
              <div className='bg-emerald-600 h-2 rounded-full' style={{ width: `${progress}%` }}></div>
            </div>
            <p className='text-slate-600'>
              {user?.tasks?.length === undefined && 'Waiting for new task schedule...'}
              {user?.tasks?.length > 0 && progress >= 50 && "Great job, you're ahead of schedule."}
              {user?.tasks?.length > 0 && progress < 50 && "You're behind schedule. Push through your current tasks."}
            </p>
            <div className='space-y-2'>
              <div className='flex gap-2 items-center'>
                <div className='bg-emerald-600 rounded-full h-3 w-3'></div>
                <p className='font-medium text-sm text-slate-600'>Completed: {completedCount > 0 ? completedTasks[0].title : 'No task recorded'}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='bg-cyan-600 rounded-full h-3 w-3'></div>
                <p className='font-medium text-sm text-slate-600'>In progress: {inProgressCount > 0 ? inProgressTasks[0].title : 'No task recorded'}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='bg-orange-600 rounded-full h-3 w-3'></div>
                <p className='font-medium text-sm text-slate-600'>Pending: {pendingCount > 0 ? pendingTasks[0].title : 'No task recorded'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

