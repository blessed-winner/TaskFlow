import React, { useEffect, useState } from 'react'
import UserTableData from '../../components/Admin/UserTableData'
import { user_data } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const User = () => {

  const{users} = useAppContext()

 
  return (    <div className='ml-54 mt-16.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
       <h1 className='font-semibold text-2xl mb-5'>User Management</h1>
       <div className='max-w-5xl scrollbar-hide rounded-lg overflow-x-auto h-4/5'>
         <table className='w-full text-sm'>
         <thead className='px-4 py-2.5 text-gray-500 uppercase text-xs bg-blue-100/20 text-left'>
            <tr>
              <th className='py-3 px-2 xl:px-4 font-medium'>user</th>
              <th className='py-3 px-2 xl:px-4 font-medium'>role</th>
              <th className='py-3 px-2 xl:px-4 font-medium max-md:hidden'>department</th>
              <th className='py-3 px-2 xl:px-4 font-medium max-md:hidden'>status</th>
              <th className='py-3 px-2 xl:px-4 font-medium'>actions</th>
            </tr>
         </thead>
         <tbody>
             {users.map((user,index)=>(
              <UserTableData user={user} key={index} fetchUsers={fetchUsers}/>
     ))}
         </tbody>
       </table>
       </div>
       </div>

  )
}

export default User