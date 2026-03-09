import { useEffect, useState } from 'react'
import { AlertCircle, ClipboardList, TrendingUp, Users } from 'lucide-react'
import AddTaskButton from '../../components/Manager/AddTaskButton'
import CreateTaskForm from '../../components/Manager/TaskForm/CreateTaskForm'
import { useAppContext } from '../../context/AppContext'

const ManagerDashboard = () => {
  const { tasks, setTasks, managerDashboardData, users, axios } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [userTaskData, setUserTaskData] = useState({})

  useEffect(() => {
    const fetchAllUserTasks = async () => {
      const userRoleUsers = users.filter((user) => user.role === 'USER')
      const taskData = {}

      const promises = userRoleUsers.map(async (user) => {
        try {
          const { data } = await axios.get(`/api/tasks/user/${user.id}`)
          if (data.success) {
            return { userId: user.id, tasks: data.tasks }
          }
          return { userId: user.id, tasks: [] }
        } catch (error) {
          return { userId: user.id, tasks: [] }
        }
      })

      const results = await Promise.all(promises)
      results.forEach(({ userId, tasks }) => {
        taskData[userId] = tasks
      })

      setUserTaskData(taskData)
    }

    if (users.length > 0) {
      fetchAllUserTasks()
    }
  }, [users, axios])

  const handleTaskAdd = (newTask) => {
    if (!newTask) return
    setTasks((prev) => [newTask, ...prev.filter(Boolean)])
  }

  return (
    <div className='flex-1'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={() => setShowForm(false)} />}
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div>
          <h1 className='font-semibold text-3xl text-slate-900'>Manager Dashboard</h1>
          <p className='text-sm text-slate-600 mt-1'>Track execution quality and team performance in real time.</p>
        </div>
        <AddTaskButton onClick={() => setShowForm(true)} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Total Tasks</p>
            <p className='text-2xl font-semibold text-cyan-600'>{managerDashboardData.totalTasks}</p>
          </span>
          <ClipboardList className='text-cyan-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Completed</p>
            <p className='text-2xl font-semibold text-emerald-600'>{managerDashboardData.completedTasks}</p>
          </span>
          <TrendingUp className='text-emerald-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Team Members</p>
            <p className='text-2xl font-semibold text-indigo-600'>{managerDashboardData.teamMembers}</p>
          </span>
          <Users className='text-indigo-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Overdue Tasks</p>
            <p className='text-2xl font-semibold text-red-600'>{managerDashboardData.overDueTasks}</p>
          </span>
          <AlertCircle className='text-red-600 h-7 w-7' />
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-6 gap-5'>
        <div className='panel p-6 rounded-2xl min-h-[350px] overflow-auto'>
          <h2 className='font-semibold text-slate-900 text-lg mb-5'>Recent Tasks</h2>
          <div className='flex flex-col gap-3'>
            {tasks && tasks.filter(Boolean).length > 0 ? (
              tasks
                .filter(Boolean)
                .sort((a, b) => new Date(b?.createdAt || b?.dueDate || 0) - new Date(a?.createdAt || a?.dueDate || 0))
                .slice(0, 4)
                .map((task, index) => {
                  const status = (task?.status || '').toLowerCase()
                  return (
                    <div key={index} className='soft-panel px-4 py-3 rounded-xl flex justify-between items-center gap-3'>
                      <span className='space-y-1'>
                        <h4 className='font-semibold text-slate-900'>{task?.title || 'Untitled task'}</h4>
                        <p className='text-sm font-light text-slate-600'>{task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
                      </span>
                      <p
                        className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
                          status === 'in_progress' && 'text-cyan-700 bg-cyan-100/70'
                        } ${status === 'pending' && 'text-orange-700 bg-orange-100/70'} ${status === 'completed' && 'text-green-700 bg-green-100/70'}`}
                      >
                        {status || 'unknown'}
                      </p>
                    </div>
                  )
                })
            ) : (
              <div className='w-full min-h-50 flex items-center justify-center'>
                <h3 className='font-medium text-lg text-emerald-600'>No Tasks Found</h3>
              </div>
            )}
          </div>
        </div>
        <div className='panel p-6 rounded-2xl text-sm min-h-[350px] overflow-auto'>
          <h2 className='font-semibold text-slate-900 text-lg mb-5'>Team Performance</h2>

          {users
            .filter((user) => user.role === 'USER')
            .map((user, index) => {
              const userTasks = userTaskData[user.id] || []
              const totalTasks = userTasks.length || 0
              const completedTasks = userTasks.filter((t) => t.status.toLowerCase() === 'completed').length || 0
              const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
              return (
                <div key={index} className='flex justify-between mb-4 soft-panel px-3 py-2.5 rounded-xl'>
                  <p className='font-semibold text-slate-800'>{`${user.fName} ${user.lName}`}</p>
                  <div className='space-y-1 text-right'>
                    <p className='text-xs font-semibold'>{completionRate}%</p>
                    <p className='font-light text-xs text-slate-500'>{totalTasks} tasks</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard

