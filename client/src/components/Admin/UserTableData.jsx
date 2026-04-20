import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const UserTableData = ({ user, fetchUsers, fetchDashboard, onShowUpdateForm, setSelectedUser }) => {
  const { axios } = useAppContext()
  const { id, fName, lName, email, role, department, status } = user

  const deleteUser = async () => {
    const confirm = window.confirm('Are you sure you want to remove this agent from the directory?')
    if (!confirm) return
    console.log('[Admin] Attempting to delete agent:', email);
    try {
      const { data } = await axios.delete(`/api/users/admin/delete/${id}`)
      if (data.success) {
        console.log('[Admin] Agent deleted successfully:', email);
        toast.success(data.message)
        await fetchUsers()
        await fetchDashboard()
      } else {
        console.warn('[Admin] Failed to delete agent:', data.message);
        toast.error(data.message)
      }
    } catch (error) {
      console.error('[Admin] Error deleting agent:', error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <tr className='group transition-all hover:bg-surface-hover'>
      <td className='py-5 px-6'>
        <div className='flex items-center gap-4'>
          <div className='w-10 h-10 flex items-center justify-center rounded-full text-lg font-normal border'
               style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)', borderColor: 'var(--color-border)' }}>
            {fName.slice(0, 1)}
          </div>
          <div>
            <h4 className='font-normal text-base' style={{ color: 'var(--color-text)' }}>{`${fName} ${lName}`}</h4>
            <p className='text-[10px] uppercase tracking-widest font-black opacity-40' style={{ color: 'var(--color-text-muted)' }}>{email}</p>
          </div>
        </div>
      </td>
      <td className='py-5 px-6'>
        <span className='text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 border'
              style={{ 
                color: 'var(--color-text)', 
                borderColor: 'var(--color-border)',
                background: 'var(--color-background)'
              }}>
          {role}
        </span>
      </td>
      <td className='py-5 px-6 font-normal italic' style={{ color: 'var(--color-text-muted)' }}>{department.name}</td>
      <td className='py-5 px-6'>
        <div className='flex items-center gap-2'>
          <div className={`status-glow ${status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          <span className='text-[10px] uppercase tracking-widest font-black opacity-60'>
            {status}
          </span>
        </div>
      </td>
      <td className='py-5 px-6 text-right'>
        <div className='flex justify-end gap-6'>
          <button
            className='text-[10px] uppercase tracking-widest font-black hover:text-accent transition-colors opacity-40 hover:opacity-100'
            onClick={() => {
              setSelectedUser(user)
              onShowUpdateForm()
            }}
          >
            edit
          </button>
          <button 
            className='text-[10px] uppercase tracking-widest font-black text-red-500/60 hover:text-red-500 transition-colors' 
            onClick={deleteUser}
          >
            remove
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserTableData

