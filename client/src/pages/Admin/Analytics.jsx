
import { useEffect, useState } from 'react'
import { dashboardData, department_data, user_data } from '../../assets/assets'
import { Activity, ClipboardList, TrendingUp, Users } from 'lucide-react'

const Analytics = () => {
    const[userData,setUserData] = useState([])
     const fetchUserData = () => {
       setUserData(user_data)
     }
     const[departmentData,setDeparmentData] = useState([])
     const fetchDepartmentData = () => {
          setDeparmentData(department_data)
     }
      useEffect(()=>{
        fetchDepartmentData()
         fetchUserData()
       },[])
  return (
    <div className='p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
      <h1 className='font-semibold text-2xl text-gray-900 mb-6'>System Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Task Completion Rate</p>
              <p className='text-2xl font-semibold text-green-500'>{dashboardData.completionRate}%</p>
            </span>
            <TrendingUp className='text-green-500 h-8 w-8'/>
            
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Users</p>
              <p className='text-2xl font-semibold text-blue-500'>{dashboardData.totalUsers}</p>
            </span>
            <Activity className='text-blue-500 h-8 w-8'/>
            
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Tasks</p>
              <p className='text-2xl font-semibold text-purple-500'>{dashboardData.totalTasks}</p>
            </span>
            <ClipboardList className='text-purple-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Active Managers</p>
              <p className='text-2xl font-semibold text-orange-500'>{dashboardData.activeManagers}</p>
            </span>
            <Users className='text-orange-500 h-8 w-8'/>
           </div> 
      </div>
      <div className='mt-5 bg-white rounded-lg px-5 py-6 shadow-md h-3/5 scrollbar-hide overflow-x-auto'>
        <h2 className='text-xl font-medium mb-3'>Department Overview</h2>
        <div className='space-y-6 h-full'>
          {departmentData.map((dept,index)=>(
            <div key={index} className='flex justify-between bg-blue-50/40 rounded-md px-4 py-3'>
            <span>
            <h3 className='font-medium'>{dept.name}</h3>
            <p className='font-light text-sm'>{dept.users.length} users</p>
           </span>

           <span className='space-y-1'>
              <h4 className='text-xs font-medium text-right'>{dept.tasks.length} tasks</h4>
              <p className='text-xs font-light'>{dept.completed} completed</p>
           </span>
            </div>
           ))}
         </div>
      </div>
      </div>
  )
}

export default Analytics