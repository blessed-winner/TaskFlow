import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const UserTableData = ({ user, fetchUsers, fetchDashboard, onShowUpdateForm, setSelectedUser }) => {
  const { axios } = useAppContext()
  const { id, fName, lName, email, role, department, status } = user

  const deleteUser = async () => {
    const confirm = window.confirm('Are you sure you want to delete this user ?')
    if (!confirm) return
    try {
      const { data } = await axios.delete(`/api/users/admin/delete/${id}`)
      if (data.success) {
        toast.success(data.message)
        await fetchUsers()
        await fetchDashboard()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className='border-b border-cyan-100 text-slate-800 hover:bg-cyan-50/60 transition-all'>
      <td className='py-3 px-3 xl:px-5 flex items-center gap-3'>
        <h1 className='text-white bg-cyan-500 w-8 h-8 inline-flex items-center justify-center rounded-full font-semibold'>{fName.slice(0, 1)}</h1>
        <div className='inline-block'>
          <h4 className='font-semibold'>{`${fName} ${lName}`}</h4>
          <p className='font-medium text-xs text-slate-500'>{email}</p>
        </div>
      </td>
      <td className='py-3 px-3 xl:px-5'>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            role.toLowerCase() === 'admin' && 'bg-purple-100 text-purple-800'
          } ${user.role.toLowerCase() === 'user' && 'bg-emerald-100 text-emerald-800'} ${user.role.toLowerCase() === 'manager' && 'bg-cyan-100 text-cyan-800'}`}
        >
          {role && role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
        </span>
      </td>
      <td className='py-3 px-3 xl:px-5 font-medium text-slate-600'>{department.name}</td>
      <td className='py-3 px-3 xl:px-5'>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
          {status && status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </span>
      </td>
      <td className='py-3 px-3 xl:px-5'>
        <div className='flex gap-4 font-semibold text-sm'>
          <span
            className='text-cyan-500 cursor-pointer hover:text-cyan-700 transition-all'
            onClick={() => {
              setSelectedUser(user)
              onShowUpdateForm()
            }}
          >
            Edit
          </span>
          <span className='text-red-500 cursor-pointer hover:text-red-700 transition-all' onClick={deleteUser}>
            Delete
          </span>
        </div>
      </td>
    </tr>
  )
}

export default UserTableData

