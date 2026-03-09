import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminSidebar from '../../components/Admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='min-h-screen'>
      <AdminNavbar />
      <div className='flex pt-[74px] min-h-screen'>
        <AdminSidebar />
        <div className='flex-1 md:ml-64 ml-20 p-4 md:p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout

