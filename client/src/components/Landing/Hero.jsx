import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock3, Layers3, Target } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleNavigation = () => {
    const role = user.role
    if (role === 'ADMIN') navigate('/admin')
    if (role === 'MANAGER') navigate('/manager')
    if (role === 'USER') navigate('/user')
  }

  return (
    <section className='relative min-h-screen flex items-center pt-28 pb-18 bg-gradient-to-b from-cyan-50/70 via-white to-amber-50/50'>
      <div className='max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 items-center'>
        <div className='space-y-7'>
          <div className='inline-flex items-center gap-2 rounded-full bg-cyan-100 text-cyan-800 px-4 py-1.5 text-xs font-semibold'>
            <Layers3 className='w-4 h-4' />
            Role-based task operating system
          </div>

          <h1 className='text-4xl md:text-6xl font-bold leading-tight text-slate-900'>
            One workspace for
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-amber-500'> teams, tasks, and execution</span>
          </h1>

          <p className='text-lg text-slate-600 max-w-xl'>
            TaskFlow gives Admins, Managers, and Users one connected system for planning, delegation, and completion tracking in real time.
          </p>

          <div className='flex flex-wrap gap-3'>
            {token && user ? (
              <button onClick={handleNavigation} className='rounded-xl px-8 py-3 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg shadow-cyan-900/20 cursor-pointer'>
                Open Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/signup')} className='rounded-xl px-8 py-3 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg shadow-cyan-900/20 cursor-pointer'>
                  Create Account
                </button>
                <button onClick={() => navigate('/auth')} className='rounded-xl px-8 py-3 font-semibold text-slate-700 border border-slate-300 bg-white cursor-pointer hover:bg-slate-50'>
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className='grid grid-cols-2 gap-3 max-w-md pt-2'>
            <div className='rounded-xl bg-white border border-cyan-100 p-3'>
              <p className='text-xs text-slate-500'>Live Status</p>
              <p className='text-xl font-bold text-slate-900'>24/7</p>
            </div>
            <div className='rounded-xl bg-white border border-cyan-100 p-3'>
              <p className='text-xs text-slate-500'>Role Access</p>
              <p className='text-xl font-bold text-slate-900'>Admin / Manager / User</p>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-300/35 via-blue-200/30 to-amber-200/35 blur-2xl'></div>
          <div className='relative rounded-3xl border border-cyan-100 bg-white/90 backdrop-blur p-6 shadow-2xl shadow-slate-900/10'>
            <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
              <h3 className='text-lg font-bold text-slate-900'>Execution Snapshot</h3>
              <span className='text-xs font-semibold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-full'>Live</span>
            </div>

            <div className='mt-4 space-y-3'>
              <div className='rounded-xl bg-slate-50 border border-slate-100 p-3 flex justify-between items-center'>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>Backend API migration</p>
                  <p className='text-xs text-slate-500'>Assigned by Manager</p>
                </div>
                <span className='text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full flex items-center gap-1'>
                  <Clock3 className='w-3.5 h-3.5' /> In Progress
                </span>
              </div>

              <div className='rounded-xl bg-slate-50 border border-slate-100 p-3 flex justify-between items-center'>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>UI approval workflow</p>
                  <p className='text-xs text-slate-500'>Queued by Admin</p>
                </div>
                <span className='text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full flex items-center gap-1'>
                  <Target className='w-3.5 h-3.5' /> Pending
                </span>
              </div>

              <div className='rounded-xl bg-slate-50 border border-slate-100 p-3 flex justify-between items-center'>
                <div>
                  <p className='text-sm font-semibold text-slate-900'>Auth + role checks</p>
                  <p className='text-xs text-slate-500'>Completed by User</p>
                </div>
                <span className='text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full flex items-center gap-1'>
                  <CheckCircle2 className='w-3.5 h-3.5' /> Complete
                </span>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-3 gap-2'>
              <div className='rounded-lg bg-cyan-50 border border-cyan-100 p-2 text-center'>
                <p className='text-xs text-slate-500'>Total</p>
                <p className='text-lg font-bold text-slate-900'>128</p>
              </div>
              <div className='rounded-lg bg-emerald-50 border border-emerald-100 p-2 text-center'>
                <p className='text-xs text-slate-500'>Done</p>
                <p className='text-lg font-bold text-emerald-700'>92</p>
              </div>
              <div className='rounded-lg bg-amber-50 border border-amber-100 p-2 text-center'>
                <p className='text-xs text-slate-500'>Due Soon</p>
                <p className='text-lg font-bold text-amber-700'>11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
