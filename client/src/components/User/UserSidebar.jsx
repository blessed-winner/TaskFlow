import { ClipboardList, Home } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const UserSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const links = [
    { to: '/user', icon: Home, label: 'Dashboard', end: true },
    { to: '/user/my-tasks', icon: ClipboardList, label: 'My Tasks' },
  ]

  const desktopLinkClass = ({ isActive }) =>
    `flex gap-4 items-center px-4 py-3 transition-colors duration-300 ${
      isActive ? 'bg-primary text-secondary' : 'text-text-muted hover:text-text hover:bg-surface-hover'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors duration-300 ${
      isActive ? 'text-primary' : 'text-text-muted hover:text-text'
    }`

  return (
    <>
      {/* ── DESKTOP: vertical sidebar ── */}
      <aside
        className='hidden md:flex flex-col fixed top-4 bottom-4 left-4 w-60 py-8 px-4 z-[100] border'
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className='text-center mb-12 pb-8 border-b' style={{ borderColor: 'var(--color-border)' }}>
          <div className='relative w-16 h-16 mx-auto mb-6 border'>
            <div className='w-full h-full flex items-center justify-center text-xl font-sans font-black uppercase'
                 style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)' }}>
              {user.fName.slice(0, 1)}
            </div>
          </div>
          <h4 className='text-xs font-sans font-bold uppercase tracking-widest' style={{ color: 'var(--color-text)' }}>
            {`${user.fName} ${user.lName}`}
          </h4>
          <p className='text-[9px] uppercase tracking-[0.2em] font-sans font-medium mt-2 opacity-50'>
            Operative
          </p>
        </div>
        <nav className='space-y-2'>
          {links.map((link) => (
            <NavLink key={link.to} end={link.end} to={link.to} className={desktopLinkClass}>
              <link.icon className='w-4 h-4 opacity-70 shrink-0' />
              <p className='text-[10px] uppercase tracking-widest font-sans font-bold'>{link.label}</p>
            </NavLink>
          ))}
        </nav>
        <div className='absolute bottom-8 left-0 right-0 px-8'>
          <div className='w-full h-px opacity-30' style={{ background: 'var(--color-border)' }}></div>
          <p className='text-[9px] opacity-50 text-center mt-4 uppercase tracking-[0.2em] font-sans font-bold'>TF v1.0</p>
        </div>
      </aside>

      {/* ── MOBILE: bottom pill dock ── */}
      <nav
        className='md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-row items-center justify-around border rounded-full'
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          width: 'min(95vw, 420px)',
          height: '68px',
        }}
      >
        {links.map((link) => (
          <NavLink key={link.to} end={link.end} to={link.to} className={mobileLinkClass}
            style={({ isActive }) => ({ color: isActive ? 'var(--color-accent)' : undefined })}
          >
            <link.icon className='w-5 h-5 shrink-0' />
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default UserSidebar
