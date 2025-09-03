import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const UserTableData = ({user,fetchUsers,fetchDashboard,onShowUpdateForm,setSelectedUser}) => {
    const{ axios } = useAppContext()
    const { id, fName, lName, email, role, department } = user
    const deleteUser = async () => {
        const confirm = window.confirm("Are you sure you want to delete this user ?")
        if(!confirm) return
        try {
            const { data } = await axios.delete(`/api/users/admin/delete/${id}`)
            if(data.success){
              toast.success(data.message)
              await fetchUsers()
              await fetchDashboard()
            } else {
              toast.error(data.message)
            }
            } catch (error) {
           toast.error(error.message)
        }
      
    }


  const[isActive,setIsActive] = useState(false)
  
  return (
    <tr className='border-b border-gray-200 bg-white text-gray-800 hover:bg-blue-100/20 transition-all'>
      <td className='py-3 px-2 xl:px-4 flex items-center gap-3'>

        <h1 className='text-white bg-blue-500 w-8 h-8 inline-flex items-center justify-center rounded-full'>{fName.slice(0,1)}</h1>
        <div className='inline-block'>
            <h4 className='font-semibold'>{fName + " " + lName}</h4>
        <p className='font-light text-xs'>{email}</p>
        </div>
       </td>
      <td className='py-3 px-2 xl:px-4 '>
        <span className={`px-2.5 py-1 rounded-full text-sm font-medium lowercase ${role.toLowerCase() === 'admin' && 'bg-purple-100 text-purple-800'} ${user.role.toLowerCase() === 'user' && 'bg-green-100 text-green-800'} ${user.role.toLowerCase() === 'manager' && 'bg-blue-100 text-blue-800'}`}>
          {role}
        </span>
        </td>
      <td className='py-3 px-2 xl:px-4 font-light max-md:hidden'>{department.name}</td>
      <td className='py-3 px-2 xl:px-4 max-md:hidden'>
        <span className={`bg-orange-200 px-2.5 py-1 rounded-full text-sm text-orange-800 font-medium ${isActive && 'bg-green-100 text-green-800'}`}>
            {isActive ? 'Active' : 'Inactive'}
            </span>
      </td>
      <td className='py-3 px-2 xl:px-4'>
        <div className='flex gap-4 font-medium'>
            <span className='text-blue-400 text-sm cursor-pointer hover:text-blue-500 transition-all' onClick={()=>{
              setSelectedUser(user)
              onShowUpdateForm()
              }}>Edit</span>
            <span className='text-red-400 text-sm cursor-pointer hover:text-red-500 transition-all' onClick={deleteUser}>Delete</span>
        </div>
      </td>
    </tr>
  )
}

export default UserTableData