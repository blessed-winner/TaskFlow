import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const TeamOverview = () => {
  const { users } = useAppContext()
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (users.length > 0) {
      setUserData(users.filter((u) => u.role === 'USER'))
      setLoading(false)
    }
  }, [users])

  if (loading) {
    return (
      <div className='space-y-8'>
        <div className='pb-6 border-b' style={{ borderColor: 'var(--color-border)' }}>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>personnel</p>
          </div>
          <h1 className='text-3xl sm:text-5xl uppercase mb-2 leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Team</span>
            <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Overview.</span>
          </h1>
        </div>
        <p className='text-[10px] uppercase tracking-widest opacity-40 font-sans' style={{ color: 'var(--color-text)' }}>
          Retrieving operative data...
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-8'>

      {/* ── Header ── */}
      <div className='pb-6 border-b' style={{ borderColor: 'var(--color-border)' }}>
        <div className='flex items-center gap-4 mb-4'>
          <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
          <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>personnel</p>
        </div>
        <h1 className='text-3xl sm:text-5xl uppercase mb-2 leading-[0.9]'>
          <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Team</span>
          <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Overview.</span>
        </h1>
      </div>

      {/* ── Operative Cards ── */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {userData.map((user, index) => {
          const totalTasks     = user.tasks?.length || 0
          const completedTasks = user.tasks?.filter((t) => t.status === 'COMPLETED').length || 0
          const pendingTasks   = user.tasks?.filter((t) => t.status === 'PENDING').length || 0
          const progress       = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0

          return (
            <div key={index} className='border' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              {/* Card header with avatar */}
              <div className='flex items-center gap-4 px-5 py-4 border-b' style={{ borderColor: 'var(--color-border)' }}>
                <div className='w-10 h-10 border flex items-center justify-center font-sans font-black text-sm uppercase flex-shrink-0'
                     style={{ background: 'var(--color-text)', color: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                  {user.fName?.slice(0, 1) || 'U'}
                </div>
                <div className='min-w-0'>
                  <h4 className='font-sans font-bold text-sm uppercase tracking-wider truncate' style={{ color: 'var(--color-text)' }}>
                    {user.fName} {user.lName}
                  </h4>
                  <p className='text-[9px] uppercase tracking-widest opacity-50 font-sans mt-0.5' style={{ color: 'var(--color-text)' }}>
                    {user.department?.name || 'Unassigned'}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className='divide-y' style={{ borderColor: 'var(--color-border)' }}>
                {[
                  { label: 'Total Tasks', value: totalTasks },
                  { label: 'Completed',   value: completedTasks },
                  { label: 'Pending',     value: pendingTasks },
                ].map(({ label, value }) => (
                  <div key={label} className='flex justify-between items-center px-5 py-2.5'>
                    <span className='text-[9px] uppercase tracking-widest font-sans opacity-50' style={{ color: 'var(--color-text)' }}>{label}</span>
                    <span className='font-sans font-bold text-sm' style={{ color: 'var(--color-text)' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className='px-5 py-4 border-t' style={{ borderColor: 'var(--color-border)' }}>
                <div className='flex justify-between mb-2'>
                  <span className='text-[8px] uppercase tracking-widest font-sans opacity-40' style={{ color: 'var(--color-text)' }}>Progress</span>
                  <span className='text-[8px] uppercase tracking-widest font-sans font-bold' style={{ color: 'var(--color-text)' }}>{progress}%</span>
                </div>
                <div className='w-full h-px' style={{ background: 'var(--color-border)' }}>
                  <div className='h-px transition-all duration-500' style={{ width: `${progress}%`, background: 'var(--color-text)' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamOverview
