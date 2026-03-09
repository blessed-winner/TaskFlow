import { SearchIcon, Bell, UserIcon, LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Notifications from '../Notifications'
import { useState } from 'react'

const ManagerNavbar = () => {
  const { logout, notifications, unreadCount, deleteNotifications, markAllRead } = useAppContext()
  const user = JSON.parse(localStorage.getItem('user'))
  const [showNotifications, setShowNotifications] = useState(false)

  const navigate = useNavigate()

  const handleDeleteNotifications = () => {
    deleteNotifications(user.id)
  }

  const handleMarkAllRead = () => {
    markAllRead(user.id)
  }

  return (
    <header className='app-topbar fixed top-0 left-0 right-0 z-30 px-4 md:px-8 py-3'>
      <div className='flex justify-between items-center gap-4'>
        <div className='flex gap-3 items-center min-w-0'>
          <h1 onClick={() => navigate('/')} className='font-bold text-2xl text-slate-900 cursor-pointer tracking-tight'>
            TaskFlow
          </h1>
          <div className='hidden md:flex items-center gap-2 bg-white border border-cyan-100 rounded-full px-4 py-2 min-w-[320px]'>
            <SearchIcon className='w-4 text-slate-400' />
            <input type='text' placeholder='Search assignments and members...' className='text-sm outline-none w-full bg-transparent text-slate-700' />
          </div>
        </div>

        <div className='flex items-center gap-2 md:gap-3'>
          <div className='relative'>
            <button onClick={() => setShowNotifications(true)} className='secondary-btn rounded-full p-2 cursor-pointer'>
              <Bell className='text-slate-600' size={18} />
            </button>
            {showNotifications && (
              <Notifications
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onClearAll={handleDeleteNotifications}
              />
            )}
            {unreadCount > 0 && <span className='absolute -top-1 -right-1 bg-red-500 text-white px-1.5 rounded-full text-xs'>{unreadCount}</span>}
          </div>
          <div className='hidden md:block text-right'>
            <p className='text-sm text-slate-800 font-semibold'>{`${user.fName} ${user.lName}`}</p>
            <p className='text-xs text-slate-500'>Manager</p>
          </div>
          <UserIcon className='bg-cyan-600 p-1.5 rounded-full text-white' size={32} />
          <button onClick={logout} className='secondary-btn rounded-full p-2 cursor-pointer'>
            <LogOutIcon className='text-slate-600' size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default ManagerNavbar

