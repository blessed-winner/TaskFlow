import React from 'react'
import {Plus} from 'lucide-react'


const AddDepartmentButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='bg-blue-700 rounded-lg flex items-center gap-1 px-2.5 py-2 cursor-pointer text-white h-10 font-light text-sm'>
        <Plus className='h-4 w-4'/>
        Add Department
    </button>
  )
}

export default AddDepartmentButton