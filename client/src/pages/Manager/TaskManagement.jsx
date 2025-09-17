import React, { useState } from 'react'
import TaskTableData from '../../components/Manager/TaskTableData'
import { AlertCircle, ClipboardList, Clock, TrendingUp } from 'lucide-react'
import AddTaskButton from '../../components/Manager/AddTaskButton'
import CreateTaskForm from '../../components/Manager/TaskForm/CreateTaskForm'
import UpdateTaskForm from '../../components/Manager/TaskForm/UpdateTaskForm'
import { useAppContext } from '../../context/AppContext'

const TaskManagement = () => {
  const{managerDashboardData,tasks,fetchTasks,setTasks,fetchManagerDashboardData} = useAppContext()
  const [showForm,setShowForm] = useState(false)
  const [showUpdateForm,setShowUpdateForm] = useState(false)
  const [selectedTask,setSelectedTask] = useState(null)

  const handleTaskAdd = (newTask) => {
    setTasks(prev => [...prev,newTask])
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setShowUpdateForm(true)
  }

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setShowUpdateForm(false)
    setSelectedTask(null)
  }


  return (
       <div className='ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
        {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={()=>setShowForm(false)}/>}
        {showUpdateForm && <UpdateTaskForm task={selectedTask} onTaskUpdated={handleTaskUpdate} onClose={()=>{setShowUpdateForm(false); setSelectedTask(null)}}/>}
        <div className='flex justify-between'>
           <h1 className='font-semibold text-2xl mb-5'>Task Management</h1> 
           <AddTaskButton onClick = {()=>setShowForm(true)}/>
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className='text-sm font-semibold text-gray-600'>Pending</p>
              <p className='text-2xl font-semibold text-yellow-500'>{managerDashboardData.pendingTasks}</p>
            </span>
            <Clock className='text-yellow-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Overdue</p>
              <p className='text-2xl font-semibold text-red-500'>{managerDashboardData.overDueTasks}</p>
            </span>
            <AlertCircle className='text-red-500 h-8 w-8'/>
           </div> 
      </div>
       <div className='max-w-5xl scrollbar-hide rounded-lg overflow-x-auto h-3/5 '>
         <table className='w-full text-sm'>
            <thead className='px-4 py-2.5 text-gray-500 uppercase text-xs bg-blue-100/20 text-left w-full'>
            <tr>
              <th className='py-3 px-2 xl:px-4 font-medium'>task</th>
              <th className='py-3 px-2 xl:px-4 font-medium'>assigned to</th>
              <th className='py-3 px-2 xl:px-4 font-medium max-md:hidden'>status</th>
              <th className='py-3 px-2 xl:px-4 font-medium max-md:hidden'>priority</th>
              <th className='py-3 px-2 xl:px-4 font-medium max-md:hidden'>due date</th>
              <th className='py-3 px-2 xl:px-4 font-medium'>actions</th>
            </tr>
         </thead>
         <tbody>
             {tasks.map((task)=>(
              <TaskTableData task={task} key={task?.id} fetchManagerDashboard={fetchManagerDashboardData} fetchTasks={fetchTasks} onEditTask={handleEditTask}/>
             ))}
         </tbody>
       </table>
       </div>
       </div>
  )
}

export default TaskManagement