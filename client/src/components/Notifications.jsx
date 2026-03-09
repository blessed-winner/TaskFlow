import { Check, Trash2, X } from 'lucide-react'

const Notifications = ({ onClose, notifications = [], onMarkAllRead, onClearAll }) => {
  return (
    <div className='panel absolute top-12 right-0 w-[330px] rounded-2xl px-4 py-4 max-h-[320px] overflow-y-auto z-40'>
      <div className='flex items-center justify-between pb-3 border-b border-cyan-100'>
        <h3 className='text-lg font-semibold text-slate-900'>Notifications</h3>
        <div className='flex items-center gap-2'>
          <button onClick={onMarkAllRead} className='text-xs text-cyan-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer'>
            <Check className='h-3 w-3' />
            Mark all read
          </button>
          <button onClick={onClearAll} className='text-sm text-red-600 hover:text-red-800 cursor-pointer'>
            <Trash2 className='h-4 w-4' />
          </button>
          <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
            <X className='h-5 w-5' />
          </button>
        </div>
      </div>
      <div className='flex flex-col mt-4 space-y-2'>
        {notifications.length > 0 ? (
          notifications.map((n, index) => (
            <div
              key={index}
              className={`text-sm text-left px-3 py-2.5 text-slate-800 flex items-center gap-2 rounded-xl ${
                ['CREATE_USER', 'TOGGLE_COMPLETED', 'CREATE_DEPT'].includes(n.type) ? 'bg-emerald-100/80' : ''
              }
            ${['DELETE_TASK', 'DELETE_USER', 'DELETE_DEPT'].includes(n.type) ? 'bg-red-100/80' : ''}
            ${['TOGGLE_IN_PROGRESS', 'UPDATE_TASK', 'UPDATE_USER', 'NEW_TASK'].includes(n.type) ? 'bg-cyan-100/75' : ''}
            ${n.type === 'OVERDUE_TASK' ? 'bg-orange-100/80' : ''}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  ['CREATE_USER', 'NEW_TASK', 'TOGGLE_COMPLETED', 'CREATE_DEPT'].includes(n.type) ? 'bg-emerald-500' : ''
                }
                ${n.type === 'OVERDUE_TASK' ? 'bg-orange-500' : ''}
                ${['DELETE_TASK', 'DELETE_USER', 'DELETE_DEPT'].includes(n.type) ? 'bg-red-500' : ''}
                ${['TOGGLE_IN_PROGRESS', 'UPDATE_TASK', 'UPDATE_USER'].includes(n.type) ? 'bg-cyan-500' : ''}`}
              ></div>
              <p>{n.message}</p>
            </div>
          ))
        ) : (
          <h4 className='text-center text-slate-500 py-8'>No notifications available</h4>
        )}
      </div>
    </div>
  )
}

export default Notifications

