import { useState,useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon} from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
const UserDashboard = () => {
       
      const{userDashboardData, userTasks, fetchUserTasks} = useAppContext()
      const user = JSON.parse(localStorage.getItem('user'))
      const[progress,setProgress] = useState(null)
      
      // Use API data instead of localStorage
      const completedTasks = userTasks?.filter(task => task.status.toLowerCase() === 'completed') || []
      const completedCount = completedTasks.length || 0
      const totalTasks = userTasks || []
      const totalCount = totalTasks.length || 0
      const inProgressTasks = userTasks?.filter(task => task.status.toLowerCase() === 'in_progress') || []
      const inProgressCount = inProgressTasks.length || 0
      const pendingTasks = userTasks?.filter(task => task.status.toLowerCase() === 'pending') || []
      const pendingCount = pendingTasks.length || 0
      
      
      const fetchProgress = ()=> {
          const barProgress = totalCount > 0 ? Math.floor((completedCount/totalCount) * 100) : 0
          setProgress(barProgress)
      }

      useEffect(()=>{
        fetchProgress()
        if(user?.id) {
          fetchUserTasks(user.id)
        }
      },[user?.id])
      
   
  return (
    <div className=' ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
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
            {totalCount > 0 ? totalTasks.map((task,index)=>(
                    <div key={index} className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                  <h4 className='font-medium text-md'>{task.title}</h4>
                <p className='text-sm font-light'>{new Date(task.dueDate).toLocaleDateString()}</p>
                </span>
                <p className={` px-2 py-1 text-xs rounded-full font-medium ${task.status.toLowerCase() === 'in_progress' && ' text-blue-700 bg-blue-100/60'} ${task.status.toLowerCase() === 'pending' && ' text-orange-700 bg-orange-100/60'} ${task.status.toLowerCase() === 'completed' && ' text-green-700 bg-green-100/60'}`}>{task.status.toLowerCase()}</p>
             </div>
            )) : (
              <div className='w-full min-h-50 flex items-center justify-center'>
                <h3 className='font-medium text-xl text-green-500'>No Tasks Found</h3>
              </div>
              
            )
         }
          </div>
            </div>
         <div className='bg-white p-6 rounded-lg shadow-md text-sm'>
            <h2 className='font-medium text-gray-800 text-lg mb-5'>Today's Progress</h2>
             <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <h4 className='font-medium text-gray-800'>Tasks Completed Today</h4>
                  <p className='font-semibold text-2xl text-green-600'>{user.tasks ? user.tasks.filter(task => task.status.toLowerCase() === 'completed').length : 0}</p>
                </div>
                <div className='w-full bg-gray-300 rounded-full h-2'>
                    <div className='bg-green-600 h-2 rounded-full' style={{width:`${progress}%`}}></div>
               </div>
               <p>  
                {user?.tasks?.length === undefined && "Waiting for new task schedule..."}
                {user?.tasks?.length > 0 && progress >= 50 && "Great Job! You're ahead of schedule."}
                {user?.tasks?.length > 0 && progress < 50 && "You've got to catch up with the schedule."}
               </p>
               <div className='space-y-1'>
                <div className='flex gap-2 items-center'>
                  <div className='bg-green-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm'>Completed: {completedCount > 0 ? completedTasks.slice(0,1).name : 'no task recorded'}</p>
                </div>
                    <div className='flex gap-2 items-center'>
                  <div className='bg-blue-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm '>In progress: {inProgressCount > 0 ? inProgressTasks.slice(0,1).name : 'no task recorded'}</p>
                </div>
                    <div className='flex gap-2 items-center'>
                  <div className='bg-orange-600 rounded-full h-3 w-3'></div>
                  <p className='font-light text-sm'>Pending: {pendingCount > 0 ? pendingTasks.slice(0,1).name : 'no task recorded'}</p>
                </div>
               </div>
             </div>
         </div>
      </div>
    </div>
  )
}

export default UserDashboard