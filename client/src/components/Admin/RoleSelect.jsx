const RoleSelect = ({ value, onChange }) => {
  const roles = ['Admin', 'Manager', 'User']

  return (
    <select onChange={(e) => onChange(e.target.value)} value={value} className='form-input'>
      {roles.map((role, index) => (
        <option value={role} key={index}>
          {role}
        </option>
      ))}
    </select>
  )
}

export default RoleSelect

