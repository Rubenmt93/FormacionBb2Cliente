import { useState } from "react";
import { useField } from 'formik'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({label, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  const[ field, meta]= useField(props)
  const onChange = ({ currentTarget }) => setShowPassword(currentTarget.value);
    
  return (
    <div className="input-container">
        
        <div className="input-wrapper">
          <input className='input'  onChange={onChange} type={showPassword? 'text':'password'} placeholder="🔒︎ Contraseña" {... field} />
          <div className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword? <AiFillEyeInvisible/> : <AiFillEye/>}
          </div>
        </div>
        {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
       
       
        
        
    </div>
       
    

  )
}

export default PasswordInput