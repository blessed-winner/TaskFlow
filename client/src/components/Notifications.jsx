import { Check, Trash2, X } from 'lucide-react'

const Notifications = ({ onClose, notifications = [], onMarkAllRead, onClearAll }) => {
  return (
    <div className='absolute top-14 right-0 w-[350px] z-50 card-vintage p-0 max-h-[400px] overflow-hidden flex flex-col' style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className='flex items-center justify-between p-4 border-b' style={{ borderColor: 'var(--color-border)' }}>
        <h3 className='text-[10px] uppercase tracking-[0.3em] font-sans font-bold' style={{ color: 'var(--color-text)' }}>Chronicle</h3>
        <div className='flex items-center gap-3'>
          <button onClick={onMarkAllRead} className='text-[8px] uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center gap-1 transition-opacity'>
            <Check className='h-3 w-3' />
            mark read
          </button>
          <button onClick={onClearAll} className='text-[8px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-red-500 transition-colors'>
            <Trash2 className='h-3 w-3' />
          </button>
          <button onClick={onClose} className='opacity-50 hover:opacity-100 transition-opacity'>
            <X className='h-4 w-4' />
          </button>
        </div>
      </div>
      <div className='flex flex-col overflow-y-auto w-full'>
        {notifications.length > 0 ? (
          <div className='divide-y w-full' style={{ borderColor: 'var(--color-border)' }}>
            {notifications.map((n, index) => {
              const isAccent = ['CREATE_USER', 'TOGGLE_COMPLETED', 'CREATE_DEPT', 'NEW_TASK'].includes(n.type)
              const isWarning = ['DELETE_TASK', 'DELETE_USER', 'DELETE_DEPT'].includes(n.type)
              const color = isAccent ? 'var(--color-accent)' : isWarning ? '#e74c3c' : 'var(--color-text-muted)'
              return (
                <div
                  key={index}
                  className='p-4 hover:bg-black/5 transition-colors'
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <div className='flex items-start gap-3 w-full'>
                    <div className='pt-1.5'>
                      <div className='w-1.5 h-1.5 rounded-none' style={{ background: color }}></div>
                    </div>
                    <div className='w-full pr-2'>
                        <p className='text-xs font-sans font-medium leading-relaxed break-words' style={{ color: 'var(--color-text)' }}>{n.message}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='p-8 flex flex-col items-center justify-center opacity-30 text-center'>
             <p className='text-[10px] uppercase tracking-widest font-bold'>No new records identified</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
