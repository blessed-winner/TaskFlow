const PrioritySelect = ({ value, onChange }) => {
  const priorities = ['Low', 'Medium', 'High']

  return (
    <select 
      onChange={(e) => onChange(e.target.value)} 
      value={value} 
      className='w-full input-vintage'
      style={{ appearance: 'none', background: 'transparent' }}
    >
      {priorities.map((priority, index) => (
        <option value={priority} key={index}>
          {priority}
        </option>
      ))}
    </select>
  )
}

export default PrioritySelect

