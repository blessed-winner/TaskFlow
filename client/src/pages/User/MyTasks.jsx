import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, ClockIcon,Calendar} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { dummyTasks } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'


  const MyTasks = () => {
  const { userDashboardData, userTasks, fetchUserTasks, fetchUserDashboardData, axios } = useAppContext()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleToggle = async (taskId, action) => {
    try {
      const endpoint =
        action === 'in_progress'
          ? '/api/tasks/toggle-in-progress'
          : '/api/tasks/toggle-completed'

      const { data } = await axios.post(endpoint, { id: taskId })
      if (data.success) {
        // Re-fetch tasks and dashboard data after update so UI refreshes
        await Promise.all([
          fetchUserTasks(user.id),
          fetchUserDashboardData()
        ])
        
        // Show success message
        const actionText = action === 'in_progress' ? 'started' : 'completed'
        toast.success(`Task ${actionText} successfully!`)
      } else {
        toast.error(data.message || 'Failed to update task')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task. Please try again.')
    }
  }

  
  useEffect(() => {
    // Fetch user tasks when component mounts
    if(user?.id) {
      fetchUserTasks(user.id)
    }
  }, [user?.id])
  return (
   <div className=' ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
         <h1 className='font-semibold text-2xl text-gray-900 mb-6'>My Tasks</h1>
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
                 <p className='text-sm font-semibold text-gray-600'>Pending</p>
                 <p className='text-2xl font-semibold text-yellow-600'>{userDashboardData.pendingTasks}</p>
               </span>
              <ClockIcon className='text-yellow-600 h-8 w-8'/>
              </div> 
         </div>
         {userTasks && userTasks.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6'>
            {userTasks.map((task,index)=>(
                <div key={index} className={`bg-white px-7 py-9 text-gray-800 rounded-lg space-y-3 shadow-lg ${task.priority.toLowerCase() === 'high' && 'border-l-4 border-orange-300/50'}  ${task.priority.toLowerCase() === 'medium' && 'border-l-4 border-yellow-300/50'}`}>
                    <span className='flex justify-between items-center'>
                      <h3 className='font-medium text-xl'>{task.title}</h3>
                      <p className={`text-xs px-2 py-1 font-medium rounded-full ${task.priority.toLowerCase() === 'high' && 'bg-red-200/40 text-red-800'} ${task.priority.toLowerCase() === 'medium' && 'bg-yellow-100 text-yellow-800'} ${task.priority.toLowerCase() === 'low' && 'bg-green-100 text-green-800'}`}>{task.priority.toLowerCase()}</p>
                    </span>
                <p className='text-sm font-light'>{task.description}</p>
                <p className='text-xs font-light'>Assigned to {task.user?.fName} {task.user?.lName}</p>
                <div className='flex justify-between items-center'>
                    <span className='flex gap-2 items-center'>
                          <Calendar className='h-4 w-4 text-gray-500'/>
                          <p className='text-sm font-light'>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </span>
                 <p className={`text-xs px-2 py-1 font-medium rounded-full ${task.status.toLowerCase() === 'pending' && 'bg-yellow-100 text-yellow-800'} ${task.status.toLowerCase() === 'in_progress' && 'bg-blue-100 text-blue-800'} ${task.status.toLowerCase() === 'completed' && 'bg-green-100 text-green-800'}`}>{task.status.toLowerCase()}</p>
                </div> 
              <button
                 onClick={() =>
                  task.status.toLowerCase() === 'pending'
                  ? handleToggle(task.id, 'in_progress')
                  : task.status.toLowerCase() === 'in_progress'
                  ? handleToggle(task.id, 'completed')
                  : null
                  }
                 className={`w-full px-4 py-2 text-sm text-white rounded-lg font-light cursor-pointer 
                 ${task.status.toLowerCase() === 'pending' && 'bg-blue-600 hover:bg-blue-800'} 
                 ${task.status.toLowerCase() === 'in_progress' && 'bg-green-600 hover:bg-green-800'} 
                 ${task.status.toLowerCase() === 'completed' && 'bg-gray-400 cursor-not-allowed'}`}
                 >
                 {task.status.toLowerCase() === 'pending' && 'Start Task'}
                 {task.status.toLowerCase() === 'in_progress' && 'Mark Completed'}
                 {task.status.toLowerCase() === 'completed' && 'Completed'}
                </button>

                <div className='flex items-center gap-2'>
                    <p className='text-xs font-light bg-blue-100/30 px-2 py-1 rounded-full'>{task.department?.name}</p>
                </div>
            </div>
            ))}
         </div> : <div className='flex items-center justify-center w-full min-h-60'><p>No tasks available currently</p></div>}
         </div>
  )
}

export default MyTasks