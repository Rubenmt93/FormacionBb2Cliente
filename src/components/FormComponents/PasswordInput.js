import { useState } from "react";
import { useField } from 'formik'
const PasswordInput = ({label, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  const[ field, meta]= useField(props)
  const onChange = ({ currentTarget }) => setShowPassword(currentTarget.value);
    
  return (
    <div>
        <label className='label'>{label}</label>
        <input className='input'  onChange={onChange} type={showPassword? 'text':'password'} {... field} />
        {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        <p onClick={() => setShowPassword(!showPassword)}>ver</p>
    </div>
       
    

  )
}

export default PasswordInput