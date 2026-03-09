import { useState } from 'react'
import { Activity, ClipboardList, Trash2, TrendingUp, Users } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import AddDepartmentButton from '../../components/Admin/AddDepartmentButton'
import AddDepartmentForm from '../../components/Admin/AddDepartmentForm'
import toast from 'react-hot-toast'

const Analytics = () => {
  const { dashboardData, departmentData, setDepartmentData, axios, fetchDepartments } = useAppContext()

  const [showForm, setShowForm] = useState(false)

  const handleDepartmentAdd = (newDept) => {
    setDepartmentData((depts) => [...depts, newDept])
  }

  const handleDeleteDepartment = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this department ?')
    if (!confirm) return
    try {
      const { data } = await axios.delete(`/api/departments/delete/${id}`)
      if (data.success) {
        toast.success(data.message)
        fetchDepartments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex-1'>
      {showForm && <AddDepartmentForm onClose={() => setShowForm(false)} onDeptAdd={handleDepartmentAdd} />}
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div>
          <h1 className='font-semibold text-3xl text-slate-900'>System Analytics</h1>
          <p className='text-sm text-slate-600 mt-1'>Key performance and departmental output metrics.</p>
        </div>
        <AddDepartmentButton onClick={() => setShowForm(true)} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Task Completion Rate</p>
            <p className='text-2xl font-semibold text-emerald-600'>{dashboardData.completionRate}%</p>
          </span>
          <TrendingUp className='text-emerald-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Total Users</p>
            <p className='text-2xl font-semibold text-cyan-600'>{dashboardData.totalUsers}</p>
          </span>
          <Activity className='text-cyan-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Total Tasks</p>
            <p className='text-2xl font-semibold text-indigo-600'>{dashboardData.totalTasks}</p>
          </span>
          <ClipboardList className='text-indigo-600 h-7 w-7' />
        </div>
        <div className='stat-card p-5 rounded-2xl flex items-center justify-between'>
          <span className='space-y-1'>
            <p className='text-sm font-semibold text-slate-600'>Active Managers</p>
            <p className='text-2xl font-semibold text-amber-600'>{dashboardData.activeManagers}</p>
          </span>
          <Users className='text-amber-600 h-7 w-7' />
        </div>
      </div>
      <div className='mt-6 panel rounded-2xl px-5 py-6 min-h-[360px]'>
        <h2 className='text-xl font-semibold mb-4 text-slate-900'>Department Overview</h2>
        <div className='space-y-4'>
          {departmentData.map((dept, index) => {
            const users = dept.users || []
            const tasks = dept.tasks || []
            const completed = tasks.filter((task) => task.completed)
            return (
              <div key={index} className='soft-panel rounded-xl px-4 py-3 flex justify-between items-center'>
                <span>
                  <h3 className='font-semibold text-slate-900'>{dept.name}</h3>
                  <div className='flex gap-2 items-center'>
                    <p className='font-light text-sm text-slate-600'>{users.length} users</p>
                    <Trash2 onClick={() => handleDeleteDepartment(dept.id)} className='text-red-500 w-4 h-4 cursor-pointer hover:scale-110 transition-all' />
                  </div>
                </span>

                <span className='space-y-1 text-right'>
                  <h4 className='text-xs font-semibold text-cyan-600'>{tasks.length} tasks</h4>
                  <p className='text-xs font-medium text-emerald-600'>{completed.length} completed</p>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Analytics

