import { useState } from 'react'
import ReactDOM from 'react-dom'
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
    console.log('[Admin] Attempting to add user:', email);
    try {
      const { data } = await axios.post('/api/users/admin/add-user', formData)
      if (data.success) {
        console.log('[Admin] User added successfully:', data.user.email);
        toast.success(data.message);
        onUserAdded(data.user)
        fetchDashboard()

        setFirstName('')
        setLastName('')
        setEmail('')
        setDepartmentId(null)
        setRole('User')
      } else {
        console.warn('[Admin] Failed to add user:', data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error('[Admin] Error adding user:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return ReactDOM.createPortal(
    <div className='inset-0 flex justify-center items-center fixed z-[200] px-4' style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
      <form onSubmit={handleSubmit} className='card-vintage max-w-2xl w-full overflow-auto max-h-[90vh] space-y-10 relative' style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
        <button 
          onClick={onClose} 
          className='absolute top-6 right-6 p-2 transition-colors hover:text-accent'
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X className='w-5 h-5' />
        </button>

        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <span className='ornament w-8'></span>
            <p className='text-[10px] uppercase tracking-[0.3em] font-black' style={{ color: 'var(--color-accent)' }}>formal request</p>
          </div>
          <h2 className='text-4xl italic font-normal' style={{ color: 'var(--color-text)' }}>Agent Provisioning</h2>
          <p className='text-xs uppercase tracking-widest font-bold opacity-60' style={{ color: 'var(--color-text-muted)' }}>Enter the details for the new operative below.</p>
        </div>

        <div className='grid md:grid-cols-2 gap-10'>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>First Name</label>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='e.g. Alexander' className='input-vintage w-full' />
          </div>
          <div className='space-y-1'>
            <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Last Name</label>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='e.g. Hamilton' className='input-vintage w-full' />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Email Address</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='input-vintage w-full' placeholder='agent@taskflow.io' />
        </div>

        <div className='space-y-1'>
          <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Secure Passphrase</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='input-vintage w-full' placeholder='••••••••' />
        </div>

        <div className='grid md:grid-cols-2 gap-10'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Flag className='w-3 h-3 opacity-40' />
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Security Role</label>
            </div>
            <RoleSelect value={role} onChange={setRole} />
          </div>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Users className='w-3 h-3 opacity-40' />
              <label className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>Department</label>
            </div>
            <DepartmentSelect value={departmentId} onChange={setDepartmentId} />
          </div>
        </div>

        <div className='flex justify-end gap-8 pt-8 border-t' style={{ borderColor: 'var(--color-border)' }}>
          <button onClick={onClose} className='text-xs uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity'>
            Abort
          </button>
          <button onClick={handleAddUser} className='btn-modern-vintage btn-solid'>
            confirm entry
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}

export default AddUserForm

