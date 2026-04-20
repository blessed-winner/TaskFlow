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
    const confirm = window.confirm('Are you sure you want to delete this department?')
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

  const stats = [
    { label: 'task completion rate', value: `${dashboardData.completionRate}%`, icon: TrendingUp },
    { label: 'total users',          value: dashboardData.totalUsers,           icon: Activity    },
    { label: 'total tasks',          value: dashboardData.totalTasks,           icon: ClipboardList },
    { label: 'active managers',      value: dashboardData.activeManagers,       icon: Users       },
  ]

  return (
    <div className='space-y-8'>
      {showForm && <AddDepartmentForm onClose={() => setShowForm(false)} onDeptAdd={handleDepartmentAdd} />}

      {/* ── Header ── */}
      <div className='flex flex-wrap justify-between items-start gap-4 pb-6 border-b' style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>system ledgers</p>
          </div>
          <h1 className='text-3xl sm:text-5xl uppercase mb-2 leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>System</span>
            <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Analytics.</span>
          </h1>
        </div>
        <AddDepartmentButton onClick={() => setShowForm(true)} />
      </div>

      {/* ── Stat Grid ── */}
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

      {/* ── Department Table ── */}
      <div className='border' style={{ borderColor: 'var(--color-border)' }}>
        <div className='px-6 py-4 border-b' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <p className='text-[8px] uppercase tracking-[0.3em] font-sans font-bold opacity-40' style={{ color: 'var(--color-text)' }}>Registered Units</p>
          <h2 className='font-serif text-2xl font-black mt-1' style={{ color: 'var(--color-text)' }}>Department Overview</h2>
        </div>

        <div className='divide-y' style={{ borderColor: 'var(--color-border)' }}>
          {departmentData.length === 0 && (
            <p className='px-6 py-8 text-[10px] uppercase tracking-widest opacity-40 font-sans' style={{ color: 'var(--color-text)' }}>
              No departments registered.
            </p>
          )}
          {departmentData.map((dept, index) => {
            const users = dept.users || []
            const tasks = dept.tasks || []
            const completed = tasks.filter((t) => t.completed)
            return (
              <div key={index} className='flex justify-between items-center px-6 py-4 transition-colors' style={{ background: 'var(--color-surface)' }}>
                <div>
                  <h3 className='text-sm font-sans font-bold uppercase tracking-widest' style={{ color: 'var(--color-text)' }}>{dept.name}</h3>
                  <div className='flex gap-3 items-center mt-1'>
                    <span className='text-[10px] uppercase tracking-widest opacity-50 font-sans' style={{ color: 'var(--color-text)' }}>
                      {users.length} operatives
                    </span>
                    <button onClick={() => handleDeleteDepartment(dept.id)} title='Delete'>
                      <Trash2 className='w-3 h-3 opacity-40 hover:opacity-90 transition-opacity' style={{ color: 'var(--color-text)' }} />
                    </button>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] uppercase tracking-widest font-sans font-bold' style={{ color: 'var(--color-text)' }}>
                    {tasks.length} <span className='opacity-40'>tasks</span>
                  </p>
                  <p className='text-[10px] uppercase tracking-widest font-sans mt-1 opacity-50' style={{ color: 'var(--color-text)' }}>
                    {completed.length} completed
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Analytics
