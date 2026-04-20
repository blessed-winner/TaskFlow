import { PlusIcon } from 'lucide-react'

const AddTaskButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='btn-modern-vintage btn-solid'
    >
      <PlusIcon className='h-4 w-4' />
      <span>Create Task</span>
    </button>
  )
}

export default AddTaskButton
