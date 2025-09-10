import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const TeamOverview = () => {
  const { axios,users } = useAppContext()
  const[userData,setUserData] = useState([])
  const[loading,setLoading] = useState(true)

 
  useEffect(()=>{
    const fetchRoleUsers = async () => {
       const userRoleUsers = users.filter(user => user.role === 'USER')
      setUserData(userRoleUsers)
      setLoading(false)
    }
   if(users.length > 0){
      fetchRoleUsers()
    }
    
  },[users])

  if (loading) {
    return (
      <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
        <h1 className='font-semibold text-2xl mb-5'>Team Overview</h1>
        <div className='flex items-center justify-center h-64'>
          <div className='text-gray-500'>Loading team data...</div>
        </div>
      </div>
    )
  }

  return (
  <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
       <h1 className='font-semibold text-2xl mb-5'>Team Overview</h1> 
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5'>
              {userData.map((user,index)=>{
                const totalTasks = user.tasks?.length || 0
                const completedTasks = user.tasks?.filter(t => t.status === 'COMPLETED').length || 0
                const pendingTasks = user.tasks?.filter(t => t.status === 'PENDING').length || 0
                const progress = totalTasks > 0 ? Math.floor((completedTasks/totalTasks) * 100) : 0
                return(
                  <div key={index} className='bg-white px-5 py-4 rounded-lg shadow'>
                   <div className='flex space-x-2'>
                    <span className='bg-blue-600 text-white w-12 rounded-full flex justify-center items-center h-12'>{user.fName?.slice(0,1) || 'U'}</span>
                     <span>
                       <h4 className='font-medium text-lg'>{user.fName + " " + user.lName}</h4>
                       <p className='font-light text-sm text-gray-600'>{user.department?.name || 'No Department'}</p>
                     </span>
                     </div>
                   <div className='space-y-2 text-sm mt-4 font-light text-gray-600'>
                    <div className='flex justify-between'>
                      <p>Total Tasks</p>
                      <p className='font-medium text-gray-800'>{totalTasks}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p>Completed</p>
                      <p className='text-green-600 font-medium'>{completedTasks}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p>Pending</p>
                      <p className='text-yellow-600 font-medium'>{pendingTasks}</p>
                    </div>
                   </div>
                   <div className='mt-6'>
                     <div className='flex justify-between'>
                      <p className='text-sm font-light'>Progress</p>
                       <p className='text-sm font-light'>{progress}%</p>
                       </div>
                     <div className='min-w-full bg-gray-200 rounded-full h-1.5 mt-2'>
                             <div 
                               className='bg-blue-500 h-1.5 rounded-full transition-all duration-300'
                               style={{width:`${progress}%`}}
                             ></div>
                       </div>
                   </div>
                </div>
                )
})}
         </div>
       </div>
  )
}

export default TeamOverview