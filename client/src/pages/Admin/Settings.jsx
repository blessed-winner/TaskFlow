import { useState } from 'react'
import { taskPriority } from '../../assets/assets'

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange({ target: { checked: !checked } })}
    className='relative inline-flex h-5 w-9 items-center border transition-colors duration-300'
    style={{
      borderColor: 'var(--color-border)',
      background: checked ? 'var(--color-text)' : 'transparent',
    }}
  >
    <span
      className='inline-block h-3 w-3 transform transition-transform duration-300'
      style={{
        background: checked ? 'var(--color-background)' : 'var(--color-text)',
        transform: checked ? 'translateX(18px)' : 'translateX(4px)',
      }}
    />
  </button>
)

const Settings = () => {
  const [priorities, setPriorities] = useState('Medium')
  const [textValue, setTextValue] = useState('TaskFlow')
  const [emailNote, setEmailNote] = useState(true)
  const [taskReminder, setTaskReminder] = useState(true)
  const [weekReport, setWeekReport] = useState(false)

  return (
    <div className='space-y-8'>

      {/* ── Header ── */}
      <div className='pb-6 border-b' style={{ borderColor: 'var(--color-border)' }}>
        <div className='flex items-center gap-4 mb-4'>
          <span className='w-8 h-px shrink-0' style={{ background: 'var(--color-text)' }}></span>
          <p className='text-[10px] uppercase tracking-[0.4em] font-sans font-bold' style={{ color: 'var(--color-accent)' }}>system configuration</p>
        </div>
        <h1 className='text-3xl sm:text-5xl uppercase mb-2 leading-[0.9]'>
          <span className='font-sans font-black tracking-tighter' style={{ color: 'var(--color-text)' }}>System</span>
          <span className='ml-3 font-serif font-normal italic tracking-tight capitalize' style={{ color: 'var(--color-text-muted)' }}>Protocols.</span>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {/* ── General Settings ── */}
        <div className='border' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className='px-6 py-4 border-b' style={{ borderColor: 'var(--color-border)' }}>
            <p className='text-[8px] uppercase tracking-[0.3em] font-sans font-bold opacity-40' style={{ color: 'var(--color-text)' }}>Module 01</p>
            <h2 className='font-serif text-xl font-black mt-1' style={{ color: 'var(--color-text)' }}>General Settings</h2>
          </div>
          <div className='px-6 py-5 space-y-6'>
            <div>
              <label className='text-[9px] uppercase tracking-widest font-sans font-bold opacity-60 block mb-2' style={{ color: 'var(--color-text)' }}>
                System Name
              </label>
              <input
                type='text'
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className='input-vintage w-full'
              />
            </div>
            <div>
              <label className='text-[9px] uppercase tracking-widest font-sans font-bold opacity-60 block mb-2' style={{ color: 'var(--color-text)' }}>
                Default Task Priority
              </label>
              <select
                value={priorities}
                onChange={(e) => setPriorities(e.target.value)}
                className='input-vintage w-full'
                style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}
              >
                {taskPriority.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Notification Settings ── */}
        <div className='border' style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className='px-6 py-4 border-b' style={{ borderColor: 'var(--color-border)' }}>
            <p className='text-[8px] uppercase tracking-[0.3em] font-sans font-bold opacity-40' style={{ color: 'var(--color-text)' }}>Module 02</p>
            <h2 className='font-serif text-xl font-black mt-1' style={{ color: 'var(--color-text)' }}>Notification Settings</h2>
          </div>
          <div className='px-6 py-5 space-y-0 divide-y' style={{ borderColor: 'var(--color-border)' }}>
            {[
              { label: 'Email Notifications', value: emailNote, setter: setEmailNote },
              { label: 'Task Reminders',      value: taskReminder, setter: setTaskReminder },
              { label: 'Weekly Reports',      value: weekReport, setter: setWeekReport },
            ].map(({ label, value, setter }) => (
              <div key={label} className='flex justify-between items-center py-4'>
                <span className='text-[10px] uppercase tracking-widest font-sans font-bold opacity-70' style={{ color: 'var(--color-text)' }}>
                  {label}
                </span>
                <Toggle checked={value} onChange={(e) => setter(e.target.checked)} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings
