import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AppContext = createContext()
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
export const AppProvider = ({children})=>{
      const[dashboardData,setDashboardData] = useState({
    totalUsers:0,
    totalTasks:0,
    completed:0,
    activeManagers:0,
    completionRate:0,
  })

  const [userDashboardData,setUserDashboardData] = useState({
    totalTasks:0,
    completedTasks:0,
    inProgressTasks:0,
    pendingTasks:0,
    completionRate:0,
  })

  const[managerDashboardData,setManagerDashboardData] = useState({
    totalTasks:0,
    completedTasks:0,
    teamMembers:0,
    overDueTasks:0,
    pendingTasks:0
  })

  const fetchManagerDashboardData = async() => {
    try{
      const { data } = await axios.get('/api/users/manager/dashboard')
      data.success ? setManagerDashboardData(data.managerDashboard) : toast.error(data.message)   
    }
    catch(err){
      toast.error(err.message)
    }
  }

  const fetchUserDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/users/user/dashboard')
      data.success ? setUserDashboardData(data.userDashboard) : toast.error(data.error)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const[token,setToken] = useState("")
  
 

  const fetchDashboardData = async() => {
    try {
       const { data } = await axios.get('/api/users/admin/dashboard')
       data.success ? setDashboardData(data.dashboardData) : toast.error(data.error)
    } catch (error) {
      toast.error(error.message)
    }
   
  }

    const [users,setUsers] = useState([])
  
    const fetchUsers = async()=>{
        try {
            const {data}  = await axios.get('/api/users/admin/All')
            data.success ? setUsers(data.users) : toast.error(data.message) 

        } catch (err) {
            toast.error(err.message)
        }
        
    }

    const [tasks,setTasks] = useState([])
    const fetchTasks = async () => {
      try {
          const{ data } = await axios.get('/api/tasks/All')
          data.success ? setTasks(data.tasks) : toast.error(data.message)
      } catch (error) {
         toast.error(error.message)
      }
    }

    const [ departmentData,setDepartmentData ] = useState([])

    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get('/api/departments/All')
        data.success ? setDepartmentData(data.departments) : toast.error(data.message)
      } catch (error) {
         toast.error(error.message)
      }
    }


      const value = {
        users,
        setUsers,
        axios,
        token,
        setToken,
        dashboardData,
        setDashboardData,
        departmentData,
        setDepartmentData,
        fetchUsers,
        fetchDashboardData,
        fetchDepartments,
        userDashboardData,
        setUserDashboardData,
        fetchUserDashboardData,
        managerDashboardData,
        setManagerDashboardData,
        fetchManagerDashboardData,
        tasks,
        fetchTasks,
        setTasks
        }

    useEffect(()=>{
      const storedToken = localStorage.getItem("token")
      if(storedToken){
        setToken(storedToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      }
      fetchUsers()
      fetchDashboardData()
      fetchDepartments()
      fetchUserDashboardData()
      fetchManagerDashboardData()
      fetchTasks()
    },[])


  return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}