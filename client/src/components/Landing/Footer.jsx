import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className='px-6 md:px-8 pb-10'>
      <div className='max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white/85 backdrop-blur p-7 md:p-9'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5'>
          <div>
            <h3 className='text-2xl font-bold text-slate-900'>Ready to run TaskFlow?</h3>
            <p className='text-slate-600 mt-1'>Launch your workspace and start managing work with clear ownership.</p>
          </div>
          <div className='flex gap-3'>
            <button onClick={() => navigate('/signup')} className='rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 cursor-pointer'>
              Get Started
            </button>
            <button onClick={() => navigate('/auth')} className='rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 bg-white cursor-pointer'>
              Sign In
            </button>
          </div>
        </div>
        <div className='mt-6 pt-5 border-t border-slate-200 text-sm text-slate-500 flex flex-col md:flex-row justify-between gap-2'>
          <span>TaskFlow</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
