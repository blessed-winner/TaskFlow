import { Lock, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { axios, setToken, setAuthUser } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleAuth = async () => {
    const formData = {
      email,
      password,
    }
    try {
      const { data } = await axios.post('/api/auth/login', formData)
      if (data.success) {
        setToken(data.token)
        setAuthUser(data.user)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        if (data.user.role === 'ADMIN') navigate('/admin')
        else if (data.user.role === 'MANAGER') navigate('/manager')
        else if (data.user.role === 'USER') navigate('/user')
        toast.success(`Welcome back, ${data.user.fName}`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center px-4'>
      <div className='panel w-full max-w-md rounded-3xl p-8'>
        <div className='mb-8 flex flex-col items-center space-y-3'>
          <span className='bg-blue-600 p-4 rounded-2xl flex'>
            <LogIn className='w-7 h-7 text-white' />
          </span>
          <h2 className='text-3xl text-slate-900 font-semibold'>Welcome Back</h2>
          <p className='text-slate-600 text-sm'>Sign in to continue to TaskFlow</p>
        </div>
        <form onSubmit={handleFormSubmit} className='space-y-4'>
          <div className='space-y-1.5'>
            <label className='font-semibold text-xs text-slate-700'>Email address</label>
            <div className='flex gap-2 border border-blue-100 w-full px-4 py-2.5 rounded-xl items-center bg-white'>
              <Mail className='w-4 text-slate-500' />
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='outline-none text-sm w-full' />
            </div>
          </div>
          <div className='space-y-1.5'>
            <label className='font-semibold text-xs text-slate-700'>Password</label>
            <div className='flex gap-2 border border-blue-100 w-full px-4 py-2.5 rounded-xl items-center bg-white'>
              <Lock className='w-4 text-slate-500' />
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className='outline-none text-sm w-full' />
            </div>
          </div>
          <button onClick={handleAuth} className='w-full primary-btn py-3 rounded-xl text-white text-sm mt-2 cursor-pointer font-semibold'>
            Sign In
          </button>
          <p className='text-center text-sm text-slate-600'>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} className='text-blue-600 font-semibold cursor-pointer'>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
