import { Outlet } from 'react-router-dom'
import UserNavbar from '../../components/User/UserNavbar'
import UserSidebar from '../../components/User/UserSidebar'

const UserLayout = () => {
  return (
    <div>
        <UserNavbar/>
        <div className='flex lg:h-[100vh] h-[100vh - 70px]'>
          <UserSidebar/>
          <Outlet/>
        </div>
        </div>
  )
}

export default UserLayout