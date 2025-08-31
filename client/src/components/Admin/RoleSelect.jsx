import React, { useState } from 'react'

const RoleSelect = ({ value,onChange }) => {
   const roles = [ "Admin", "Manager", "User" ]

  return (
    <select onChange={(e)=>onChange(e.target.value)} value={value} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'>
         { roles.map((role,index)=>(
              <option value={role} key={index}>{role}</option>
         )) }
    </select>
  )
}

export default RoleSelect