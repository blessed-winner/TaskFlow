import { Lock, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
   const{ axios,setToken } = useAppContext()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()
    const handleFormSubmit = (e) => {
       e.preventDefault()
    }

    const handleAuth = async () => {
         const formData = {
            email,
            password
         }
         try {
            const { data } = await axios.post('/api/auth/login',formData)
            if(data.success){
               setToken(data.token)
               localStorage.setItem('token',data.token)
               localStorage.setItem('user',JSON.stringify(data.user))
               axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
               if(data.user.role === 'ADMIN') navigate('/admin')
               else if(data.user.role === 'MANAGER') navigate('/manager')
               else if(data.user.role === 'USER') navigate('/user')
               toast.success(`Welcome back, ${data.user.fName}`)
            }else{
               toast.error(data.message)
            }
         } catch (error) {
             toast.error(error.message)
         }
    }
  return (
    <div className='bg-blue-50/50 inset-0 flex justify-center items-center fixed flex-col'>
        <div className='mb-8 flex flex-col items-center space-y-4'>
            <span className='bg-blue-700 mb-8 p-5 rounded-full flex '>
               <LogIn className='w-8 h-8 text-white'/>
            </span>
            <h2 className='text-3xl text-gray-900 font-semibold'>TaskFlow</h2>
            <p className='text-gray-600'>Sign in to your account</p>
       </div>
      <form onSubmit={handleFormSubmit} className='bg-white px-7 py-8 space-y-5 rounded-lg max-w-sm w-full'>
         <div className='space-y-3'>
            <h5 className='font-semibold text-xs text-gray-800'>Email address</h5>
            <span className='flex gap-2 border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' >
                <Mail className='w-4 text-gray-500'/>
               <input type="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' className='outline-none text-sm'/>
            </span>
            </div>
         <div className='space-y-3'>
            <h5 className='text-xs font-semibold text-gray-800'>Password</h5>
            <span  className='flex gap-2 border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' >
              <Lock className='w-4 text-gray-500'/>
              <input type="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter your password' className='outline-none text-sm'/>
            </span>
            </div>
            <button onClick={handleAuth} className='w-full bg-blue-700 py-3 rounded-md text-white text-sm mt-2 cursor-pointer hover:bg-blue-600 transition-all'>Sign in</button>
      </form>   
    </div>
  )
}

export default Login