import { Outlet } from 'react-router-dom'
import UserNavbar from '../../components/User/UserNavbar'
import UserSidebar from '../../components/User/UserSidebar'

const UserLayout = () => {
  return (
    <div className='min-h-screen'>
      <UserNavbar />
      <div className='flex pt-[74px] min-h-screen'>
        <UserSidebar />
        <div className='flex-1 md:ml-64 ml-20 p-4 md:p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout

