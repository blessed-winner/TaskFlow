import { Check,Trash2, X } from 'lucide-react'
import React from 'react'

const Notifications = ({ onClose, notifications = [], onMarkAllRead, onClearAll }) => {
  return (
    <div className='absolute top-1 right-1 w-80 bg-white rounded-md px-5 py-6 border border-gray-200 shadow-lg overflow-scroll h-[250px]'>
       <div className="flex items-center justify-between p-4 border-b border-gray-200 z-50">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              <button onClick={onMarkAllRead} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer">
                  <Check className="h-3 w-3" />
                  <span>Mark all read</span>
                </button>
               <button onClick={onClearAll} className="text-sm text-red-600 hover:text-red-800 flex items-center gap-0.5 cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X onClick={onClose} className="h-5 w-5" />
              </button>
            </div>
          </div>
       <div className='flex flex-col mt-5 space-y-2'>
        {
          notifications.length > 0 ? notifications.map((n,index)=>(
            <div className={`text-sm text-left px-2 py-3 text-gray-800 flex items-center gap-1.5 rounded-md
  ${['CREATE_USER', 'CREATE_TASK'].includes(n.type) ? 'bg-green-200' : ''}
  ${['DELETE_TASK', 'DELETE_USER'].includes(n.type) ? 'bg-red-200' : ''}
  ${n.type === 'OVERDUE_TASK' ? 'bg-orange-200' : ''}
`}
>
  <div className={`w-2 h-2 rounded-full
      ${['CREATE_USER', 'CREATE_TASK'].includes(n.type) ? 'bg-green-500' : ''}
      ${n.type === 'OVERDUE_TASK' ? 'bg-orange-500' : ''}
      ${['DELETE_TASK', 'DELETE_USER'].includes(n.type) ? 'bg-red-500' : ''}
  `   }></div>
       <p key={index}>{n.message}</p>
        </div>
     )) :   <h4 className='text-center'>No Notifications Available</h4>
        }
         </div>
    </div>
  )
}

export default Notifications