import { BarChart3, Home, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navLinkClass = ({ isActive }) =>
    `flex gap-3 items-center px-4 py-3 rounded-2xl font-semibold transition-all ${
      isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'text-slate-600 hover:bg-cyan-50 hover:text-slate-900'
    }`

  return (
    <aside className='fixed top-[74px] bottom-0 md:w-64 w-20 px-3 md:px-4 py-6 panel border-r border-cyan-100/80'>
      <div className='text-center mb-8 border-b border-cyan-100 pb-6'>
        <h1 className='text-white w-12 h-12 text-lg font-bold bg-cyan-600 flex items-center justify-center rounded-full mb-4 mx-auto'>
          {user.fName.slice(0, 1)}
        </h1>
        <h4 className='font-semibold text-slate-800 text-md hidden md:block'>{`${user.fName} ${user.lName}`}</h4>
        <p className='text-sm text-slate-500 hidden md:block'>Admin</p>
      </div>
      <nav className='space-y-2'>
        <NavLink end to='/admin' className={navLinkClass}>
          <Home className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        <NavLink to='/admin/users' className={navLinkClass}>
          <Users className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>User Management</p>
        </NavLink>
        <NavLink to='/admin/analytics' className={navLinkClass}>
          <BarChart3 className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Analytics</p>
        </NavLink>
        <NavLink to='/admin/settings' className={navLinkClass}>
          <Settings className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Settings</p>
        </NavLink>
      </nav>
    </aside>
  )
}

export default AdminSidebar

