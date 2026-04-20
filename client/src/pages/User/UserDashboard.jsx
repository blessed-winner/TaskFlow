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
    const totalCount = userTasks?.length || 0
    const completedCount = userTasks?.filter((t) => t.status.toLowerCase() === 'completed').length || 0
    const barProgress = totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0
    setProgress(barProgress)
  }, [userTasks])

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
      <div className='flex justify-between items-end gap-4 border-b-2 pb-4' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide'>
          <div className='flex items-center gap-4 mb-2'>
            <span className='ornament w-12'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>operative station</p>
          </div>
          <h1 className='text-5xl font-normal' style={{ color: 'var(--color-text)' }}>Personal Station</h1>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total protocols' value={userDashboardData.totalTasks} icon={ClockIcon} colorClass='text-text' />
        <StatCard title='verified works' value={userDashboardData.completedTasks} icon={CheckCircle} colorClass='text-emerald-500' />
        <StatCard title='active sessions' value={userDashboardData.inProgressTasks} icon={AlertCircle} colorClass='text-accent' />
        <StatCard title='yield rate' value={`${userDashboardData.completionRate}%`} icon={TrendingUp} colorClass='text-text' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        <div className='lg:col-span-8 card-vintage p-0 overflow-hidden'>
          <div className='p-4 border-b-2 flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
            <h2 className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>Protocol Ledger</h2>
            <p className='text-[10px] uppercase tracking-widest font-black opacity-40'>assigned execution tasks</p>
          </div>
          <div className='p-4'>
            <div className='space-y-4'>
              {totalCount > 0 ? (
                totalTasks.map((task, index) => {
                  const status = task.status.toLowerCase()
                  return (
                    <div key={index} className='flex justify-between items-center pb-3 border-b last:border-0' style={{ borderColor: 'var(--color-border)' }}>
                      <div className='space-y-1'>
                        <h4 className='text-lg font-normal' style={{ color: 'var(--color-text)' }}>{task.title}</h4>
                        <p className='text-[9px] uppercase tracking-widest font-black opacity-40'>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
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
                  <p className='text-2xl font-normal'>No Protocols Available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='lg:col-span-4 card-vintage p-4 flex flex-col'>
          <div className='border-b-2 pb-3 mb-4 flex justify-between items-end' style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <h2 className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>Yield</h2>
              <p className='text-[10px] uppercase tracking-widest font-black opacity-40'>cycle progress</p>
            </div>
          </div>
          <div className='flex-1 flex flex-col justify-center items-center py-6'>
            <div className='relative w-32 h-32 flex items-center justify-center rounded-full border-4' style={{ borderColor: 'var(--color-border)' }}>
              <div className='absolute inset-0 rounded-full border-4 transition-all duration-1000' 
                   style={{ 
                     borderColor: 'var(--color-accent)', 
                     clipPath: `inset(${100 - progress}% 0 0 0)`,
                     boxShadow: 'var(--shadow-glow)'
                   }}></div>
              <p className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>{progress}%</p>
            </div>
            <p className='mt-4 text-xs text-center text-text-muted italic leading-relaxed px-4'>
              {totalCount === 0 && 'Waiting for new task schedule...'}
              {totalCount > 0 && progress >= 50 && "Current yield exceeds established thresholds."}
              {totalCount > 0 && progress < 50 && "Production requires additional focus."}
            </p>
          </div>
          <div className='mt-auto pt-4 border-t-2 space-y-2' style={{ borderColor: 'var(--color-border)' }}>
            <div className='flex justify-between items-center opacity-60'>
              <p className='text-[9px] uppercase tracking-widest font-black'>completed protocols</p>
              <p className='text-sm font-normal'>{completedCount}</p>
            </div>
            <div className='flex justify-between items-center opacity-60'>
              <p className='text-[9px] uppercase tracking-widest font-black'>active sessions</p>
              <p className='text-sm font-normal'>{inProgressCount}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserDashboard

