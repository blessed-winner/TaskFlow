import React, { useEffect, useState } from 'react'
import {  AlertCircle, ClipboardList, TrendingUp, Users } from 'lucide-react'
import AddTaskButton from '../../components/Manager/AddTaskButton'
import CreateTaskForm from '../../components/Manager/TaskForm/CreateTaskForm'
import { useAppContext } from '../../context/AppContext'

const ManagerDashboard = () => {

  const {tasks,setTasks,managerDashboardData,users,axios} = useAppContext()
  const[showForm,setShowForm] = useState(false)
  const [userTaskData, setUserTaskData] = useState({})

  useEffect(() => {
   
    const fetchAllUserTasks = async () => {
      const userRoleUsers = users.filter(user => user.role === 'USER')
      const taskData = {}
      
      // Use Promise.all for better performance
      const promises = userRoleUsers.map(async (user) => {
        try {
          const { data } = await axios.get(`/api/tasks/user/${user.id}`)
          if (data.success) {
            return { userId: user.id, tasks: data.tasks }
          }
          return { userId: user.id, tasks: [] }
        } catch (error) {
          console.error(`Error fetching tasks for user ${user.id}:`, error)
          return { userId: user.id, tasks: [] }
        }
      })

      const results = await Promise.all(promises)
      results.forEach(({ userId, tasks }) => {
        taskData[userId] = tasks
      })
      
      setUserTaskData(taskData)
    }

    if (users.length > 0) {
      fetchAllUserTasks()
    }
  }, [users, axios])

  
  const handleTaskAdd = (newTask) => {
    setTasks(prev => [...prev,newTask])
  }

  return (
    <div className='ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
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
            {tasks?.length > 0 ? tasks.sort((a,b)=>new Date(b.createdAt) -  new Date(a.createdAt)).slice(0,5).map((task,index)=>(
                    <div key={index} className='flex justify-between bg-blue-50/40 px-4 py-3 rounded-lg items-center'>
                <span className='space-y-1'>
                  <h4 className='font-medium text-md'>{task.title}</h4>
                <p className='text-sm font-light'>{new Date(task.dueDate).toLocaleDateString()}</p>
                </span>
                <p className={` px-2 py-1 text-xs rounded-full font-medium capitalize ${task.status.toLowerCase() === 'in progress' && ' text-blue-700 bg-blue-100/60'} ${task.status.toLowerCase() === 'pending' && ' text-orange-700 bg-orange-100/60'} ${task.status.toLowerCase() === 'completed' && ' text-green-700 bg-green-100/60'}`}>{task.status.toLowerCase()}</p>
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
            <h2 className='font-semibold text-gray-800 text-lg mb-5'>Team Performance</h2>
            
              {
                users.filter(user => user.role === 'USER').map((user,index)=>{
                    const userTasks = userTaskData[user.id] || [];
                    const totalTasks = userTasks.length || 0;
                    const completedTasks = userTasks.filter(t => t.status.toLowerCase() === "completed").length || 0;
                    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                  return(
                  <div key={index} className='flex justify-between mb-5'>
                  <p className='font-semibold text-gray-800'>{user.fName + " " +user.lName}</p>
                  <div className='space-y-1'>
                  <p className='text-xs font-semibold'>{completionRate}%</p>
                  <p className='font-light text-xs text-gray-500'>{totalTasks} tasks</p>
                  </div>
                </div>
                )})
              }
         </div>
      </div>
    </div>
  )
}

export default ManagerDashboard