import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminSidebar from '../../components/Admin/AdminSidebar'

const Layout = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className='flex lg:h-[100vh] h-[100vh - 70px]'>
          <AdminSidebar/>
          <Outlet/>
        </div>
        </div>
  )
}

export default Layout