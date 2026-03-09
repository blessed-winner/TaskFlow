import { ShieldCheck, Workflow, Users2, BarChart3, BellRing, LockKeyhole } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

const systemInfo = [
  {
    icon: Users2,
    title: 'Role-driven architecture',
    content: 'Admins manage users and departments, Managers assign and monitor work, Users execute and update status.',
  },
  {
    icon: Workflow,
    title: 'End-to-end task lifecycle',
    content: 'Tasks flow from creation to in-progress to completion with dashboard updates reflected across roles.',
  },
  {
    icon: ShieldCheck,
    title: 'Controlled access',
    content: 'Route guards and role authorization keep each workspace secure and limited to the right permissions.',
  },
]

const productFeatures = [
  { icon: BellRing, label: 'Real-time notifications' },
  { icon: BarChart3, label: 'Analytics per role' },
  { icon: LockKeyhole, label: 'JWT-based auth flow' },
]

const Features = () => {
  const { featuresRef } = useAppContext()

  return (
    <section className='px-6 md:px-8 pb-20'>
      <div id='system-overview' className='max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-8 md:p-10'>
        <div className='max-w-3xl'>
          <p className='text-xs font-semibold uppercase tracking-wider text-cyan-700'>System Overview</p>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mt-2'>What this system actually gives your team</h2>
          <p className='text-slate-600 mt-3'>
            TaskFlow is not just a to-do list. It is a role-based execution system where planning, assignment, and delivery are linked in a single product.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-4 mt-8'>
          {systemInfo.map(({ icon: Icon, title, content }) => (
            <div key={title} className='rounded-2xl border border-slate-200 bg-slate-50/70 p-5'>
              <div className='w-11 h-11 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center'>
                <Icon className='w-5 h-5' />
              </div>
              <h3 className='font-semibold text-lg text-slate-900 mt-4'>{title}</h3>
              <p className='text-sm text-slate-600 mt-2 leading-6'>{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={featuresRef} className='max-w-7xl mx-auto mt-8'>
        <div className='rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-amber-50 p-6 md:p-8'>
          <h3 className='text-2xl font-bold text-slate-900'>Core capabilities</h3>
          <div className='grid sm:grid-cols-3 gap-3 mt-4'>
            {productFeatures.map(({ icon: Icon, label }) => (
              <div key={label} className='rounded-xl bg-white border border-white/60 p-4 flex items-center gap-3'>
                <Icon className='w-5 h-5 text-cyan-700' />
                <p className='text-sm font-semibold text-slate-700'>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
