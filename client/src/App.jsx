import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import User from './pages/Admin/User'
import Analytics from './pages/Admin/Analytics'
import Settings from './pages/Admin/Settings'
import './index.css'
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import UserLayout from './pages/User/UserLayout'
import ManagerLayout from './pages/Manager/ManagerLayout'
import ManagerDashboard from './pages/Manager/ManagerDashboard'
import TaskManagement from './pages/Manager/TaskManagement'
import TeamOverview from './pages/Manager/TeamOverview'
import Projects from './pages/Manager/Projects'

const App = () => {
  return (
    <div>
       <Routes>
         <Route path = '/admin' element = {<AdminLayout/>}>
            <Route index element ={<AdminDashboard/>}/>
            <Route path='users' element={<User/>}/>
            <Route path='analytics' element={<Analytics/>}/>
            <Route path='settings' element={<Settings/>}/>
         </Route>
            <Route path = '/user' element = {<UserLayout/>}>
            <Route index element ={<UserDashboard/>}/>
            <Route path='my-tasks' element={<MyTasks/>}/>
         </Route>
         <Route path='/manager' element = {<ManagerLayout/>}>
             <Route index element ={<ManagerDashboard/>}/>
             <Route path='manage-tasks' element={<TaskManagement/>}/>
             <Route path='team-overview' element={<TeamOverview/>}/>
             <Route path='projects' element={<Projects/>}/>
         </Route>
       </Routes>
    </div>
  )
}

export default App