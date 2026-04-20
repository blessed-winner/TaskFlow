import { useAppContext } from '../../context/AppContext'

const systemInfo = [
  {
    title: 'Archival Infrastructure',
    content: 'Role-driven hierarchy where Archivists manage the directory, Curators assign tasks, and Operatives execute the protocol.',
  },
  {
    title: 'Ledger Chronology',
    content: 'A complete historical record of task evolution, from initial entry to final verification, synced across all stations.',
  },
  {
    title: 'Secure Access Points',
    content: 'Encryption and role-based authorization ensure that sensitive archives remain accessible only to verified agents.',
  },
]

const operationalModules = [
  {
    label: 'Chronicle Feed',
    description: 'Real-time synchronization of system events and operative updates.'
  },
  {
    label: 'Intelligence Ledgers',
    description: 'Deep analytical insights into departmental throughput and efficiency.'
  },
  {
    label: 'Identity Protocols',
    description: 'JWT-secured verification for all agent interactions and data requests.'
  }
]

const Features = () => {
  const { featuresRef } = useAppContext()

  return (
    <section className='px-6 md:px-8 pb-20'>
      <div id='system-overview' className='max-w-7xl mx-auto card-vintage bg-white/60 backdrop-blur p-8 md:p-12'>
        <div className='max-w-3xl'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='ornament w-12'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>operational logic</p>
          </div>
          <h2 className='text-4xl md:text-5xl font-normal text-text mt-2'>The Architecture of Coordination</h2>
          <p className='text-text-muted mt-6 text-lg italic leading-relaxed'>
            TaskFlow is a sophisticated ledger system designed for high-stakes coordination. It transcends the common to-do list by binding planning, delegation, and execution into a singular, historical record.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mt-16'>
          {systemInfo.map(({ title, content }, idx) => (
            <div key={title} className='group border-t-2 pt-8 last:border-b-0' style={{ borderColor: 'var(--color-border)' }}>
              <p className='text-[10px] font-black uppercase tracking-widest mb-4 opacity-40'>module 0{idx + 1}</p>
              <h3 className='text-2xl font-normal mb-4' style={{ color: 'var(--color-text)' }}>{title}</h3>
              <p className='text-sm text-text-muted leading-relaxed italic'>{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={featuresRef} className='max-w-7xl mx-auto mt-16'>
        <div className='card-vintage p-8 md:p-12 border-accent/20 bg-accent-soft/30'>
          <div className='flex items-center gap-4 mb-8'>
            <h3 className='text-3xl font-normal' style={{ color: 'var(--color-text)' }}>Operational Modules</h3>
            <div className='flex-1 h-px opacity-20' style={{ background: 'var(--color-text)' }}></div>
          </div>
          <div className='grid sm:grid-cols-3 gap-8'>
            {operationalModules.map((module) => (
              <div key={module.label} className='p-6 border transition-all duration-300 hover:shadow-glow' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                <p className='text-xs uppercase tracking-[0.2em] font-black mb-3' style={{ color: 'var(--color-accent)' }}>{module.label}</p>
                <p className='text-sm text-text-muted leading-relaxed'>{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
