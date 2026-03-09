import { useState } from 'react'
import { Flag, Users, X } from 'lucide-react'
import RoleSelect from './RoleSelect'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import DepartmentSelect from './DepartmentSelect'

const AddUserForm = ({ onClose, onUserAdded, fetchDashboard }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState(null)
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('User')

  const { axios } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddUser = async () => {
    if (!firstName || !lastName || !email || !role || !departmentId) {
      toast.error('All fields are required')
      return
    }
    const formData = {
      fName: firstName,
      lName: lastName,
      email,
      password,
      role,
      deptId: departmentId,
    }
    try {
      const { data } = await axios.post('/api/users/admin/add-user', formData)
      data.success ? toast.success(data.message) : toast.error(data.message)
      onUserAdded(data.user)
      fetchDashboard()

      setFirstName('')
      setLastName('')
      setEmail('')
      setDepartmentId(null)
      setRole('User')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='inset-0 flex justify-center bg-slate-900/45 items-center fixed z-50 px-4'>
      <form onSubmit={handleSubmit} className='panel max-w-2xl w-full overflow-auto max-h-[85vh] rounded-2xl px-7 py-6 text-slate-800 space-y-4'>
        <div className='flex justify-between py-2 border-b border-cyan-100 mb-1'>
          <h2 className='font-semibold text-2xl text-slate-900'>Add New User Account</h2>
          <X onClick={onClose} className='text-slate-500 cursor-pointer' />
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <h5 className='font-semibold text-sm mb-1.5'>First Name *</h5>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter First Name' className='form-input' />
          </div>
          <div>
            <h5 className='font-semibold text-sm mb-1.5'>Last Name *</h5>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter Last Name' className='form-input' />
          </div>
        </div>
        <div>
          <h5 className='font-semibold text-sm mb-1.5'>Email Address *</h5>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-input' placeholder='Enter Email Address' />
        </div>

        <div>
          <h5 className='font-semibold text-sm mb-1.5'>Password *</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input' placeholder='Enter Password' />
        </div>

        <div>
          <span className='flex items-center gap-1 mb-1.5'>
            <Flag className='w-4' />
            <h5 className='font-semibold text-sm'>Role *</h5>
          </span>
          <RoleSelect value={role} onChange={setRole} />
        </div>
        <div>
          <span className='flex items-center gap-1 mb-1.5'>
            <Users className='w-4' />
            <h5 className='font-semibold text-sm'>Department *</h5>
          </span>
          <DepartmentSelect value={departmentId} onChange={setDepartmentId} />
        </div>
        <div className='w-full flex justify-end gap-3 pt-4 border-t border-cyan-100 mt-2'>
          <button onClick={onClose} className='secondary-btn px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Cancel
          </button>
          <button onClick={handleAddUser} className='primary-btn text-white px-4 py-2.5 rounded-xl font-semibold cursor-pointer'>
            Add User
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUserForm

