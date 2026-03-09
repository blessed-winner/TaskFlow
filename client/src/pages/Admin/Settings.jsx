import { useState } from 'react'
import { taskPriority } from '../../assets/assets'

const Settings = () => {
  const [priorities, setPriorities] = useState('Medium')
  const [textValue, setTextValue] = useState('TaskFlow')
  const [emailNote, setEmailNote] = useState(true)
  const [taskReminder, setTaskReminder] = useState(true)
  const [weekReport, setWeekReport] = useState(false)

  return (
    <div className='flex-1'>
      <h1 className='font-semibold text-3xl text-slate-900 mb-6'>System Settings</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div className='panel px-5 py-6 rounded-2xl space-y-4'>
          <h2 className='font-semibold text-lg mb-2 text-slate-900'>General Settings</h2>
          <div>
            <span className='text-sm font-semibold text-slate-700'>System Name</span>
            <input type='text' value={textValue} onChange={(e) => setTextValue(e.target.value)} className='form-input mt-1.5' />
          </div>
          <div>
            <span className='text-sm font-semibold text-slate-700'>Default Task Priority</span>
            <select value={priorities} onChange={(e) => setPriorities(e.target.value)} className='form-input mt-1.5'>
              {taskPriority.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='panel px-5 py-6 rounded-2xl space-y-6'>
          <h2 className='font-semibold text-lg mb-2 text-slate-900'>Notification Settings</h2>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-semibold text-slate-700'>Email Notifications</span>
            <input type='checkbox' checked={emailNote} onChange={(e) => setEmailNote(e.target.checked)} />
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-semibold text-slate-700'>Task Reminders</span>
            <input type='checkbox' checked={taskReminder} onChange={(e) => setTaskReminder(e.target.checked)} />
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-semibold text-slate-700'>Weekly Reports</span>
            <input type='checkbox' checked={weekReport} onChange={(e) => setWeekReport(e.target.checked)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

