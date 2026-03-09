import { Plus } from 'lucide-react'

const AddDepartmentButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className='primary-btn rounded-xl flex items-center gap-1.5 px-3.5 py-2.5 cursor-pointer text-white font-semibold text-sm'>
      <Plus className='h-4 w-4' />
      Add Department
    </button>
  )
}

export default AddDepartmentButton

