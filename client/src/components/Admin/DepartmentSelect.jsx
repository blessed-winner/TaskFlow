import { useAppContext } from '../../context/AppContext'

const DepartmentSelect = ({ value, onChange }) => {
  const { departmentData } = useAppContext()

  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className='form-input'>
      <option value=''>Select department</option>
      {departmentData.map((dept, index) => (
        <option value={dept.id} key={index}>
          {dept.name}
        </option>
      ))}
    </select>
  )
}

export default DepartmentSelect

