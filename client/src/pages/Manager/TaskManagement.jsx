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

  const handleTaskAdd = (newTask) => setTasks((prev) => [...prev, newTask])
  const handleEditTask = (task) => { setSelectedTask(task); setShowUpdateForm(true) }
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setShowUpdateForm(false); setSelectedTask(null)
  }

  const stats = [
    { label: 'total tasks', value: managerDashboardData.totalTasks,     icon: ClipboardList },
    { label: 'completed',   value: managerDashboardData.completedTasks, icon: TrendingUp    },
    { label: 'pending',     value: managerDashboardData.pendingTasks,   icon: Clock         },
    { label: 'overdue',     value: managerDashboardData.overDueTasks,   icon: AlertCircle   },
  ]

  return (
    <div className='space-y-8'>
      {showForm && <CreateTaskForm onTaskAdded={handleTaskAdd} onClose={() => setShowForm(false)} />}
      {showUpdateForm && <UpdateTaskForm task={selectedTask} onTaskUpdated={handleTaskUpdate} onClose={() => { setShowUpdateForm(false); setSelectedTask(null) }} />}

      {/* ── Header ── */}
      <div className='flex flex-wrap justify-between items-start gap-4 pb-6 border-b' style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>work items</p>
          </div>
          <h1 className='text-3xl sm:text-5xl uppercase mb-2 leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Task</span>
            <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Management.</span>
          </h1>
        </div>
        <AddTaskButton onClick={() => setShowForm(true)} />
      </div>

      {/* ── Stats ── */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className='card-vintage p-6 transition-all duration-300'>
            <div className='flex justify-between items-start'>
              <div className='space-y-3'>
                <p className='text-[9px] uppercase tracking-[0.3em] font-sans font-bold opacity-50' style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                <p className='text-4xl font-sans font-black leading-none' style={{ color: 'var(--color-text)' }}>{value ?? '—'}</p>
              </div>
              <div className='p-2 border' style={{ borderColor: 'var(--color-text)' }}>
                <Icon className='h-4 w-4' style={{ color: 'var(--color-text)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tasks Table ── */}
      <div className='border overflow-x-auto' style={{ borderColor: 'var(--color-border)' }}>
        <table className='w-full text-sm min-w-[900px]'>
          <thead>
            <tr className='border-b' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              {['Task', 'Assigned To', 'Status', 'Priority', 'Due Date', 'Actions'].map((h) => (
                <th key={h} className='py-3 px-5 text-left text-[9px] uppercase tracking-widest font-sans font-bold opacity-50' style={{ color: 'var(--color-text)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskTableData
                task={task}
                key={task?.id}
                fetchManagerDashboard={fetchManagerDashboardData}
                fetchTasks={fetchTasks}
                onEditTask={handleEditTask}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskManagement
