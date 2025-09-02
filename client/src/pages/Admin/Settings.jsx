import React, { useState } from 'react'
import { taskPriority } from '../../assets/assets'

const Settings = () => {
    const [priorities,setPriorities] = useState('Medium')
    const [textValue,setTextValue] = useState('TaskFlow')
    const[emailNote,setEmailNote] = useState(true)
    const[taskReminder,setTaskReminder] = useState(true)
    const[weekReport,setWeekReport] = useState(false)
    
  return (
    <div className='ml-18 md:ml-54 mt-14.5 p-4 md:p-10 bg-blue-50/50 flex-1 h-full'>
      <h1 className='font-semibold text-2xl text-gray-900 mb-6'>System Settings</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white px-5 py-6 rounded-lg shadow-md space-y-4'>
          <h2 className='font-medium text-lg mb-3'>General Settings</h2>
           <div>
            <span className='text-sm font-medium text-gray-800'>System Name</span>
            <input type="text" value={textValue} onChange={(e)=>setTextValue(e.target.value)} className='text-md p-2 w-full border border-gray-300 outline-none rounded-md mt-1' />
           </div>
           <div>
            <span className='text-sm font-medium text-gray-800'>Default Task Priority</span>
            <select value={priorities} onChange={(e)=>setPriorities(e.target.value)} className='p-2 w-full border border-gray-300 outline-none rounded-md mt-1'>
              { taskPriority.map((item,index)=>(
                <option key={index} value={item}>{item}</option>
              )) }
            </select>
           </div>
        </div>
        <div>
            <div className='bg-white px-5 py-6 rounded-lg shadow-md space-y-6 h-full'>
          <h2 className='font-medium text-lg mb-3'>Notification Settings</h2>
           <div className="flex justify-between">
            <span className='text-sm font-medium text-gray-800'>Email Notifications</span>
            <input type="checkbox" checked={emailNote} onChange={(e)=>setEmailNote(e.target.checked)}/>
           </div>
            <div className="flex justify-between">
            <span className='text-sm font-medium text-gray-800'>Task Reminders</span>
            <input type="checkbox" checked={taskReminder} onChange={(e)=>setTaskReminder(e.target.checked)}/>
           </div>
            <div className="flex justify-between">
            <span className='text-sm font-medium text-gray-800'>Weekly Reports</span>
            <input type="checkbox" checked={weekReport} onChange={(e)=>setWeekReport(e.target.checked)}/>
           </div>
        </div>
        </div>
      </div>
      </div>
  )
}

export default Settings