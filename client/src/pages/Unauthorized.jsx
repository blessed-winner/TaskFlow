import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex flex-col justify-center items-center px-6'>
      <div className='panel max-w-lg w-full rounded-3xl p-10 text-center'>
        <h1 className='font-semibold text-red-700 text-7xl mb-4'>401</h1>
        <h3 className='font-semibold text-2xl text-slate-800 mb-3'>You are not authenticated</h3>
        <p className='text-slate-600 mb-6'>Sign in with a valid account to access this workspace.</p>
        <button onClick={() => navigate('/auth')} className='primary-btn rounded-xl px-6 py-2.5 font-semibold cursor-pointer'>
          Go to Sign In
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
