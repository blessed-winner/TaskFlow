import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminSidebar from '../../components/Admin/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='h-screen overflow-hidden' style={{ background: 'var(--color-background)', transition: 'background 0.4s ease' }}>
      <AdminNavbar />
      <AdminSidebar />
      <main className='fixed top-[96px] md:bottom-4 bottom-[100px] right-4 md:left-[17.5rem] left-4 border overflow-y-auto pb-12 px-4 md:px-8 pt-6 md:pt-8 bg-surface transition-all' 
            style={{ zIndex: 1, background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className='absolute top-0 left-0 w-full h-64 opacity-5 pointer-events-none' 
             style={{ background: 'linear-gradient(180deg, var(--color-accent) 0%, transparent 100%)' }}></div>
        <div className='relative z-10 reveal'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout

