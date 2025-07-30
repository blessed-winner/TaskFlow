import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Layout from './pages/Admin/Layout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import User from './pages/Admin/User'
import Analytics from './pages/Admin/Analytics'
import Settings from './pages/Admin/Settings'
import './index.css'

const App = () => {
  return (
    <div>
       <Routes>
         <Route path = '/admin' element = {<Layout/>}>
            <Route index element ={<AdminDashboard/>}/>
            <Route path='users' element={<User/>}/>
            <Route path='analytics' element={<Analytics/>}/>
            <Route path='settings' element={<Settings/>}/>
         </Route>
       </Routes>
    </div>
  )
}

export default App