import { SearchIcon, Bell, UserIcon, LogOutIcon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Notifications from '../Notifications'
import ThemeToggle from '../ThemeToggle'
import { useState } from 'react'

const UserNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { logout, notifications, unreadCount, deleteNotifications, markAllRead } = useAppContext()
  const [showNotifications, setShowNotifications] = useState(false)

  const navigate = useNavigate()

  const handleDeleteNotifications = () => {
    deleteNotifications(user.id)
  }

  const handleMarkAllRead = () => {
    markAllRead(user.id)
  }

  return (
    <header className='fixed top-4 left-4 right-4 md:left-[17.5rem] z-[100] h-[64px] px-6 border flex items-center transition-colors' style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className='w-full flex justify-between items-center'>
        
        {/* Brand Section */}
        <div className='flex items-center gap-3 pr-4 border-r' style={{ borderColor: 'var(--color-border)' }}>
          <div className='w-1.5 h-1.5 hidden sm:block' style={{ background: 'var(--color-text)' }}></div>
          <h1 onClick={() => navigate('/')} className='text-xs tracking-[0.3em] font-bold uppercase cursor-pointer' style={{ color: 'var(--color-text)' }}>
            <span className='sm:hidden'>TF</span>
            <span className='hidden sm:inline'>TaskFlow</span>
          </h1>
          <span className='text-[9px] uppercase tracking-widest opacity-50 font-black ml-1'>Operative</span>
        </div>

        {/* Actions Section */}
        <div className='flex items-center gap-3 sm:gap-6'>
          <ThemeToggle />
          
          <div className='relative'>
            <button onClick={() => setShowNotifications(true)} className='btn-invert p-2 transition-colors rounded-none border border-transparent hover:border-current'>
              <Bell size={14} />
              {unreadCount > 0 && <span className='absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-none'></span>}
            </button>
            {showNotifications && (
              <Notifications
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onClearAll={handleDeleteNotifications}
              />
            )}
          </div>
          
          <div className='hidden sm:block w-px h-4 bg-gray-500 opacity-30'></div>
          
          <div className='flex items-center gap-3'>
            <div className='text-right leading-none hidden sm:block'>
              <p className='text-[9px] uppercase tracking-widest font-bold' style={{ color: 'var(--color-text)' }}>{user.fName}</p>
            </div>
            <button onClick={logout} className='btn-invert p-2 transition-colors rounded-none border border-transparent hover:border-current'>
              <LogOutIcon size={14} />
            </button>
          </div>
        </div>
        
      </div>
    </header>
  )
}

export default UserNavbar

