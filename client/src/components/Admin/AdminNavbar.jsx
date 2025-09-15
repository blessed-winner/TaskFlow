import { SearchIcon,Bell, UserIcon, LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Notifications from '../Notifications'
import { useState } from 'react'

const AdminNavbar = () => {
  const[showNotifications,setShowNotifications] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
  const [notifications,setNotifications] = useState([])
const[unreadCount,setUnreadCount] = useState(0)

useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  if(!user.id) return
   
  socket.emit('join-user-room',user.id)

  const handleNotifications = (notification) => {
      setNotifications(prev => [notification, ...prev.slice(0,49)])
      setUnreadCount(prev => prev + 1)
  }
  socket.on('notification',handleNotifications)

  return() => {
    socket.off('notification',handleNotifications)
    socket.emit('leave-user-room',user.id)
  }
  
},[user?.id])

  const navigate = useNavigate()
  const { axios,setToken,logout } = useAppContext()
  /*const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    axios.defaults.headers.common['Authorization'] = null
    navigate('/')
  }*/
  return (
    <>
        <div className='flex justify-between items-center px-6 py-3 bg-white border-b border-gray-300 shadow fixed z-1 right-0 left-0 top-0'>
          <div className='flex gap-3 items-center'>
              <h1 className='font-bold text-2xl text-gray-900'>TaskFlow</h1>
           <div className='flex gap-3 items-center border border-gray-300 px-3 py-2 rounded-lg w-[250px] max-md:hidden'>
             <SearchIcon className='w-4 text-gray-400'/>
            <input type="text" placeholder='Search tasks...' className='text-sm outline-none text-gray-600'/>
           </div>
          </div>
          <div className='flex justify-between gap-3 relative'>
            <button className='relative'>
                 <Bell onClick={()=>setShowNotifications(true)} className='p-0.5 text-gray-400 hover:bg-gray-200 transition-all cursor-pointer rounded-md'/>
                {showNotifications && <Notifications onClose={()=>setShowNotifications(false)}/>}
                  {unreadCount > 0 && <span className='bg-red-500 text-white rounded-full p-2 text-xs absolute right-0.5 -top-1'>{unreadCount}</span>}
            </button>
              <div>
                <p className='max-md:hidden text-xs text-gray-900 font-semibold'>{user.fName + " " + user.lName}</p>
                <p className='max-md:hidden text-xs text-gray-500 font-light text-right'>Admin</p>
              </div>
              <UserIcon className='bg-blue-500 p-1 rounded-full text-white '/>
              <LogOutIcon onClick={logout} className='p-1 hover:bg-gray-200 transition-all cursor-pointer rounded-md text-gray-400'/>
           </div>
        </div>
    </>
  )
}

export default AdminNavbar