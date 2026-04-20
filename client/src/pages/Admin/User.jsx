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
    <div className='flex-1 pb-12'>
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
      
      <div className='flex justify-between items-end mb-16 gap-4 border-b-2 pb-8' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide'>
          <div className='flex items-center gap-4 mb-2'>
            <span className='ornament w-12'></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-black' style={{ color: 'var(--color-accent)' }}>personnel management</p>
          </div>
          <h1 className='text-5xl font-normal' style={{ color: 'var(--color-text)' }}>Agent Directory</h1>
        </div>
        <AddUserButton onClick={() => setShowForm(true)} />
      </div>

      <div className='card-vintage p-0 overflow-hidden fade-in-slide'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm min-w-[760px]'>
            <thead className='uppercase text-[10px] tracking-[0.2em] font-black opacity-60 border-b-2' style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <tr>
                <th className='py-6 px-6 text-left'>Agent</th>
                <th className='py-6 px-6 text-left'>Designation</th>
                <th className='py-6 px-6 text-left'>Department</th>
                <th className='py-6 px-6 text-left'>Protocol Status</th>
                <th className='py-6 px-6 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y' style={{ borderColor: 'var(--color-border)' }}>
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
    </div>
  )
}

export default User

