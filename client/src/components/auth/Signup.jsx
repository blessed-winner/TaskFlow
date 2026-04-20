import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { axios, setToken, setAuthUser } = useAppContext()
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [deptId, setDeptId] = useState('')
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get('/api/departments/All')
        if (data.success) {
          setDepartments(data.departments)
        }
      } catch (error) {
        setDepartments([])
      }
    }
    fetchDepartments()
  }, [axios])

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleAuth = async () => {
    const formData = {
      fName,
      lName,
      email,
      password,
      deptId,
    }
    console.log('[Auth] Attempting signup for:', email);
    try {
      const { data } = await axios.post('/api/auth/signup', formData)
      if (data.success) {
        console.log('[Auth] Signup successful for:', data.user.email);
        setToken(data.token)
        setAuthUser(data.user)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        if (data.user.role === 'ADMIN') navigate('/admin')
        else if (data.user.role === 'MANAGER') navigate('/manager')
        else if (data.user.role === 'USER') navigate('/user')
        toast.success(`Welcome, ${data.user.fName}`)
      } else {
        console.warn('[Auth] Signup failed:', data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error('[Auth] Signup error:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center px-4 py-20 overflow-hidden relative'>
      <div className='card-vintage w-full max-w-2xl fade-in-slide bg-white/80 backdrop-blur-md relative z-10'>
        <div className='mb-12 flex flex-col items-center space-y-4'>
          <div className='flex items-center gap-4'>
            <span className='ornament w-8'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>registration</p>
          </div>
          <h2 className='text-5xl font-normal text-center' style={{ color: 'var(--color-text)' }}>Operative Enrollment</h2>
          <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>Join the coordination network.</p>
        </div>
        <form onSubmit={handleFormSubmit} className='space-y-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='space-y-1'>
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>First Name</label>
              <input 
                type='text' 
                value={fName} 
                onChange={(e) => setFName(e.target.value)} 
                placeholder='John' 
                className='input-vintage w-full' 
              />
            </div>
            <div className='space-y-1'>
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Last Name</label>
              <input 
                type='text' 
                value={lName} 
                onChange={(e) => setLName(e.target.value)} 
                placeholder='Doe' 
                className='input-vintage w-full' 
              />
            </div>
          </div>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Secure Email</label>
            <input 
              type='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='agent@taskflow.io' 
              className='input-vintage w-full' 
            />
          </div>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Master Passphrase</label>
            <input 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='••••••••' 
              className='input-vintage w-full' 
            />
          </div>
          <div className='space-y-4'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Department Assignment</label>
            <select 
              value={deptId} 
              onChange={(e) => setDeptId(e.target.value)} 
              className='input-vintage w-full bg-transparent appearance-none cursor-pointer font-serif text-lg'
            >
              <option value='' disabled style={{ background: 'var(--color-surface)' }}>
                Select Department...
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id} style={{ background: 'var(--color-surface)' }}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAuth} className='w-full btn-modern-vintage btn-solid justify-center py-4 text-xl mt-6'>
            enroll operative
          </button>
          <div className='pt-8 border-t flex flex-col items-center gap-4' style={{ borderColor: 'var(--color-border)' }}>
            <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>
              already enrolled?
            </p>
            <span onClick={() => navigate('/auth')} className='text-sm font-serif cursor-pointer hover:text-accent transition-colors' style={{ color: 'var(--color-text)' }}>
              Identify yourself at the checkpoint
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
