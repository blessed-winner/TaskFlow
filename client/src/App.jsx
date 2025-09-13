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
import { Toaster } from 'react-hot-toast'
import Login from './components/auth/Login'
import RoleGuard from './components/Guard/RoleGuard'
import Unauthorized from './pages/Unauthorized'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Toaster/>
       <Routes>
        <Route path="/" element={<Home/>} />
 
         <Route path = '/admin' element = {
          <RoleGuard role="ADMIN">
              <AdminLayout/>
          </RoleGuard>
       }>
            <Route index element ={<AdminDashboard/>}/>
            <Route path='users' element={<User/>}/>
            <Route path='analytics' element={<Analytics/>}/>
            <Route path='settings' element={<Settings/>}/>
         </Route>
            <Route path = '/user' element = {
              <RoleGuard role="USER">
                   <UserLayout/>
              </RoleGuard>
              }>
            <Route index element ={<UserDashboard/>}/>
            <Route path='my-tasks' element={<MyTasks/>}/>
         </Route>
         <Route path='/manager' element = {
         <RoleGuard role="MANAGER">
                   <ManagerLayout/>
        </RoleGuard>
          }>
             <Route index element ={<ManagerDashboard/>}/>
             <Route path='manage-tasks' element={<TaskManagement/>}/>
             <Route path='team-overview' element={<TeamOverview/>}/>
         </Route>
         <Route path='/auth' element={<Login/>}/>
         <Route path='/unauthorized' element={<Unauthorized/>}/>
       </Routes>
    </div>
  )
}

export default App