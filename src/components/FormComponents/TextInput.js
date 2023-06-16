import { useField } from 'formik'
import React from 'react'

const TextInput = ({label, ...props}) => {
    const[ field, meta]= useField(props)
  return (
    <div className="input-container">
      <div style={{display:'flex'}}>
        <label className='label'>{label}</label>
        <div className="input-wrapper">
           <input className='input'  placeholder={props.placeholder} readOnly={props?.readOnly}  {... field} />
        </div>
        
      </div>
     
        {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </div>
  )
}

export default TextInput