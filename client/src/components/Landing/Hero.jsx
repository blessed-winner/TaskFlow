import React from 'react'


const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center bg-blue-50/50'>
        <div className='grid grid-cols-1 lg:grid-cols-2 m-10 gap-12 items-center'>
            <div className='space-y-4'>
               <h1 className='text-4xl md:text-6xl font-bold'>Organize your <span className='text-indigo-500'>tasks</span> like never before</h1>
               <p className='text-xl text-gray-700 max-w-lg'>Streamline your workflow, boost productivity, and achieve your goals with our intuitive task management platform</p>
               <button className='px-5 py-12 bg-indigo-500 text-white font-medium rounded-full'>Get Started</button>
            </div>
            <div>
                <img src="/images/hero-dashboard.jpg" alt="" className='rounded-2xl' />
            </div>
             </div>
    </section>
  )
}

export default Hero