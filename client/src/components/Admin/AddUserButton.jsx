import React from 'react'
import {UserPlus} from 'lucide-react'


const AddUserButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='bg-blue-700 rounded-lg flex items-center gap-1 px-2.5 py-2 cursor-pointer text-white h-10 font-light text-sm'>
        <UserPlus className='h-4 w-4'/>
        Add User
    </button>
  )
}

export default AddUserButton