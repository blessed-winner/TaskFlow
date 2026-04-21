import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon, TrendingUp } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

const UserDashboard = () => {
  const { userDashboardData, userTasks, fetchUserTasks } = useAppContext()
  const user = JSON.parse(localStorage.getItem('user'))
  const [progress, setProgress] = useState(0)

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
    const totalTasksCount = userTasks?.length || 0
    const completedTasksCount = userTasks?.filter((t) => t.status.toLowerCase() === 'completed').length || 0
    const barProgress = totalTasksCount > 0 ? Math.floor((completedTasksCount / totalTasksCount) * 100) : 0
    setProgress(barProgress)
  }, [userTasks])

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
    <main className='flex-1 pb-6 space-y-6'>
      
      <div className='flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 border-b pb-6' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide max-w-full'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>operative station</p>
          </div>
          <h1 className='text-3xl sm:text-5xl md:text-7xl uppercase mb-2 break-words leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Personal</span>
            <span className='ml-2 md:ml-4 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Station.</span>
          </h1>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total protocols' value={userDashboardData.totalTasks} icon={ClockIcon} />
        <StatCard title='verified works' value={userDashboardData.completedTasks} icon={CheckCircle} />
        <StatCard title='active sessions' value={userDashboardData.inProgressTasks} icon={AlertCircle} />
        <StatCard title='yield rate' value={`${userDashboardData.completionRate}%`} icon={TrendingUp} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        <div className='lg:col-span-8 card-vintage p-0 overflow-hidden min-h-[400px]'>
          <div className='p-6 border-b flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Protocol Ledger</h2>
              <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>assigned execution tasks</p>
            </div>
          </div>
          
          <div className='p-6'>
            <ul className='space-y-6'>
              {totalCount > 0 ? (
                totalTasks.map((task, index) => {
                  const status = task.status.toLowerCase()
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
                        <h4 className='text-lg font-sans font-bold leading-relaxed max-w-2xl mt-1' style={{ color: 'var(--color-text)' }}>{task.title}</h4>
                        <p className='text-[10px] uppercase tracking-widest font-bold opacity-40 mt-2' style={{ color: 'var(--color-text)' }}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  )
                })
              ) : (
                <div className='min-h-[300px] flex flex-col items-center justify-center opacity-30 text-center'>
                  <p className='text-2xl font-sans font-bold uppercase tracking-widest mb-2'>Archival Silence</p>
                  <p className='text-[9px] uppercase tracking-widest font-bold'>no assignments identified</p>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className='lg:col-span-4 space-y-4'>
          <div className='card-vintage p-6'>
            <div className='border-b pb-4 mb-6 flex justify-between items-end' style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Yield</h2>
                <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>cycle progress</p>
              </div>
              <div className='w-2 h-2 bg-emerald-500 rounded-none mb-2'></div>
            </div>
            
            <div className='py-6 flex flex-col items-center justify-center'>
              <div className='relative w-32 h-32 flex items-center justify-center rounded-none border' style={{ borderColor: 'var(--color-border)' }}>
                <div className='absolute bottom-0 left-0 right-0 transition-all duration-1000' 
                     style={{ 
                       height: `${progress}%`, 
                       background: 'var(--color-accent)',
                       opacity: 0.2
                     }}></div>
                <p className='text-4xl font-sans font-black' style={{ color: 'var(--color-text)' }}>{progress}%</p>
              </div>
              <p className='mt-6 text-[10px] uppercase tracking-widest text-center font-bold opacity-60 leading-relaxed px-4' style={{ color: 'var(--color-text)' }}>
                {totalCount === 0 && 'Waiting for new task schedule...'}
                {totalCount > 0 && progress >= 50 && "Current yield exceeds established thresholds."}
                {totalCount > 0 && progress < 50 && "Production requires additional focus."}
              </p>
            </div>

            <div className='mt-6 pt-6 border-t space-y-3' style={{ borderColor: 'var(--color-border)' }}>
              <div className='flex justify-between items-center'>
                <p className='text-[9px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>completed protocols</p>
                <p className='text-sm font-sans font-bold' style={{ color: 'var(--color-text)' }}>{completedCount}</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-[9px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>active sessions</p>
                <p className='text-sm font-sans font-bold' style={{ color: 'var(--color-text)' }}>{inProgressCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserDashboard
