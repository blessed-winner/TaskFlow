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

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className='stat-card rounded-2xl p-5 flex items-center justify-between'>
      <div className='space-y-1'>
        <p className='text-sm font-semibold text-slate-600'>{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className='w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-cyan-100'>
        <Icon className={`${color} h-6 w-6`} />
      </div>
    </div>
  )

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'CREATE_USER':
      case 'CREATE_DEPT':
        return { bg: 'bg-emerald-100/80', dot: 'bg-emerald-500' }
      case 'DELETE_USER':
      case 'DELETE_DEPT':
        return { bg: 'bg-red-100/80', dot: 'bg-red-500' }
      case 'UPDATE_USER':
      case 'NEW_TASK':
        return { bg: 'bg-cyan-100/80', dot: 'bg-cyan-500' }
      default:
        return { bg: 'bg-slate-100', dot: 'bg-slate-500' }
    }
  }

  return (
    <main className='flex-1'>
      {showForm && <AddUserForm onClose={() => setShowForm(false)} onUserAdded={handleUserAdd} fetchDashboard={fetchDashboardData} />}
      <div className='flex justify-between items-center mb-8 gap-4'>
        <div>
          <h1 className='font-semibold text-3xl text-slate-900'>Admin Dashboard</h1>
          <p className='text-slate-600 text-sm mt-1'>System pulse, users, and operational activity in one place.</p>
        </div>
        <AddUserButton onClick={() => setShowForm(true)} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        <StatCard title='Total Users' value={dashboardData.totalUsers} icon={Users} color='text-cyan-600' />
        <StatCard title='Total Tasks' value={dashboardData.totalTasks} icon={ClipboardList} color='text-emerald-600' />
        <StatCard title='Completed Tasks' value={dashboardData.completed} icon={TrendingUp} color='text-indigo-600' />
        <StatCard title='Active Managers' value={dashboardData.activeManagers} icon={Activity} color='text-amber-600' />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5'>
        <div className='lg:col-span-2 panel p-6 rounded-2xl min-h-[420px] overflow-auto'>
          <h2 className='font-semibold text-slate-900 text-lg mb-4'>Recent Activity</h2>
          <ul className='text-sm space-y-3'>
            {notifications.length > 0 ? (
              notifications.map((note, index) => {
                const { bg, dot } = getNotificationStyle(note.type)
                return (
                  <li key={index} className={`px-4 py-3 rounded-xl flex items-center gap-3 ${bg}`}>
                    <div className={`w-2 h-2 rounded-full ${dot}`}></div>
                    <span className='text-slate-700'>{note.message}</span>
                  </li>
                )
              })
            ) : (
              <div className='text-slate-500 text-md min-h-[280px] flex items-center justify-center'>No recent activity available</div>
            )}
          </ul>
        </div>
        <div className='panel p-6 rounded-2xl h-fit'>
          <h2 className='font-semibold text-slate-900 text-lg mb-4'>System Health</h2>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-slate-700'>Server status</p>
              <span className='text-xs bg-emerald-100 px-3 py-1 rounded-full text-emerald-700 font-semibold'>Online</span>
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-slate-700'>Database</p>
              <span className='text-xs bg-emerald-100 px-3 py-1 rounded-full text-emerald-700 font-semibold'>Connected</span>
            </div>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-slate-700'>Last Backup</p>
              <p className='font-medium text-slate-500 text-xs'>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard

