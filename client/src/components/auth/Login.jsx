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
    console.log('[Auth] Attempting login for:', email);
    try {
      const { data } = await axios.post('/api/auth/login', formData)
      if (data.success) {
        console.log('[Auth] Login successful for:', data.user.email);
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
        console.warn('[Auth] Login failed:', data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error('[Auth] Login error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center px-4 overflow-hidden relative'>
      <div className='card-vintage w-full max-w-md fade-in-slide bg-white/80 backdrop-blur-md relative z-10'>
        <div className='mb-12 flex flex-col items-center space-y-4'>
          <div className='flex items-center gap-4'>
            <span className='ornament w-8'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>authentication</p>
          </div>
          <h2 className='text-5xl font-normal text-center' style={{ color: 'var(--color-text)' }}>Identity Verification</h2>
          <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>Enter your credentials to proceed.</p>
        </div>
        <form onSubmit={handleFormSubmit} className='space-y-8'>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Email Address</label>
            <input 
              type='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='agent@taskflow.io' 
              className='input-vintage w-full' 
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Passphrase</label>
            <input 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='••••••••' 
              className='input-vintage w-full' 
            />
          </div>
          <button onClick={handleAuth} className='w-full btn-modern-vintage btn-solid justify-center py-4 text-xl mt-6'>
            authenticate
          </button>
          <div className='pt-8 border-t flex flex-col items-center gap-4' style={{ borderColor: 'var(--color-border)' }}>
            <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>
              new operative?
            </p>
            <span onClick={() => navigate('/signup')} className='text-sm font-serif cursor-pointer hover:text-accent transition-colors' style={{ color: 'var(--color-text)' }}>
              Request access to the archives
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
