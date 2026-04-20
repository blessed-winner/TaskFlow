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

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className='card-vintage p-4 transition-all duration-300 hover:shadow-glow'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-[9px] uppercase tracking-[0.3em] font-black opacity-40 mb-1'>{title}</p>
          <p className={`text-2xl font-normal ${colorClass}`}>{value}</p>
        </div>
        <Icon className={`h-6 w-6 opacity-20 ${colorClass}`} />
      </div>
    </div>
  )

  return (
    <main className='flex-1 pb-6 space-y-6'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={() => setShowForm(false)} />}
      
      <div className='flex justify-between items-end gap-4 border-b-2 pb-4' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide'>
          <div className='flex items-center gap-4 mb-2'>
            <span className='ornament w-12'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>operational hub</p>
          </div>
          <h1 className='text-5xl font-normal' style={{ color: 'var(--color-text)' }}>Strategic Overview</h1>
        </div>
        <AddTaskButton onClick={() => setShowForm(true)} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total assignments' value={managerDashboardData.totalTasks} icon={ClipboardList} colorClass='text-text' />
        <StatCard title='verified completion' value={managerDashboardData.completedTasks} icon={TrendingUp} colorClass='text-emerald-500' />
        <StatCard title='active operatives' value={managerDashboardData.teamMembers} icon={Users} colorClass='text-text' />
        <StatCard title='overdue protocols' value={managerDashboardData.overDueTasks} icon={AlertCircle} colorClass='text-red-500' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        <div className='lg:col-span-7 card-vintage p-0 overflow-hidden'>
          <div className='p-4 border-b-2 flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
            <h2 className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>Active Chronicle</h2>
            <p className='text-[10px] uppercase tracking-widest font-black opacity-40'>recent throughput</p>
          </div>
          <div className='p-4'>
            <div className='space-y-4'>
              {tasks && tasks.filter(Boolean).length > 0 ? (
                tasks
                  .filter(Boolean)
                  .sort((a, b) => new Date(b?.createdAt || b?.dueDate || 0) - new Date(a?.createdAt || a?.dueDate || 0))
                  .slice(0, 5)
                  .map((task, index) => {
                    const status = (task?.status || '').toLowerCase()
                    return (
                      <div key={index} className='flex justify-between items-center pb-3 border-b last:border-0' style={{ borderColor: 'var(--color-border)' }}>
                        <div className='space-y-1'>
                          <h4 className='text-lg font-normal' style={{ color: 'var(--color-text)' }}>{task?.title || 'Untitled Protocol'}</h4>
                          <p className='text-[9px] uppercase tracking-widest font-black opacity-40'>{task?.dueDate ? `Verification Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No deadline established'}</p>
                        </div>
                        <span className='text-[9px] uppercase tracking-[0.2em] font-black px-2 py-1 border'
                              style={{ 
                                color: status === 'completed' ? 'var(--color-emerald-500)' : 'var(--color-text)', 
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-background)'
                              }}>
                          {status.replace('_', ' ')}
                        </span>
                      </div>
                    )
                  })
              ) : (
                <div className='min-h-[200px] flex flex-col items-center justify-center opacity-20'>
                  <p className='text-2xl font-normal'>No Active Records</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='lg:col-span-5 card-vintage p-0 overflow-hidden'>
          <div className='p-4 border-b-2' style={{ borderColor: 'var(--color-border)' }}>
            <h2 className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>Operative Yield</h2>
            <p className='text-[10px] uppercase tracking-widest font-black opacity-40'>performance metrics</p>
          </div>
          <div className='p-4'>
            <div className='space-y-4'>
              {users
                .filter((user) => user.role === 'USER')
                .map((user, index) => {
                  const userTasks = userTaskData[user.id] || []
                  const totalTasks = userTasks.length || 0
                  const completedTasks = userTasks.filter((t) => t.status.toLowerCase() === 'completed').length || 0
                  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
                  return (
                    <div key={index} className='space-y-2'>
                      <div className='flex justify-between items-end'>
                        <div>
                          <p className='text-sm font-normal' style={{ color: 'var(--color-text)' }}>{`${user.fName} ${user.lName}`}</p>
                          <p className='text-[9px] uppercase tracking-widest font-black opacity-40'>{totalTasks} assignments established</p>
                        </div>
                        <p className='text-lg font-normal' style={{ color: 'var(--color-accent)' }}>{completionRate}%</p>
                      </div>
                      <div className='h-1 w-full bg-border/20 rounded-full overflow-hidden'>
                        <div className='h-full bg-accent transition-all duration-500' style={{ width: `${completionRate}%`, boxShadow: 'var(--shadow-glow)' }}></div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ManagerDashboard
