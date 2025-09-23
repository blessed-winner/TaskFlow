import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'

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
  
  // Notification state
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState(null)
 

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

    // Notification functions
    const fetchUserNotifications = async (userId) => {
      try {
        const { data } = await axios.get(`/api/notifications/user/${userId}`)
        if (data.success) {
          setNotifications(data.userNotifications)
          setUnreadCount(data.unreadCount)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const deleteNotifications = async (userId) => {
      try {
        const { data } = await axios.delete(`/api/notifications/delete/${userId}`)
        if (data.success) {
          toast.success(data.message)
          setNotifications([])
          setUnreadCount(0)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const markAllRead = async (userId) => {
      try {
        const { data } = await axios.put(`/api/notifications/toggle-is-read/${userId}`)
        if (data.success) {
          setUnreadCount(0)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    // Initialize socket connection
    const initializeSocket = (userId) => {
      if (socket) {
        socket.disconnect()
      }
      
      const newSocket = io('http://localhost:8000')
      setSocket(newSocket)
      
      newSocket.emit('join-user-room', userId)
      
      newSocket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...(prev || []).slice(0, 49)])
        setUnreadCount(prev => prev + 1)
      })
      
      return newSocket
    }

    const logout = () => {
      localStorage.removeItem('token')
      const user = localStorage.getItem('user')
      localStorage.removeItem('user')
      setToken("")
      setAuthUser(null)
      axios.defaults.headers.common["Authorization"] = ""
      
      // Disconnect socket
      if (socket) {
        socket.disconnect()
        setSocket(null)
      }
      
      // Clear all data states
      setUsers([])
      setTasks([])
      setUserTasks([])
      setDepartmentData([])
      setNotifications([])
      setUnreadCount(0)
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
        // Notification functions and state
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        fetchUserNotifications,
        deleteNotifications,
        markAllRead,
        initializeSocket,
        socket,
        logout
        }

    // Effect 1: Initialize auth state from localStorage
    useEffect(()=>{
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem('user')
      const parsedUser = storedUser ? JSON.parse(storedUser) : null

      //console.log('Initializing auth state:', { storedToken: !!storedToken, parsedUser })

      if(storedToken){
        setToken(storedToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
      }
      if (parsedUser) {
        setAuthUser(parsedUser)
      }
    },[])

    useEffect(()=>{
      const runRoleFetches = async () => {
        try {
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

    // Initialize notifications and socket when user is authenticated
    useEffect(() => {
      if (authUser?.id) {
        // Fetch notifications
        fetchUserNotifications(authUser.id)
        
        // Initialize socket connection
        initializeSocket(authUser.id)
        
        // Cleanup function
        return () => {
          if (socket) {
            socket.emit('leave-user-room', authUser.id)
            socket.disconnect()
          }
        }
      }
    }, [authUser?.id])



  return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    return useContext(AppContext)
}