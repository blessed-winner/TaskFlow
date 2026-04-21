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
      
      <div className='flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 border-b pb-6 mb-12' style={{ borderColor: 'var(--color-border)' }}>
        <div className='fade-in-slide max-w-full'>
          <div className='flex items-center gap-4 mb-4'>
            <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
            <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>personnel management</p>
          </div>
          <h1 className='text-3xl sm:text-5xl md:text-7xl uppercase mb-2 break-words leading-[0.9]'>
            <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>Agent</span>
            <span className='ml-2 md:ml-4 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Directory.</span>
          </h1>
        </div>
        <div className='shrink-0 w-full md:w-auto'>
          <AddUserButton onClick={() => setShowForm(true)} />
        </div>
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

