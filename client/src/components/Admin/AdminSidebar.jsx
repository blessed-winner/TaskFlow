import { BarChart3, Home, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='flex flex-col min-h-full bg-gray-900 md:p-6 fixed mt-14.5'>
        <div className='text-center mb-12 border-b-1 border-gray-500 p-4'>
           <h1 className='text-white w-10 h-10 text-md bg-blue-500 flex items-center justify-center rounded-full mb-5 mx-auto'>{user.fName.slice(0,1)}</h1>
            <h4 className='font-semibold text-gray-200 text-md hidden md:block'>{user.fName + " " + user.lName}</h4>
            <p className='text-sm text-gray-500 hidden md:block'>Admin</p>
        </div>
        <div className='space-y-2'>
          <NavLink end={true} to='/admin' className={({isActive})=>`flex gap-3 items-center px-3
          py-3.5 rounded-lg text-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <Home className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Dashboard</p>
          </NavLink>
           <NavLink to='/admin/users' className={({isActive})=>`flex gap-3 items-center py-3.5
           px-3 rounded-lg text-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <Users className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>User Management</p>
          </NavLink>
          <NavLink to='/admin/analytics' className={({isActive})=>`flex gap-3 items-center py-3.5
          px-3 rounded-lg text-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <BarChart3 className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Analytics</p>
          </NavLink>
          <NavLink to='/admin/settings' className={({isActive})=>`flex gap-3 items-center py-3.5
          px-3 rounded-lg text-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <Settings className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Settings</p>
          </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar