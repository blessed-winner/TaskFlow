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

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className='card-vintage p-6 transition-all duration-300'>
      <div className='flex justify-between items-start'>
        <div className='space-y-3'>
          <p className='text-[9px] uppercase tracking-[0.3em] font-sans font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>{title}</p>
          <p className='text-4xl font-sans font-black leading-none' style={{ color: 'var(--color-text)' }}>{value}</p>
        </div>
        <div className='p-2 border' style={{ borderColor: 'var(--color-text)' }}>
          <Icon className='h-4 w-4' style={{ color: 'var(--color-text)' }} />
        </div>
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    const s = status.toLowerCase()
    if (s === 'completed') return 'var(--color-emerald-500)'
    return 'var(--color-text)'
  }

  return (
    <main className='flex-1 pb-6 space-y-6'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={() => setShowForm(false)} />}
      
      <div className='flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 border-b pb-6' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide max-w-full'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>operational hub</p>
          </div>
          <h1 className='text-3xl sm:text-5xl md:text-7xl uppercase mb-2 break-words leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Strategic</span>
            <span className='ml-2 md:ml-4 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Overview.</span>
          </h1>
        </div>
        <div className='shrink-0 w-full md:w-auto'>
          <AddTaskButton onClick={() => setShowForm(true)} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total assignments' value={managerDashboardData.totalTasks} icon={ClipboardList} />
        <StatCard title='verified completion' value={managerDashboardData.completedTasks} icon={TrendingUp} />
        <StatCard title='active operatives' value={managerDashboardData.teamMembers} icon={Users} />
        <StatCard title='overdue protocols' value={managerDashboardData.overDueTasks} icon={AlertCircle} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        <div className='lg:col-span-8 card-vintage p-0 overflow-hidden min-h-[400px]'>
          <div className='p-6 border-b flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Active Chronicle</h2>
              <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>recent throughput</p>
            </div>
          </div>
          
          <div className='p-6'>
            <ul className='space-y-6'>
              {tasks && tasks.filter(Boolean).length > 0 ? (
                tasks
                  .filter(Boolean)
                  .sort((a, b) => new Date(b?.createdAt || b?.dueDate || 0) - new Date(a?.createdAt || a?.dueDate || 0))
                  .slice(0, 5)
                  .map((task, index) => {
                    const status = (task?.status || '').toLowerCase()
                    const statusColor = getStatusColor(status)
                    
                    return (
                      <li key={index} className='flex gap-4 items-start group relative'>
                        <div className='pt-2 flex flex-col items-center gap-2'>
                          <div className='w-2 h-2 rounded-none' style={{ background: statusColor }}></div>
                          <div className='w-[1px] h-full absolute top-6 bg-border opacity-20'></div>
                        </div>
                        <div className='flex-1 border-b pb-4 group-last:border-0' style={{ borderColor: 'var(--color-border)' }}>
                          <div className='flex justify-between items-center mb-1'>
                            <p className='text-[9px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>protocol status</p>
                            <p className='text-[9px] uppercase tracking-[0.2em] font-black' style={{ color: statusColor }}>
                              {status.replace('_', ' ')}
                            </p>
                          </div>
                          <h4 className='text-lg font-sans font-bold leading-relaxed max-w-2xl mt-1' style={{ color: 'var(--color-text)' }}>{task?.title || 'Untitled Protocol'}</h4>
                          <p className='text-[10px] uppercase tracking-widest font-bold opacity-40 mt-2' style={{ color: 'var(--color-text)' }}>
                            {task?.dueDate ? `Verification Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No deadline established'}
                          </p>
                        </div>
                      </li>
                    )
                  })
              ) : (
                <div className='min-h-[300px] flex flex-col items-center justify-center opacity-30 text-center'>
                  <p className='text-2xl font-sans font-bold uppercase tracking-widest mb-2'>Archival Silence</p>
                  <p className='text-[9px] uppercase tracking-widest font-bold'>no active records identified</p>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className='lg:col-span-4 space-y-4'>
          <div className='card-vintage p-6'>
            <div className='border-b pb-4 mb-6 flex justify-between items-end' style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Operative Yield</h2>
                <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>performance metrics</p>
              </div>
              <div className='w-2 h-2 bg-emerald-500 rounded-none mb-2'></div>
            </div>
            
            <div className='space-y-6'>
              {users
                .filter((user) => user.role === 'USER')
                .slice(0, 4)
                .map((user, index) => {
                  const userTasks = userTaskData[user.id] || []
                  const totalTasks = userTasks.length || 0
                  const completedTasks = userTasks.filter((t) => t.status.toLowerCase() === 'completed').length || 0
                  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
                  
                  return (
                    <div key={index} className='space-y-3'>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8 border flex items-center justify-center font-sans font-black text-xs shrink-0' style={{ borderColor: 'var(--color-text)', background: 'var(--color-surface)', color: 'var(--color-text)' }}>
                            {user.fName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className='text-sm font-sans font-bold uppercase tracking-widest' style={{ color: 'var(--color-text)' }}>
                              {`${user.fName} ${user.lName}`}
                            </p>
                            <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1' style={{ color: 'var(--color-text-muted)' }}>
                              {totalTasks} assignments established
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='text-sm font-sans font-black' style={{ color: 'var(--color-text)' }}>{completionRate}%</p>
                        </div>
                      </div>
                      
                      {/* Yield Bar */}
                      <div className='h-px w-full' style={{ background: 'var(--color-border)' }}>
                        <div className='h-full relative overflow-visible' style={{ width: `${completionRate}%`, background: 'var(--color-text)' }}>
                          <div className='absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5' style={{ background: 'var(--color-text)' }}></div>
                        </div>
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
