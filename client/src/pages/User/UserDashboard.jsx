import { useState,useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon} from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
const UserDashboard = () => {
       
      const{userDashboardData} = useAppContext()
     
    
      
   
  return (
    <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
      <h1 className='font-semibold text-2xl text-gray-900 mb-6'>My Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
            <p className='text-sm font-semibold text-gray-600'>Total Tasks</p>  
            <p className='text-2xl font-semibold text-blue-600'>{userDashboardData.totalTasks}</p>
            </span>
            <ClockIcon className='text-blue-600 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Completed</p>
              <p className='text-2xl font-semibold text-green-600'>{userDashboardData.completedTasks}</p>
            </span>
            <CheckCircle className='text-green-600 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>In Progress</p>
              <p className='text-2xl font-semibold text-blue-600'>{userDashboardData.inProgressTasks}</p>
            </span>
            <AlertCircle className='text-blue-600 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Completion Rate</p>
              <p className='text-2xl font-semibold text-purple-600'>{userDashboardData.completionRate}%</p>
            </span>
            <div className='h-8 w-8 bg-purple-600 flex items-center justify-center rounded-full'>
                <span className='text-white text-sm font-bold'>%</span>
            </div>
           </div> 
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 rounded'>
         <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='font-medium text-gray-800 text-lg mb-5'>Recent Tasks</h2>
          <div className='flex flex-col gap-4'>
              <div className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                  <h4 className='font-medium text-md'>Implement user authentication</h4>
                <p className='text-sm font-light'>Due:2/15/2024</p>
                </span>
                <p className='bg-blue-100/60 px-2 py-1 text-xs text-blue-700 rounded-full font-medium'>In progress</p>
             </div>
             <div className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                    <h4 className='font-medium text-md'>Database optimization</h4>
                    <p className='text-sm font-light'>Due:2/10/2024</p>
                </span>
              <p className='bg-orange-100/60 px-2 py-1 text-xs text-orange-700 rounded-full font-medium'>Pending</p>
             </div>
          </div>
            </div>
         <div className='bg-white p-6 rounded-lg shadow-md text-sm'>
            <h2 className='font-medium text-gray-800 text-lg mb-5'>Today's Progress</h2>
             <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <h4 className='font-medium text-gray-800'>Tasks Completed Today</h4>
                  <p className='font-semibold text-2xl text-green-600'>2</p>
                </div>
               
               <div className='w-full bg-gray-300 rounded-full h-2'>
                    <div className='bg-green-600 h-2 rounded-full' style={{width:'60%'}}></div>
               </div>
               <p>Great Job! You're ahead of schedule.</p>
               <div className='space-y-1'>
                <div className='flex gap-2 items-center'>
                  <div className='bg-green-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm'>Completed: Design user dashboard</p>
                </div>
                    <div className='flex gap-2 items-center'>
                  <div className='bg-blue-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm '>In progress: Database optimization</p>
                </div>
                    <div className='flex gap-2 items-center'>
                  <div className='bg-orange-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm'>Pending: Implement user authentication</p>
                </div>
               </div>
             </div>
         </div>
      </div>
    </div>
  )
}

export default UserDashboard