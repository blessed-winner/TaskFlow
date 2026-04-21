import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import ThemeToggle from '../ThemeToggle'

const HomeNav = () => {
  const navigate = useNavigate()
  const { scrollToFeatures } = useAppContext()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleNavigation = () => {
    const role = user?.role
    if (role === 'ADMIN') navigate('/admin')
    if (role === 'MANAGER') navigate('/manager')
    if (role === 'USER') navigate('/user')
  }

  const scrollToSystem = () => {
    const systemSection = document.getElementById('system-overview')
    systemSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className='fixed top-4 inset-x-4 md:inset-x-8 max-w-7xl mx-auto z-[100] h-[74px] px-6 md:px-8 border flex items-center transition-colors' style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className='w-full flex justify-between items-center'>
        
        {/* Brand */}
        <div className='flex items-center gap-3 cursor-pointer group shrink-0' onClick={() => navigate('/')}>
          <div className='w-1.5 h-1.5 transition-transform group-hover:scale-150' style={{ background: 'var(--color-text)' }}></div>
          <h1 className='text-xs md:text-sm tracking-[0.3em] font-bold uppercase transition-colors' style={{ color: 'var(--color-text)' }}>
            <span className='md:hidden'>TF</span>
            <span className='hidden md:inline'>TaskFlow</span>
          </h1>
        </div>

        {/* Center Nav (Desktop Only) */}
        <nav className='hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold'>
          <button onClick={scrollToSystem} className='hover:opacity-100 opacity-50 transition-opacity' style={{ color: 'var(--color-text)' }}>
            Data
          </button>
          <button onClick={scrollToFeatures} className='hover:opacity-100 opacity-50 transition-opacity' style={{ color: 'var(--color-text)' }}>
            Index
          </button>
        </nav>

        {/* Right Actions */}
        <div className='flex items-center gap-4 shrink-0'>
          <ThemeToggle />
          
          <div className='w-px h-4 bg-gray-500 opacity-30'></div>
          
          {token && user ? (
            <button 
              onClick={handleNavigation} 
              className='text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 btn-invert'
            >
              Enter
            </button>
          ) : (
            <div className='flex items-center gap-4'>
              <button 
                onClick={() => navigate('/auth')} 
                className='hidden sm:block text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity' 
                style={{ color: 'var(--color-text)' }}
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className='text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 btn-solid'
              >
                Start
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default HomeNav
