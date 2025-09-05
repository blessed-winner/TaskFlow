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
            const {data}  = await axios.get('/api/users/All')
            data.success ? setUsers(data.users) : toast.error(data.message) 

        } catch (err) {
            toast.error(err.message)
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
        }

    useEffect(()=>{
      fetchUsers()
      const token = localStorage.getItem("token")
      if(token){
        setToken(token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      fetchDashboardData()
      fetchDepartments()
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