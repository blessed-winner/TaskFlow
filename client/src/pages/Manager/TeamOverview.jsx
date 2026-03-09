import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const TeamOverview = () => {
  const { users } = useAppContext()
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoleUsers = async () => {
      const userRoleUsers = users.filter((user) => user.role === 'USER')
      setUserData(userRoleUsers)
      setLoading(false)
    }
    if (users.length > 0) {
      fetchRoleUsers()
    }
  }, [users])

  if (loading) {
    return (
      <div className='flex-1'>
        <h1 className='font-semibold text-3xl mb-5 text-slate-900'>Team Overview</h1>
        <div className='panel rounded-2xl flex items-center justify-center h-64'>
          <div className='text-slate-500'>Loading team data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <h1 className='font-semibold text-3xl mb-6 text-slate-900'>Team Overview</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
        {userData.map((user, index) => {
          const totalTasks = user.tasks?.length || 0
          const completedTasks = user.tasks?.filter((t) => t.status === 'COMPLETED').length || 0
          const pendingTasks = user.tasks?.filter((t) => t.status === 'PENDING').length || 0
          const progress = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0
          return (
            <div key={index} className='panel px-5 py-4 rounded-2xl'>
              <div className='flex space-x-3'>
                <span className='bg-cyan-600 text-white w-12 rounded-full flex justify-center items-center h-12 font-semibold'>{user.fName?.slice(0, 1) || 'U'}</span>
                <span>
                  <h4 className='font-semibold text-lg text-slate-900'>{`${user.fName} ${user.lName}`}</h4>
                  <p className='font-medium text-sm text-slate-500'>{user.department?.name || 'No Department'}</p>
                </span>
              </div>
              <div className='space-y-2 text-sm mt-4 font-medium text-slate-600'>
                <div className='flex justify-between'>
                  <p>Total Tasks</p>
                  <p className='font-semibold text-slate-800'>{totalTasks}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Completed</p>
                  <p className='text-emerald-600 font-semibold'>{completedTasks}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Pending</p>
                  <p className='text-amber-600 font-semibold'>{pendingTasks}</p>
                </div>
              </div>
              <div className='mt-5'>
                <div className='flex justify-between'>
                  <p className='text-sm font-medium text-slate-600'>Progress</p>
                  <p className='text-sm font-medium text-slate-600'>{progress}%</p>
                </div>
                <div className='w-full bg-slate-200 rounded-full h-2 mt-2'>
                  <div className='bg-cyan-500 h-2 rounded-full transition-all duration-300' style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamOverview

