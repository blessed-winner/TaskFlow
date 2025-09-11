import React from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const TaskTableData = ({task,fetchTasks,fetchManagerDashboard}) => {
     
    const { axios } = useAppContext()

    const {id,title,description,dueDate,user,priority,status} = task

       const deleteTask = async () => {
        const confirm = window.confirm("Are you sure you want to delete this task ?")
        if(!confirm) return
        try {
            const { data } = await axios.delete(`/api/tasks/delete/${id}`)
            if(data.success){
              toast.success(data.message)
              await fetchTasks()
              await fetchManagerDashboard()
            } else {
              toast.error(data.message)
            }
            } catch (error) {
           toast.error(error)
        }
      
    }

  return (
    <tr className='border-b border-gray-200 bg-white text-gray-800 hover:bg-blue-100/20 transition-all'>
      <td className='py-3 px-2 xl:px-4 flex items-center gap-3'>
       
        <div className='inline-block space-y-2'>
            <h4 className='font-semibold'>{title}</h4>
            <p className='font-light text-sm text-gray-500'>{description.length > 40 ? description.slice(0,40) + '...' : description}</p>
        </div>
       </td>
      <td className='py-3 px-2 xl:px-4 space-x-2'>
           <h1 className='text-white bg-blue-500 w-8 h-8 inline-flex items-center justify-center rounded-full'>{user.fName.slice(0,1)}</h1>
           <p className='font-light inline-block'>{user.fName + " " + user.lName}</p>
        </td>
      <td className='py-3 px-2 xl:px-4 font-light max-md:hidden'>
        <span className={`px-2.5 py-1 rounded-full font-medium text-xs capitalize ${status.toLowerCase() === 'in progress' && 'text-blue-800 bg-blue-100/50'} 
        ${status.toLowerCase() === 'completed' && 'text-green-800 bg-green-100/50'}
        ${status.toLowerCase() === 'pending' && 'text-yellow-800 bg-yellow-100/50'}`}>{status.toLowerCase()}</span>
      </td>
      <td className='py-3 px-2 xl:px-4 max-md:hidden'>
        <span className={`px-2.5 py-1 rounded-full font-medium text-xs capitalize ${priority.toLowerCase() === 'high' && 'text-red-800 bg-red-100/40'}
        ${priority.toLowerCase() === 'medium' && 'text-orange-700 bg-orange-100/40'}
        ${priority.toLowerCase() === 'low' && 'text-yellow-800 bg-yellow-100/40'}`}>
           {priority.toLowerCase()}
        </span>
      </td>
      <td className='py-3 px-2 xl:px-4 max-md:hidden'>
        {new Date(dueDate).toLocaleDateString()}
      </td>
      <td className='py-3 px-2 xl:px-4'>
        <div className='flex gap-4 font-medium'>
            <span className='text-blue-400 text-sm cursor-pointer hover:text-blue-500 transition-all'>Edit</span>
            <span onClick={deleteTask} className='text-red-400 text-sm cursor-pointer hover:text-red-500 transition-all'>Delete</span>
        </div>
      </td>
    </tr>
  )
}

export default TaskTableData