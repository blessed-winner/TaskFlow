import ManagerNavbar from '../../components/Manager/ManagerNavbar'
import ManagerSidebar from '../../components/Manager/ManagerSidebar'
import { Outlet } from 'react-router-dom'

const ManagerLayout = () => {
  return (
    <div className='min-h-screen'>
      <ManagerNavbar />
      <div className='flex pt-[74px] min-h-screen'>
        <ManagerSidebar />
        <div className='flex-1 md:ml-64 ml-20 p-4 md:p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ManagerLayout

