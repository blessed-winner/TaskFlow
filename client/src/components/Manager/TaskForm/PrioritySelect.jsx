import React, { useState } from 'react'

const PrioritySelect = () => {
   const priorities = [ "Low", "Medium", "High" ]
   const [selectedPriority,setSelectedPriority] = useState("Medium")
   const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value)
   }
  return (
    <select onChange={handlePriorityChange} value={selectedPriority} className='border border-gray-300 w-full px-4 py-2.5 rounded-md font-light outline-none'>
         { priorities.map((priority,index)=>(
              <option value={priority}>{priority}</option>
         )) }
    </select>
  )
}

export default PrioritySelect