import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='px-6 md:px-8 pb-12 mt-12'>
      <div className='max-w-7xl mx-auto card-vintage bg-white/60 backdrop-blur p-8 md:p-12'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-10'>
          <div className='max-w-xl'>
            <div className='flex items-center gap-4 mb-4'>
              <span className='ornament w-8'></span>
              <p className='text-[10px] uppercase tracking-[0.3em] font-black' style={{ color: 'var(--color-accent)' }}>final entry</p>
            </div>
            <h3 className='text-3xl md:text-4xl font-normal' style={{ color: 'var(--color-text)' }}>Commence Archival Journey?</h3>
            <p className='text-text-muted mt-4 italic text-lg'>Establish your departmental ledger and begin the process of historical coordination.</p>
          </div>
          <div className='flex flex-wrap gap-6'>
            <button onClick={() => navigate('/signup')} className='btn-modern-vintage btn-solid px-8 py-3 text-lg'>
              enroll now
            </button>
            <button onClick={() => navigate('/auth')} className='btn-modern-vintage px-8 py-3 text-lg'>
              authenticate
            </button>
          </div>
        </div>
        <div className='mt-12 pt-8 border-t-2 flex flex-col md:flex-row justify-between gap-6' style={{ borderColor: 'var(--color-border)' }}>
          <div className='flex items-center gap-4'>
            <span className='text-xl tracking-tight italic font-normal' style={{ color: 'var(--color-text)' }}>TaskFlow</span>
            <span className='w-px h-4 opacity-20' style={{ background: 'var(--color-text)' }}></span>
            <span className='text-[10px] uppercase tracking-widest font-black opacity-40'>est. 2026</span>
          </div>
          <span className='text-[10px] uppercase tracking-widest font-black opacity-40'>&copy; {new Date().getFullYear()} all records reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
