import { Activity, ClipboardList, TrendingUp, Users } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import AddUserButton from '../../components/Admin/AddUserButton'
import { useState } from 'react'
import AddUserForm from '../../components/Admin/AddUserForm'

const AdminDashboard = () => {
  const { dashboardData, setUsers, fetchDashboardData, notifications } = useAppContext()
  const [showForm, setShowForm] = useState(false)

  const handleUserAdd = (newUser) => {
    setUsers((users) => [...users, newUser])
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

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'CREATE_USER':
      case 'CREATE_DEPT':
        return { color: 'var(--color-accent)', label: 'addition' }
      case 'DELETE_USER':
      case 'DELETE_DEPT':
        return { color: '#e74c3c', label: 'removal' }
      default:
        return { color: 'var(--color-text-muted)', label: 'entry' }
    }
  }

  return (
    <main className='flex-1 pb-6 space-y-6'>
      {showForm && <AddUserForm onClose={() => setShowForm(false)} onUserAdded={handleUserAdd} fetchDashboard={fetchDashboardData} />}
      
      <div className='flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 border-b pb-6' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide max-w-full'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>executive overview</p>
          </div>
          <h1 className='text-3xl sm:text-5xl md:text-7xl uppercase mb-2 break-words leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Daily</span>
            <span className='ml-2 md:ml-4 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Ledger.</span>
          </h1>
        </div>
        <div className='shrink-0 w-full md:w-auto'>
          <AddUserButton onClick={() => setShowForm(true)} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard title='total agents' value={dashboardData.totalUsers} icon={Users} />
        <StatCard title='active assignments' value={dashboardData.totalTasks} icon={ClipboardList} />
        <StatCard title='completed works' value={dashboardData.completed} icon={TrendingUp} />
        <StatCard title='archivists' value={dashboardData.activeManagers} icon={Activity} />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
        <div className='lg:col-span-8 card-vintage p-0 overflow-hidden min-h-[400px]'>
          <div className='p-6 border-b flex justify-between items-center' style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Chronicle</h2>
              <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>system synchronization feed</p>
            </div>
          </div>
          
          <div className='p-6'>
            <ul className='space-y-6'>
              {notifications.length > 0 ? (
                notifications.map((note, index) => {
                  const { color, label } = getNotificationStyle(note.type)
                  return (
                    <li key={index} className='flex gap-4 items-start group relative'>
                      <div className='pt-2 flex flex-col items-center gap-2'>
                        <div className='w-2 h-2 rounded-none' style={{ background: color }}></div>
                        <div className='w-[1px] h-full absolute top-6 bg-border opacity-20'></div>
                      </div>
                      <div className='flex-1 border-b pb-4 group-last:border-0' style={{ borderColor: 'var(--color-border)' }}>
                        <div className='flex justify-between items-center mb-1'>
                          <p className='text-[9px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                          <p className='text-[9px] uppercase tracking-widest font-bold opacity-30'>timestamp verified</p>
                        </div>
                        <p className='text-sm font-sans font-medium leading-relaxed max-w-2xl mt-2' style={{ color: 'var(--color-text)' }}>{note.message}</p>
                      </div>
                    </li>
                  )
                })
              ) : (
                <div className='min-h-[300px] flex flex-col items-center justify-center opacity-30 text-center'>
                  <p className='text-2xl font-sans font-bold uppercase tracking-widest mb-2'>Archival Silence</p>
                  <p className='text-[9px] uppercase tracking-widest font-bold'>no new records identified in the current cycle</p>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className='lg:col-span-4 space-y-4'>
          <div className='card-vintage p-6'>
            <div className='border-b pb-4 mb-6 flex justify-between items-end' style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <h2 className='text-2xl font-sans font-bold uppercase tracking-tight' style={{ color: 'var(--color-text)' }}>Integrity</h2>
                <p className='text-[9px] uppercase tracking-widest font-bold opacity-50 mt-1'>system vitals</p>
              </div>
              <div className='w-2 h-2 bg-emerald-500 rounded-none mb-2'></div>
            </div>
            
            <div className='space-y-4'>
              {[
                { label: 'Central Server', status: 'Operational', sub: 'connected' },
                { label: 'Data Repository', status: 'Secure', sub: 'encrypted' },
                { label: 'Last Sync', status: '2h ago', sub: 'automatic' }
              ].map((item, i) => (
                <div key={i} className='flex justify-between items-end border-b border-dashed pb-3 last:border-0' style={{ borderColor: 'var(--color-text-muted)' }}>
                  <div>
                    <p className='text-[9px] uppercase tracking-widest font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                    <p className='text-xs font-sans font-bold mt-1'>{item.sub}</p>
                  </div>
                  <p className='text-[9px] uppercase tracking-widest font-bold' style={{ color: 'var(--color-accent)' }}>{item.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='card-vintage p-6' style={{ background: 'var(--color-text)', color: 'var(--color-background)' }}>
            <h3 className='text-xs font-sans font-bold uppercase tracking-widest mb-3'>Protocol Verification</h3>
            <p className='text-[10px] font-sans font-medium uppercase tracking-[0.1em] leading-relaxed opacity-80'>
              All archival entries are verified and synchronized across the coordination network. Integrity strictly maintained.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard

