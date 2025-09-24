import React from 'react'
import { useNavigate } from 'react-router-dom'


const Hero = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

    const handleNavigation = () => {
       const role = user.role
       if(role === 'ADMIN') navigate('/admin')
       if(role === 'MANAGER' ) navigate('/manager')
       if(role === 'USER') navigate('user')
  }

  return (
    <section className='relative min-h-screen flex items-center bg-blue-50/50'>
        <div className='grid grid-cols-1 lg:grid-cols-2 m-10 gap-12 items-center'>
            <div className='space-y-4'>
               <h1 className='text-4xl md:text-6xl font-bold'>Organize your <span className='text-indigo-500'>tasks</span> like never before</h1>
               <p className='text-xl text-gray-700 max-w-lg'>Streamline your workflow, boost productivity, and achieve your goals with our intuitive task management platform</p>
               <div className='flex gap-3 items-center'>
                  {
                     token && user ? <button onClick={handleNavigation} className='px-6 py-3 font-medium text-white rounded-lg border-2 bg-gradient-to-tl from-indigo-700 via-purple-500 to-pink-600 hover:scale-102 transition-all cursor-pointer'>Go to Dashboard</button> 
                    :<>
                      <button className='px-5 py-12 bg-indigo-500 text-white font-medium rounded-full hover:scale-102 transition cursor-pointer animate-[spin_5s_linear_infinite]'>Get Started</button>
                     <button onClick={()=>navigate('/auth')} className='w-25 py-2 font-medium text-indigo-500 rounded-lg border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer'>Sign In</button>
                    </>
                  
                  }
                  
               </div>
              </div>
            <div>
                <img src="/images/hero-dashboard.jpg" alt="" className='rounded-2xl' />
            </div>
             </div>
    </section>
  )
}

export default Hero