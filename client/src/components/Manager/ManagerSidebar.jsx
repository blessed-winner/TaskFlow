import { ClipboardList, Home, UserCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const ManagerSidebar = () => {
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
        <p className='text-sm text-slate-500 hidden md:block'>Manager</p>
      </div>
      <nav className='space-y-2'>
        <NavLink end to='/manager' className={navLinkClass}>
          <Home className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        <NavLink to='/manager/manage-tasks' className={navLinkClass}>
          <ClipboardList className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Task Management</p>
        </NavLink>
        <NavLink to='/manager/team-overview' className={navLinkClass}>
          <UserCheck className='w-5 min-w-5' />
          <p className='hidden md:inline-block'>Team Overview</p>
        </NavLink>
      </nav>
    </aside>
  )
}

export default ManagerSidebar

