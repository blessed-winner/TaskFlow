import React from 'react'
import ManagerNavbar from '../../components/Manager/ManagerNavbar'
import ManagerSidebar from '../../components/Manager/ManagerSidebar'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
      <div>
        <ManagerNavbar/>
        <div className='flex lg:h-[100vh] h-[100vh - 70px]'>
          <ManagerSidebar/>
          <Outlet/>
        </div>
        </div>
  )
}

export default ManagerLayout