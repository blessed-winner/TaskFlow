import React, { useState } from 'react'
import UserTableData from '../../components/Admin/UserTableData'
import { useAppContext } from '../../context/AppContext'
import AddUserButton from '../../components/Admin/AddUserButton'
import AddUserForm from '../../components/Admin/AddUserForm'
import UpdateUserForm from '../../components/Admin/UpdateUserForm'

const User = () => {

  const{users,fetchUsers,fetchDashboardData,setUsers} = useAppContext()
  const [ showForm,setShowForm  ] = useState(false)
  const [ showUpdateForm,setShowUpdateForm ] = useState(false)
  const[selectedUser,setSelectedUser] = useState(null)

   const handleUserAdd = (newUser) => {
      setUsers((users) => [...users,newUser])
  }
  const handleUserUpdate = (updatedUser) => {
    setUsers((users) => [...users,updatedUser])
  }
  return (    
  <div className='ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
     {showForm && <AddUserForm onClose={()=>setShowForm(false)} onUserAdded={handleUserAdd} fetchDashboard={fetchDashboardData}/>}
      {showUpdateForm && selectedUser && <UpdateUserForm user={selectedUser} onClose={()=>setShowUpdateForm(false)} onUserUpdated={handleUserUpdate} fetchDashboard={fetchDashboardData} fetchUsers={fetchUsers}/>}
          <div className='flex justify-between'>
         <h1 className='font-semibold text-2xl text-gray-900 mb-6'>User Management</h1>
         <AddUserButton onClick = {()=>setShowForm(true)}/>
      </div>
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
              <UserTableData user={user} key={index} fetchUsers={fetchUsers} fetchDashboard={fetchDashboardData}
              onShowUpdateForm={()=>setShowUpdateForm(true)} setSelectedUser={setSelectedUser}/>
     ))}
         </tbody>
       </table>
       </div>
       </div>

  )
}

export default User