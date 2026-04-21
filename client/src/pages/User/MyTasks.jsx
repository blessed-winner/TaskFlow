import { useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon, Calendar, ArrowRight, ShieldCheck } from 'lucide-react'
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
    if (s === 'in_progress') return 'var(--color-accent)'
    return 'var(--color-text)'
  }

  return (
    <div className='flex-1 space-y-10 pb-12 transition-all duration-500'>
      {/* Header Section */}
      <div className='flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 border-b pb-8' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>operational ledger</p>
          </div>
          <h1 className='text-4xl md:text-7xl uppercase leading-[0.9] break-words'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Assigned</span>
            <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Protocols.</span>
          </h1>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total load' value={userDashboardData.totalTasks} icon={ClockIcon} />
        <StatCard title='verified completion' value={userDashboardData.completedTasks} icon={CheckCircle} />
        <StatCard title='active sessions' value={userDashboardData.inProgressTasks} icon={AlertCircle} />
        <StatCard title='pending cycles' value={userDashboardData.pendingTasks} icon={ClockIcon} />
      </div>

      {/* Tasks List */}
      <div className='card-vintage p-0 overflow-hidden min-h-[400px] fade-in-slide'>
        <div className='p-6 border-b flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <h2 className='text-2xl font-sans font-black uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Execution Queue</h2>
            <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>assigned operational roles</p>
          </div>
          <span className='text-[8px] uppercase font-black opacity-30 tracking-[0.3em]'>System Live</span>
        </div>

        <div className='p-6'>
          {userTasks && userTasks.length > 0 ? (
            <ul className='space-y-8'>
              {userTasks.map((task, index) => {
                const status = task.status.toLowerCase()
                const statusColor = getStatusColor(status)
                
                return (
                  <li key={index} className='flex gap-6 items-start group relative'>
                    {/* Visual Timeline Marker */}
                    <div className='pt-2 flex flex-col items-center gap-2'>
                      <div className='w-2.5 h-2.5 rounded-none shrink-0 transition-transform group-hover:scale-125' style={{ background: statusColor }}></div>
                      <div className='w-px h-full absolute top-8 bg-border opacity-20' style={{ background: 'var(--color-border)' }}></div>
                    </div>

                    <div className='flex-1 border-b pb-6 group-last:border-0' style={{ borderColor: 'var(--color-border)' }}>
                      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4'>
                        <div className='space-y-1.5'>
                          <div className='flex items-center gap-3'>
                            <p className='text-[9px] uppercase tracking-[0.2em] font-black' style={{ color: statusColor }}>
                              {status.replace('_', ' ')}
                            </p>
                            <span className='w-1 h-1 rounded-full opacity-20 bg-current'></span>
                            <p className='text-[9px] uppercase tracking-widest font-bold opacity-40' style={{ color: 'var(--color-text-muted)' }}>
                              P-{task.priority}
                            </p>
                          </div>
                          <h4 className='text-xl font-sans font-black tracking-tight' style={{ color: 'var(--color-text)' }}>
                            {task.title}
                          </h4>
                          <p className='text-sm font-medium opacity-60 leading-relaxed max-w-3xl mt-2' style={{ color: 'var(--color-text)' }}>
                            {task.description}
                          </p>
                        </div>

                        <div className='shrink-0 flex flex-col sm:flex-row items-start lg:items-end gap-3'>
                          <div className='text-right'>
                            <p className='text-[9px] uppercase tracking-widest font-bold opacity-30 leading-none mb-1' style={{ color: 'var(--color-text-muted)' }}>deadline established</p>
                            <p className='text-xs font-sans font-bold whitespace-nowrap' style={{ color: 'var(--color-text)' }}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          
                          {status !== 'completed' ? (
                            <button
                              onClick={() => {
                                if (status === 'pending') toggleInProgress(task.id)
                                else if (status === 'in_progress') toggleCompleted(task.id)
                              }}
                              className='btn-modern-vintage text-[9px] py-2.5 px-6 flex items-center gap-2 group/btn'
                              style={{ 
                                background: status === 'in_progress' ? 'var(--color-text)' : 'transparent',
                                color: status === 'in_progress' ? 'var(--color-background)' : 'var(--color-text)',
                                borderColor: 'var(--color-text)'
                              }}
                            >
                              <span className='font-black uppercase tracking-widest'>
                                {status === 'pending' ? 'Initiate' : 'Archive'}
                              </span>
                              <ArrowRight className='w-3 h-3 transition-transform group-hover/btn:translate-x-1' />
                            </button>
                          ) : (
                            <div className='flex items-center gap-2 px-4 py-2 border border-dashed text-emerald-500' style={{ borderColor: 'var(--color-border)' }}>
                              <CheckCircle className='w-3 h-3' />
                              <span className='text-[9px] font-black uppercase tracking-widest'>Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className='min-h-[300px] flex flex-col items-center justify-center opacity-30 text-center'>
              <p className='text-3xl font-sans font-black uppercase tracking-widest mb-2'>Archival Silence</p>
              <p className='text-[10px] uppercase font-bold tracking-widest'>no active records identified</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


export default MyTasks

