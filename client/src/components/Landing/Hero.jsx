import { useNavigate } from 'react-router-dom'

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
    <section className='relative min-h-screen pt-32 md:pt-48 pb-20'>
      <div className='max-w-7xl mx-auto px-4 md:px-12'>
        
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8'>
          {/* Main Typography Column */}
          <div className='lg:col-span-8 flex flex-col justify-start'>
            <div className='border-l-2 pl-4 mb-12' style={{ borderColor: 'var(--color-text)' }}>
              <p className='text-[10px] uppercase tracking-[0.3em] font-bold font-sans' style={{ color: 'var(--color-text)' }}>
                System Initialize: 2026/TF
              </p>
            </div>

            <h1 className='text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase mb-8' style={{ color: 'var(--color-text)' }}>
              <span className='font-sans font-black tracking-tighter'>Task</span> <br/>
              <span className='ml-12 md:ml-24 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Flow.</span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12'>
              <p className='text-sm leading-relaxed font-sans font-medium md:max-w-sm' style={{ color: 'var(--color-text)' }}>
                A structural approach to team coordination. Stripped of the unnecessary. Built for scale.
              </p>
              
              <div className='flex flex-col items-start gap-4'>
                {token && user ? (
                  <button onClick={handleNavigation} className='w-full md:w-auto border py-4 px-8 text-xs uppercase tracking-widest font-bold btn-invert' style={{ borderColor: 'var(--color-text)' }}>
                    Access Console
                  </button>
                ) : (
                  <>
                    <button onClick={() => navigate('/signup')} className='w-full md:w-auto border py-4 px-8 text-xs uppercase tracking-widest font-bold btn-solid'>
                      Initialize
                    </button>
                    <button onClick={() => navigate('/auth')} className='w-full md:w-auto py-4 px-8 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity whitespace-nowrap'>
                      Authenticate
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Data Readout Column */}
          <div className='lg:col-span-4 flex flex-col justify-start lg:mt-[4.5rem]'>
            <div className='border p-6' style={{ borderColor: 'var(--color-border)', background: 'transparent' }}>
              <div className='border-b pb-4 mb-6 flex justify-between' style={{ borderColor: 'var(--color-border)' }}>
                <div>
                  <h3 className='text-sm uppercase tracking-widest font-bold' style={{ color: 'var(--color-text)' }}>Ledger</h3>
                  <p className='text-[10px] uppercase tracking-[0.2em] mt-1' style={{ color: 'var(--color-text-muted)' }}>Vol. i</p>
                </div>
                <div className='text-right'>
                  <p className='text-[10px] uppercase tracking-widest font-medium' style={{ color: 'var(--color-text-muted)' }}>Sync</p>
                  <div className='flex items-center gap-1.5 mt-1 justify-end'>
                    <span className='w-1.5 h-1.5 rounded-none' style={{ background: 'var(--color-text)' }}></span>
                    <p className='text-[10px] font-bold uppercase' style={{ color: 'var(--color-text)' }}>OK</p>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                {[
                  { id: '01', label: 'Archival Systems', status: 'Process' },
                  { id: '02', label: 'Manuscript Review', status: 'Queued' },
                  { id: '03', label: 'Protocol Alpha', status: 'Verified' }
                ].map((item, i) => (
                  <div key={i} className='flex justify-between items-end border-b border-dashed pb-2' 
                       style={{ borderColor: 'var(--color-text-muted)' }}>
                    <div className='flex gap-4 items-end'>
                      <span className='text-[9px] font-mono' style={{ color: 'var(--color-text-muted)' }}>{item.id}</span>
                      <p className='text-xs uppercase tracking-widest font-bold' style={{ color: 'var(--color-text)' }}>{item.label}</p>
                    </div>
                    <span className='text-[10px] uppercase tracking-[0.2em]' style={{ color: 'var(--color-text)' }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className='mt-8 pt-4 flex justify-between items-center py-2 px-4' style={{ background: 'var(--color-text)', color: 'var(--color-background)' }}>
                <p className='text-[10px] uppercase tracking-[0.2em] font-bold'>
                  Agents Active
                </p>
                <p className='text-xs font-mono font-bold'>
                  24.0
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
