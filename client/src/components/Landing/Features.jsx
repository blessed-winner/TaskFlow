import React from 'react'
import { features } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Features = () => {
  const {featuresRef} = useAppContext()
  return (
    <section ref={featuresRef} className='min-h-screen flex flex-col items-center px-12 py-24 space-y-8'>
        <div className='text-center flex flex-col items-center space-y-5'>
           <h1 className='text-6xl font-bold'>Everything you need to stay <span className='text-indigo-500'>productive</span></h1>
           <p className='text-xl max-w-2xl text-gray-700'>Powerful features designed to help you manage tasks, collaborate with teams, and achieve your goals more efficiently</p>
        </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {features.map(({title,content,icon:Icon},idx)=>(
                <div key={idx} className='flex flex-col justify-center items-center space-y-6 px-6 py-5 shadow-sm rounded-lg hover:-translate-y-2 hover:shadow-lg transition-all'>
                    <span className='w-16 h-16 bg-primary flex items-center justify-center rounded-full'><Icon className='text-white'/></span>
                    <h3 className='text-gray-800 font-medium text-xl'>{title}</h3>
                    <p className='text-center text-gray-400'>{content}</p>
                </div>
            ))}
          </div>
    </section>
  )
}

export default Features