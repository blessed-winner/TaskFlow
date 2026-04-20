import React from 'react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex flex-col items-center justify-center cursor-pointer focus:outline-none"
      aria-label="Toggle theme"
    >
      <div className="overflow-hidden h-[12px] w-[36px] relative">
        <div 
          className="absolute inset-x-0 flex flex-col items-center text-[9px] font-bold tracking-[0.2em] uppercase transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
          style={{ 
            transform: theme === 'dark' ? 'translateY(-50%)' : 'translateY(0)',
            color: 'var(--color-text)' 
          }}
        >
          <span className="flex h-[12px] items-center opacity-70 group-hover:opacity-100 transition-opacity">Day</span>
          <span className="flex h-[12px] items-center opacity-70 group-hover:opacity-100 transition-opacity">Night</span>
        </div>
      </div>
      
      {/* Micro-Interaction Sliding Indicator */}
      <div className="w-[36px] h-[1px] mt-1 relative overflow-hidden transition-opacity duration-300" 
           style={{ background: 'var(--color-border)' }}>
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
          style={{ 
            background: 'var(--color-text)', 
            width: '12px',
            transform: theme === 'dark' ? 'translateX(24px)' : 'translateX(0)'
          }}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
