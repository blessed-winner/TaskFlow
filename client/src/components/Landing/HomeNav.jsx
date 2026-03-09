import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const HomeNav = () => {
  const navigate = useNavigate()
  const { scrollToFeatures } = useAppContext()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleNavigation = () => {
    const role = user.role
    if (role === 'ADMIN') navigate('/admin')
    if (role === 'MANAGER') navigate('/manager')
    if (role === 'USER') navigate('/user')
  }

  const scrollToSystem = () => {
    const systemSection = document.getElementById('system-overview')
    systemSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-30 border-b border-cyan-100/80 bg-white/75 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center'>
        <h1 onClick={() => navigate('/')} className='font-bold text-2xl tracking-tight text-slate-900 cursor-pointer'>
          TaskFlow
        </h1>

        <nav className='hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600'>
          <button onClick={scrollToSystem} className='cursor-pointer hover:text-cyan-700 transition-colors'>
            System
          </button>
          <button onClick={scrollToFeatures} className='cursor-pointer hover:text-cyan-700 transition-colors'>
            Features
          </button>
        </nav>

        <div className='flex gap-3 items-center'>
          {token && user ? (
            <button onClick={handleNavigation} className='rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 shadow-md shadow-cyan-900/20 cursor-pointer'>
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/auth')} className='rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 bg-white cursor-pointer hover:bg-slate-50'>
                Sign In
              </button>
              <button onClick={() => navigate('/signup')} className='rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 shadow-md shadow-cyan-900/20 cursor-pointer'>
                Start Free
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default HomeNav
