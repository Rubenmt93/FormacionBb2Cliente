import { useField } from 'formik'
import React from 'react'

const TextInput = ({label, ...props}) => {
    const[ field, meta]= useField(props)
   
  return (
    <div>
        <label className='label'>{label}</label>
        <input className='input' type="email" {... field} />
        {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </div>
  )
}

export default TextInput