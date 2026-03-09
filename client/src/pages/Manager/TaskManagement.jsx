import { useState } from 'react'
import TaskTableData from '../../components/Manager/TaskTableData'
import { AlertCircle, ClipboardList, Clock, TrendingUp } from 'lucide-react'
import AddTaskButton from '../../components/Manager/AddTaskButton'
import CreateTaskForm from '../../components/Manager/TaskForm/CreateTaskForm'
import UpdateTaskForm from '../../components/Manager/TaskForm/UpdateTaskForm'
import { useAppContext } from '../../context/AppContext'

const TaskManagement = () => {
  const { managerDashboardData, tasks, fetchTasks, setTasks, fetchManagerDashboardData } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleTaskAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask])
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setShowUpdateForm(true)
  }

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setShowUpdateForm(false)
    setSelectedTask(null)
  }

  return (
    <div className='flex-1'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={() => setShowForm(false)} />}
      {showUpdateForm && <UpdateTaskForm task={selectedTask} onTaskUpdated={handleTaskUpdate} onClose={() => { setShowUpdateForm(false); setSelectedTask(null) }} />}
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div>
          <h1 className='font-semibold text-3xl text-slate-900'>Task Management</h1>
          <p className='text-sm text-slate-600 mt-1'>Create, edit, and prioritize team work items.</p>
        </div>
        <AddTaskButton onClick={() => setShowForm(true)} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6'>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Total Tasks</p>
            <p className='text-2xl font-semibold text-cyan-600'>{managerDashboardData.totalTasks}</p>
          </span>
          <ClipboardList className='text-cyan-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Completed</p>
            <p className='text-2xl font-semibold text-emerald-600'>{managerDashboardData.completedTasks}</p>
          </span>
          <TrendingUp className='text-emerald-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Pending</p>
            <p className='text-2xl font-semibold text-amber-600'>{managerDashboardData.pendingTasks}</p>
          </span>
          <Clock className='text-amber-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Overdue</p>
            <p className='text-2xl font-semibold text-red-600'>{managerDashboardData.overDueTasks}</p>
          </span>
          <AlertCircle className='text-red-600 h-7 w-7' />
        </div>
      </div>
      <div className='panel rounded-2xl overflow-x-auto'>
        <table className='w-full text-sm min-w-[900px]'>
          <thead className='text-slate-500 uppercase text-xs bg-cyan-50/60 text-left w-full'>
            <tr>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Task</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Assigned To</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Status</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Priority</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Due Date</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskTableData task={task} key={task?.id} fetchManagerDashboard={fetchManagerDashboardData} fetchTasks={fetchTasks} onEditTask={handleEditTask} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskManagement

