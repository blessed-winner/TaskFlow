import React, { useState } from 'react'

const RoleSelect = () => {
   const roles = [ "Admin", "Manager", "User" ]
   const [selectedRole,setSelectedRole] = useState("User")
   const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
   }
  return (
    <select onChange={handleRoleChange} value={selectedRole} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'>
         { roles.map((role,index)=>(
              <option value={role} key={index}>{role}</option>
         )) }
    </select>
  )
}

export default RoleSelect