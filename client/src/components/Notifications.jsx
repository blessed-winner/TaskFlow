import { Check,Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { socket } from '../socket'



const Notifications = ({onClose}) => {
  return (
    <div className='absolute top-1 right-1 w-80 bg-white rounded-md px-5 py-6 border border-gray-200 shadow-lg'>
       <div className="flex items-center justify-between p-4 border-b border-gray-200 z-50">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer">
                  <Check className="h-3 w-3" />
                  <span>Mark all read</span>
                </button>
               <button className="text-sm text-red-600 hover:text-red-800 flex items-center gap-0.5 cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X onClick={onClose} className="h-5 w-5" />
              </button>
            </div>
          </div>
       <div className='flex justify-center mt-5'>
          <h4>No Notifications Available</h4>
       </div>
    </div>
  )
}

export default Notifications