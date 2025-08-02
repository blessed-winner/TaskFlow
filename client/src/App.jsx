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
       </Routes>
    </div>
  )
}

export default App