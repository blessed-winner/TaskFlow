import React, { useState } from 'react'

const PrioritySelect = ({value,onChange}) => {
     const priorities = [ "Low", "Medium", "High" ]
   
  return (
    <select onChange={(e)=>onChange(e.target.value)} value={value} className='border border-gray-300 min-w-65 px-4 py-2.5 rounded-md font-light outline-none'>
         { priorities.map((priority,index)=>(
              <option value={priority} key={index}>{priority}</option>
         )) }
    </select>
  )
}

export default PrioritySelect