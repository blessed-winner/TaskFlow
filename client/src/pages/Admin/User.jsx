import { useState } from 'react'
import UserTableData from '../../components/Admin/UserTableData'
import { useAppContext } from '../../context/AppContext'
import AddUserButton from '../../components/Admin/AddUserButton'
import AddUserForm from '../../components/Admin/AddUserForm'
import UpdateUserForm from '../../components/Admin/UpdateUserForm'

const User = () => {
  const { users, fetchUsers, fetchDashboardData, setUsers } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserAdd = (newUser) => {
    setUsers((allUsers) => [...allUsers, newUser])
  }

  const handleUserUpdate = (updatedUser) => {
    setUsers((allUsers) => [...allUsers, updatedUser])
  }

  return (
    <div className='flex-1'>
      {showForm && <AddUserForm onClose={() => setShowForm(false)} onUserAdded={handleUserAdd} fetchDashboard={fetchDashboardData} />}
      {showUpdateForm && selectedUser && (
        <UpdateUserForm
          user={selectedUser}
          onClose={() => setShowUpdateForm(false)}
          onUserUpdated={handleUserUpdate}
          fetchDashboard={fetchDashboardData}
          fetchUsers={fetchUsers}
        />
      )}
      <div className='flex justify-between items-center mb-6 gap-4'>
        <div>
          <h1 className='font-semibold text-3xl text-slate-900'>User Management</h1>
          <p className='text-sm text-slate-600 mt-1'>View, update, and manage access across your organization.</p>
        </div>
        <AddUserButton onClick={() => setShowForm(true)} />
      </div>
      <div className='panel rounded-2xl overflow-x-auto'>
        <table className='w-full text-sm min-w-[760px]'>
          <thead className='text-slate-500 uppercase text-xs bg-cyan-50/60 text-left'>
            <tr>
              <th className='py-4 px-3 xl:px-5 font-semibold'>User</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Role</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Department</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Status</th>
              <th className='py-4 px-3 xl:px-5 font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableData
                user={user}
                key={index}
                fetchUsers={fetchUsers}
                fetchDashboard={fetchDashboardData}
                onShowUpdateForm={() => setShowUpdateForm(true)}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User

