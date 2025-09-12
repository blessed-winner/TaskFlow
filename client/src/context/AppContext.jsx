import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

const AppContext = createContext()
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
export const AppProvider = ({children})=>{
      const location = useLocation()
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
  const [authUser, setAuthUser] = useState(null)
  
 

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

    const [tasks,setTasks] = useState([])
    const [userTasks,setUserTasks] = useState([])
    
    const fetchTasks = async () => {
      try {
          const{ data } = await axios.get('/api/tasks/All')
          data.success ? setTasks(data.tasks) : toast.error(data.message)
      } catch (error) {
         toast.error(error.message)
      }
    }

    const fetchUserTasks = async (userId) => {
      try {
          const{ data } = await axios.get(`/api/tasks/user/${userId}`)
          data.success ? setUserTasks(data.tasks) : toast.error(data.message)
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

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken("")
      setAuthUser(null)
      axios.defaults.headers.common["Authorization"] = ""
      // Clear all data states
      setUsers([])
      setTasks([])
      setUserTasks([])
      setDepartmentData([])
      setDashboardData({
        totalUsers:0,
        totalTasks:0,
        completed:0,
        activeManagers:0,
        completionRate:0,
      })
      setUserDashboardData({
        totalTasks:0,
        completedTasks:0,
        inProgressTasks:0,
        pendingTasks:0,
        completionRate:0,
      })
      setManagerDashboardData({
        totalTasks:0,
        completedTasks:0,
        teamMembers:0,
        overDueTasks:0,
        pendingTasks:0
      })
    }


      const value = {
        users,
        setUsers,
        axios,
        token,
        setToken,
        authUser,
        setAuthUser,
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
        setTasks,
        userTasks,
        setUserTasks,
        fetchUserTasks,
        logout
        }

    // Effect 1: Initialize auth state from localStorage
    useEffect(()=>{
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem('user')
      const parsedUser = storedUser ? JSON.parse(storedUser) : null

      console.log('Initializing auth state:', { storedToken: !!storedToken, parsedUser })

      if(storedToken){
        setToken(storedToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      }
      if (parsedUser) {
        setAuthUser(parsedUser)
      }
    },[])

    // Effect 3: Clear auth state when on auth page
    useEffect(() => {
      console.log('Route changed to:', location.pathname)
      if (location.pathname === '/auth') {
        console.log('Clearing auth state on auth page')
        setToken("")
        setAuthUser(null)
        axios.defaults.headers.common["Authorization"] = ""
      }
    }, [location.pathname])

    // Effect 2: Fetch role-based data once token and role are ready
    useEffect(()=>{
      const runRoleFetches = async () => {
        try {
          // Don't fetch data if we're on the auth page
          if (location.pathname === '/auth') {
            return
          }
          
          console.log('Fetching data for role:', authUser?.role)
          if(authUser?.role === 'ADMIN') {
            await Promise.all([fetchUsers(), fetchDashboardData(), fetchDepartments(), fetchTasks()])
          } else if(authUser?.role === 'MANAGER') {
            await Promise.all([fetchManagerDashboardData(), fetchTasks(), fetchUsers()])
          } else if(authUser?.role === 'USER'){
            await fetchUserDashboardData()
          }
        } catch (error) {
          console.error('Error fetching role-based data:', error)
        }
      }

      if (token && authUser?.role) {
        runRoleFetches()
      }
    },[token, authUser?.role, location.pathname])



  return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}