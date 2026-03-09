const PrioritySelect = ({ value, onChange }) => {
  const priorities = ['Low', 'Medium', 'High']

  return (
    <select onChange={(e) => onChange(e.target.value)} value={value} className='form-input min-w-[220px]'>
      {priorities.map((priority, index) => (
        <option value={priority} key={index}>
          {priority}
        </option>
      ))}
    </select>
  )
}

export default PrioritySelect

