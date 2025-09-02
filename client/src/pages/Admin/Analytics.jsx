
import { useState } from 'react'
import { Activity, ClipboardList, Trash2, TrendingUp, Users } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import AddDepartmentButton from '../../components/Admin/AddDepartmentButton'
import AddDepartmentForm from '../../components/Admin/AddDepartmentForm'
import toast from 'react-hot-toast'

const Analytics = () => {

  const { dashboardData,departmentData,setDepartmentData,axios,fetchDepartments} = useAppContext()

  
    const [ showForm,setShowForm  ] = useState(false)

     const handleDepartmentAdd = (newDept) => {
       setDepartmentData((depts)=>[ ...depts,newDept ])
     }
     
    
const handleDeleteDepartment = async (id) => {
   const confirm = window.confirm('Are you sure you want to delete this department ?')
   if(!confirm) return ;
 try {
      const { data } = await axios.delete(`/api/departments/delete/${id}`)
      if(data.success){
        toast.success(data.message) 
         fetchDepartments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
}


  return (
    <div className='ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
          {showForm && <AddDepartmentForm onClose={()=>setShowForm(false)} onDeptAdd={handleDepartmentAdd} fetchDepar/>}
         <div className='flex justify-between'>
         <h1 className='font-semibold text-2xl text-gray-900 mb-6'>System Analytics</h1>
         <AddDepartmentButton onClick = {()=>setShowForm(true)}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Task Completion Rate</p>
              <p className='text-2xl font-semibold text-green-500'>{dashboardData.completionRate}%</p>
            </span>
            <TrendingUp className='text-green-500 h-8 w-8'/>
            
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Users</p>
              <p className='text-2xl font-semibold text-blue-500'>{dashboardData.totalUsers}</p>
            </span>
            <Activity className='text-blue-500 h-8 w-8'/>
            
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Total Tasks</p>
              <p className='text-2xl font-semibold text-purple-500'>{dashboardData.totalTasks}</p>
            </span>
            <ClipboardList className='text-purple-500 h-8 w-8'/>
           </div> 
            <div className='bg-white p-4 py-6 flex items-center rounded-lg justify-between min-w-58 shadow'>
            <span className='space-y-1'>
              <p className='text-sm font-semibold text-gray-600'>Active Managers</p>
              <p className='text-2xl font-semibold text-orange-500'>{dashboardData.activeManagers}</p>
            </span>
            <Users className='text-orange-500 h-8 w-8'/>
           </div> 
      </div>
      <div className='mt-5 bg-white rounded-lg px-5 py-6 shadow-md h-3/5 scrollbar-hide overflow-x-auto'>
        <h2 className='text-xl font-medium mb-3'>Department Overview</h2>
        <div className='space-y-6 h-full'>
          {departmentData.map((dept,index)=>{
             const users = dept.users || []
             const tasks = dept.tasks || []
             const completed = tasks.filter(task => task.completed)
            return(
                <div key={index} className='flex justify-between bg-blue-50/40 rounded-md px-4 py-3'>
            <span>
            <h3 className='font-medium'>{dept.name}</h3>
            <div className='flex gap-1 items-center'>
               <p className='font-light text-sm'>{users.length} users</p>
               <Trash2 onClick={() => handleDeleteDepartment(dept.id)} className='text-red-500 w-4 h-4 cursor-pointer hover:scale-104 transition-all'/>
            </div>
           
           </span>

           <span className='space-y-1'>
              <h4 className='text-xs font-medium text-right text-blue-500'>{tasks.length} tasks</h4>
              <p className='text-xs font-light text-green-500'>{completed.length} completed</p>
           </span>
            </div>
            )
        
          }
           
          )}
         </div>
      </div>
      </div>
  )
}

export default Analytics