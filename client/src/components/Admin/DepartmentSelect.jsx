import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const DepartmentSelect = ({value,onChange}) => {
    const { departmentData } = useAppContext() 
   
  return (
        <select value={value} onChange={(e)=>onChange(e.target.value)} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'>
         { departmentData.map((dept,index)=>(
              <option value={dept.id} key={index}>{dept.name}</option>
         )) }
    </select>
  )
}

export default DepartmentSelect