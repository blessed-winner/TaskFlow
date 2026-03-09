import { useAppContext } from '../../context/AppContext'

const systemInfo = [
  {
    title: 'Role-driven architecture',
    content: 'Admins manage users and departments, Managers assign and monitor work, Users execute and update status.',
  },
  {
    title: 'End-to-end task lifecycle',
    content: 'Tasks flow from creation to in-progress to completion with dashboard updates reflected across roles.',
  },
  {
    title: 'Controlled access',
    content: 'Route guards and role authorization keep each workspace secure and limited to the right permissions.',
  },
]

const productFeatures = ['Real-time notifications', 'Analytics per role', 'JWT-based auth flow']

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
          {systemInfo.map(({ title, content }, idx) => (
            <div key={title} className='rounded-2xl border border-slate-200 bg-slate-50/70 p-5'>
              <p className='text-xs font-semibold text-cyan-700 mb-2'>0{idx + 1}</p>
              <h3 className='font-semibold text-lg text-slate-900'>{title}</h3>
              <p className='text-sm text-slate-600 mt-2 leading-6'>{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={featuresRef} className='max-w-7xl mx-auto mt-8'>
        <div className='rounded-3xl border border-cyan-100 bg-cyan-50/60 p-6 md:p-8'>
          <h3 className='text-2xl font-bold text-slate-900'>Core capabilities</h3>
          <div className='grid sm:grid-cols-3 gap-3 mt-4'>
            {productFeatures.map((label) => (
              <div key={label} className='rounded-xl bg-white border border-cyan-100 p-4'>
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
