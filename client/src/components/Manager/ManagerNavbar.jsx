import { SearchIcon,Bell, UserIcon, LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Notifications from '../Notifications'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import toast from 'react-hot-toast'

const socket = io('http://localhost:8000')

const ManagerNavbar = () => {
   const { logout } = useAppContext()
   const user = JSON.parse(localStorage.getItem("user"))
   const {axios} = useAppContext()
   const [showNotifications,setShowNotifications] = useState(false)
   const [notifications,setNotifications] = useState([])
   const [unreadCount,setUnreadCount] = useState(0)

     const id = user.id;

  const fetchUserNotifications = async () => {
        try {
          const {data} = await axios.get(`/api/notifications/user/${ id }`)
          if(data.success){
            setNotifications(data.userNotifications)
            setUnreadCount(data.unreadCount)
          } else {
            toast.error(data.message)
          }
        } catch (error) {
           toast.error(error.message)
        }
  }

  const deleteNotifications = async () => {
    try {
      const{data} = await axios.delete(`/api/notifications/delete/${id}`)
      if(data.success){
        toast.success(data.message)
        setNotifications([])
        setUnreadCount(0)
       } else {
          toast.error(data.message)
       } 
    } catch (error) {
      toast.error(error.message)
    }
  }

  const markAllRead = async () => {
    try {
        const { data } = await axios.put(`/api/notifications/toggle-is-read/${id}`)
        if(data.success){
            setUnreadCount(0)
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

   useEffect(()=>{
     if(!user || !user.id) return
     
     socket.emit('join-user-room',user.id)

     fetchUserNotifications()

     const handleNotifications = (notification) => {
       setNotifications(prev => [notification, ...(prev || []).slice(0,49)])
       setUnreadCount(prev => prev + 1)
     }
     socket.on('notification',handleNotifications)

     return()=>{
       socket.off('notification',handleNotifications)
       socket.emit('leave-user-room',user.id)
     }
   },[user?.id])

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

              <div className='relative'>
                <Bell onClick={()=>setShowNotifications(true)} className='p-0.5 text-gray-400 hover:bg-gray-200 transition-all cursor-pointer rounded-md'/>
                {showNotifications && (
                  <Notifications 
                    onClose={()=>setShowNotifications(false)}
                    notifications={notifications}
                    onMarkAllRead={()=>setUnreadCount(0)}
                    onClearAll={()=>{setNotifications([]) 
                                     setUnreadCount(0)
                              }}
                  />
                )}
                {unreadCount > 0 && <span className='absolute -top-1.5 right-0 bg-red-500 text-white px-1.25 rounded-full text-xs'>{unreadCount}</span>}
              </div>
              <div>
                <p className='max-md:hidden text-xs text-gray-900 font-semibold'>{user.fName + " " + user.lName}</p>
                <p className='max-md:hidden text-xs text-gray-500 font-light text-right'>Manager</p>
              </div>
              <UserIcon className='bg-blue-500 p-1 rounded-full text-white '/>
              <LogOutIcon onClick={logout} className='p-1 hover:bg-gray-200 transition-all cursor-pointer rounded-md text-gray-400'/>
           </div>
        </div>
    </>
  )

}

export default ManagerNavbar