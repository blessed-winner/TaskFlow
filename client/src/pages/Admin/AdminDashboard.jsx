import { Activity, ClipboardList, TrendingUp, Users } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import AddUserButton from '../../components/Admin/AddUserButton'
import { useState } from 'react'
import AddUserForm from '../../components/Admin/AddUserForm'
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

const AdminDashboard = () => {

  const { dashboardData,setUsers,fetchDashboardData } = useAppContext()
  const [ showForm,setShowForm  ] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  socket.emit('join-user-room',user.id)

  const handleUserAdd = (newUser) => {
      setUsers((users) => [...users,newUser])
  }

  return (
    <div className=' ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
          {showForm && <AddUserForm onClose={()=>setShowForm(false)} onUserAdded={handleUserAdd} fetchDashboard={fetchDashboardData}/>}
          <div className='flex justify-between'>
         <h1 className='font-semibold text-2xl text-gray-900 mb-6'>Admin Dashboard</h1>
         <AddUserButton onClick = {()=>setShowForm(true)}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Users</p>
              <p className='text-2xl font-semibold text-blue-500'>{dashboardData.totalUsers}</p>
            </span>
            <Users className='text-blue-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Tasks</p>
              <p className='text-2xl font-semibold text-green-500'>{dashboardData.totalTasks}</p>
            </span>
            <ClipboardList className='text-green-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Completed Tasks</p>
              <p className='text-2xl font-semibold text-purple-500'>{dashboardData.completed}</p>
            </span>
            <TrendingUp className='text-purple-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Active Managers</p>
              <p className='text-2xl font-semibold text-orange-500'>{dashboardData.activeManagers}</p>
            </span>
            <Activity className='text-orange-500 h-8 w-8'/>
           </div> 
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 rounded'>
         <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='font-semibold text-gray-800 text-lg mb-5'>Recent Activity</h2>
            <ul className='text-sm space-y-6'>
              <li className='bg-blue-100/50 px-4 py-2.5 rounded-md flex items-center gap-2'>
              <div className='h-2 w-2 bg-blue-600 rounded-full'></div>
              New user registered: Jane Smith
              </li>
              <li className='bg-green-100/50 px-4 py-2.5 rounded-md flex items-center gap-2'>
              <div className='h-2 w-2 bg-green-600 rounded-full'></div>
              Task completed: Design user dashboard
              </li>
              <li className='bg-orange-100/50 px-4 py-2.5 rounded-md flex items-center gap-2'>
              <div className='h-2 w-2 bg-orange-600 rounded-full'></div>
              New task assigned: Database optimization
              </li>
            </ul>
         </div>
         <div className='bg-white p-6 rounded-lg shadow-md text-sm'>
            <h2 className='font-semibold text-gray-800 text-lg mb-5'>System Health</h2>
            <div className='flex justify-between mb-5'>
               <p className='font-semibold text-gray-800'>Server status</p>
               <button className='text-xs bg-green-100/80 px-4 py-1 rounded-full text-green-600 font-semibold'>Online</button>
            </div>
             <div className='flex justify-between mb-5'>
               <p className='font-semibold text-gray-800'>Database</p>
               <button className='text-xs bg-green-100/80 px-4 py-1 rounded-full text-green-600 font-semibold'>Connected</button>
            </div>
             <div className='flex justify-between'>
               <p className='font-semibold text-gray-800'>Last Backup</p>
               <p className='font-light text-gray-500 text-xs'>2 hours ago</p>
            </div>
         </div>
      </div>
    </div>
  )
}

export default AdminDashboard