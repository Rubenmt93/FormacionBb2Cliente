import React from 'react'
import { useField } from 'formik'
const SelectInput = ({ label, ...props}) => {
    const [field, meta] = useField(props)
  return (
    <div className="input-container">
        <div style={{display:'flex'}}>
        <label>{label}</label>
        <div className='input-wrapper'>
            <select value={props.value} {...field} {... props} />
        </div>
        {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}

        </div>
        
    </div>
  )
}

export default SelectInput