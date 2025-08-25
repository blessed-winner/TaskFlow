import { ClipboardList, FolderOpen, Home, UserCheck } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'


const ManagerSidebar = () => {
  return (
      <div className='flex flex-col min-h-full bg-gray-900 md:p-6 min-w-54 fixed mt-16.5'>
        <div className='text-center mb-12 border-b-1 border-gray-500 p-4'>
           <h1 className='text-white w-10 h-10 text-md bg-blue-500 flex items-center justify-center rounded-full mb-5 mx-auto'>A</h1>
            <h4 className='font-semibold text-gray-200 text-md hidden md:block'>John Manager</h4>
            <p className='text-sm text-gray-500 hidden md:block'>Manager</p>
        </div>
        <div className='space-y-2'>
          <NavLink end={true} to='/manager' className={({isActive})=>`flex gap-3 items-center px-3
          py-3.5 rounded-lg text-gray-300  ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <Home className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Dashboard</p>
          </NavLink>
           <NavLink to='/manager/manage-tasks' className={({isActive})=>`flex gap-3 items-center py-3.5
           px-3 rounded-lg text-gray-300 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <ClipboardList className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Task Management</p>
          </NavLink>
                 <NavLink end={true} to='/manager/team-overview' className={({isActive})=>`flex gap-3 items-center px-3
          py-3.5 rounded-lg text-gray-300  ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <UserCheck className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Team Overview</p>
          </NavLink>
           <NavLink to='/manager/manager-tasks' className={({isActive})=>`flex gap-3 items-center py-3.5 px-3 rounded-lg text-gray-300 $${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800 hover:text-white transition-all'}`}>
            <FolderOpen className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Projects</p>
          </NavLink>
        </div>
    </div>
  )
}

export default ManagerSidebar