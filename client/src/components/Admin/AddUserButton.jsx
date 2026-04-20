import { UserPlus } from 'lucide-react'

const AddUserButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className='btn-modern-vintage btn-solid'
    >
      <UserPlus className='h-4 w-4' />
      <span>Provision New Agent</span>
    </button>
  )
}

export default AddUserButton

