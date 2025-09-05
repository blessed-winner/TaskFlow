import React, { useState } from 'react'
import { Flag, Users, X } from 'lucide-react'
import RoleSelect from './RoleSelect'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import DepartmentSelect from './DepartmentSelect'

const AddUserForm = ({onClose,onUserAdded,fetchDashboard}) => {

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const[departmentId,setDepartmentId] = useState(null)
  const[password,setPassword] = useState("")
  const[role,setRole] = useState("User")

    const { axios } = useAppContext()
    const handleSubmit = (e) => {
     e.preventDefault()
    }

    const handleAddUser = async() => {
      if(!firstName || !lastName || !email || !role || !departmentId ){
        toast.error("All fields are required")
        return;
      }
      const formData = {
        fName:firstName,
        lName:lastName,
        email,
        password,
        role,
        deptId:departmentId
      }
      try {
        const { data } = await axios.post('/api/users/add-user',formData)
        data.success ? toast.success(data.message) : toast.error(data.message)
        onUserAdded(data.user)
        fetchDashboard()

        setFirstName("")
        setLastName("")
        setEmail("")
        setDepartmentId(null)
        setRole("User")

      } catch (error) {
         toast.error(error.message)
      }
    }
  return (
     <div className='inset-0 flex justify-center bg-black/40 items-center fixed z-50'>
        <form onSubmit={handleSubmit} className='bg-white  max-w-2xl w-full overflow-auto h-4/5 rounded-lg shadow-md px-7 py-6 text-gray-800 space-y-3'>
          <div className='flex justify-between py-4 border-b border-gray-300 mb-5'>
          <h2 className='font-medium text-2xl'>Add New User Account</h2>
          <X onClick={onClose} className='font-light text-gray-500 cursor-pointer'/>
         </div>
           <div className='w-full space-y-2 flex justify-between'>
            <div>
               <h5 className='font-medium text-sm'>First Name *</h5>
             <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='Enter First Name' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none min-w-75'/>
            </div>

            <div>
               <h5 className='font-medium text-sm'>Last Name *</h5>
             <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Enter Last Name' className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none min-w-75'/>
            </div>
             </div>
           <div className='space-y-2'>
             <h5 className='font-medium text-sm'>Email Address *</h5>
             <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' placeholder='Enter Email Address'/>
           </div>

           <div className='space-y-2'>
             <h5 className='font-medium text-sm'>Password *</h5>
             <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none' placeholder='Enter Email Address'/>
           </div>

           <div className='space-y-2'>
              <span className='flex items-center'>
            <Flag className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Role *</h5>
            </span>
            <RoleSelect value={role} onChange={setRole}/>
            </div>
            <div className='space-y-2'>
           <span className='flex items-center'>
            <Users className='mr-1 w-4'/>
             <h5 className='font-medium text-sm'>Department *</h5>
            </span>
            <DepartmentSelect value={departmentId} onChange={setDepartmentId}/>
            </div>
            <div className='w-full flex justify-end gap-3 py-4 border-t border-gray-300 mt-5'>
              <button onClick={onClose} className='border px-3.5 py-2.5 rounded-md border-gray-300 text-gray-500 font-light cursor-pointer'>Cancel</button>
              <button onClick={handleAddUser} className='bg-blue-600 text-white font-light px-3.5 py-2.5 rounded-md hover:bg-blue-700 transition-all cursor-pointer'>Add User</button>
            </div>
        </form>
    </div>
  )
}

export default AddUserForm