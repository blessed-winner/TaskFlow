import React, { useEffect, useState } from 'react'
import { user_data } from '../../assets/assets'

const TeamOverview = () => {
  const [userData,setUserData] = useState([])
 
  useEffect(() => {
    const enrichedData = user_data.map(user => ({
      ...user,
      progress: user.totalTasks.length > 0 
    ? Math.floor((user.completedTasks.length * 100) / user.totalTasks.length) 
    : 0
    }))
    setUserData(enrichedData)
  }, [])

  return (
  <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
       <h1 className='font-semibold text-2xl mb-5'>Team Overview</h1> 
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5'>
              {userData.map((user,index)=>(
                <div key={index} className='bg-white px-5 py-4 rounded-lg shadow'>
                   <div className='flex space-x-2'>
                    <span className='bg-blue-600 text-white w-12 rounded-full flex justify-center items-center h-12'>{user.name.slice(0,1)}</span>
                     <span>
                       <h4 className='font-medium text-lg'>{user.name}</h4>
                       <p className='font-light text-sm text-gray-600'>{user.dept}</p>
                     </span>
                     </div>
                   <div className='space-y-2 text-sm mt-4 font-light text-gray-600'>
                    <div className='flex justify-between'>
                      <p>Total Tasks</p>
                      <p className='font-medium text-gray-800'>{user.totalTasks.length}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p>Completed</p>
                      <p className='text-green-600 font-medium'>{user.completedTasks.length}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p>Pending</p>
                      <p className='text-yellow-600 font-medium'>{user.pendingTasks.length}</p>
                    </div>
                   </div>
                   <div className='mt-6'>
                     <div className='flex justify-between'>
                      <p className='text-sm font-light'>Progress</p>
                       <p className='text-sm font-light'>{user.progress}%</p>
                       </div>
                     <div className='min-w-full bg-gray-200 rounded-full h-1.5 mt-2'>
                             <div style={{width:`${user.progress}`}}></div>
                       </div>
                   </div>
                </div>
              ))}
         </div>
       </div>
  )
}

export default TeamOverview