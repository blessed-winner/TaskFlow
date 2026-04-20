import { Plus } from 'lucide-react'

const AddDepartmentButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='btn-modern-vintage btn-solid'
    >
      <Plus className='h-4 w-4' />
      <span>Add Department</span>
    </button>
  )
}

export default AddDepartmentButton
