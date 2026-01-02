import React, { useEffect, useState } from 'react'
import {dashboardData, task_data, user_data} from '../../assets/assets'
import {  AlertCircle, ClipboardList, TrendingUp, Users } from 'lucide-react'
import AddTaskButton from '../../components/Manager/AddTaskButton'
import CreateTaskForm from '../../components/Manager/TaskForm/CreateTaskForm'
import { useAppContext } from '../../context/AppContext'

const ManagerDashboard = () => {

  const {setTasks} = useAppContext()
  const[showForm,setShowForm] = useState(false)
  const { managerDashboardData } = useAppContext()
  
  const handleTaskAdd = (newTask) => {
    setTasks(prev => [...prev,newTask])
  }

  return (
    <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={()=>setShowForm(false)}/>}
      <div className='flex justify-between'>
         <h1 className='font-semibold text-2xl text-gray-900 mb-6'>Manager Dashboard</h1>
         <AddTaskButton onClick = {()=>setShowForm(true)}/>
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Tasks</p>
              <p className='text-2xl font-semibold text-blue-500'>{managerDashboardData.totalTasks}</p>
            </span>
            <ClipboardList className='text-blue-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Completed</p>
              <p className='text-2xl font-semibold text-green-500'>{managerDashboardData.completedTasks}</p>
            </span>
            <TrendingUp className='text-green-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Team Members</p>
              <p className='text-2xl font-semibold text-purple-500'>{managerDashboardData.teamMembers}</p>
            </span>
            <Users className='text-purple-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Overdue Tasks</p>
              <p className='text-2xl font-semibold text-red-500'>{managerDashboardData.overDueTasks}</p>
            </span>
            <AlertCircle className='text-red-500 h-8 w-8'/>
           </div> 
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6 rounded'>
         <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='font-medium text-gray-800 text-lg mb-5'>Recent Tasks</h2>
          <div className='flex flex-col gap-4'>
              <div className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                  <h4 className='font-medium text-md'>Implement user authentication</h4>
                <p className='text-sm font-light'>Assigned to Bob Wilson</p>
                </span>
                <p className='bg-blue-100/60 px-2 py-1 text-xs text-blue-700 rounded-full font-medium'>In progress</p>
             </div>
             <div className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                    <h4 className='font-medium text-md'>Database optimization</h4>
                    <p className='text-sm font-light'>Assigned to Jane Smith</p>
                </span>
              <p className='bg-orange-100/60 px-2 py-1 text-xs text-orange-700 rounded-full font-medium'>Pending</p>
             </div>
          </div>
            </div>
         <div className='bg-white p-6 rounded-lg shadow-md text-sm'>
            <h2 className='font-semibold text-gray-800 text-lg mb-5'>Team Performance</h2>
            <div className='flex justify-between mb-5'>
               <p className='font-semibold text-gray-800'>Jane Smith</p>
               <div className='space-y-1'>
              <p className='text-xs font-semibold'>0%</p>
              <p className='font-light text-xs text-gray-500'>1 tasks</p>
               </div>
               </div>
             <div className='flex justify-between mb-5'>
               <p className='font-semibold text-gray-800'>Bob Wilson</p>
               <div className='space-y-1'>
                   <button className='text-xs font-semibold'>20%</button>
                   <p className='font-light text-xs text-gray-500'>1 tasks</p>
               </div>
              </div>
         </div>
      </div>
    </div>
  )
}

export default ManagerDashboard