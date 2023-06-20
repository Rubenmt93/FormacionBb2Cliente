
import React from 'react'

const TextInput = ({label, ...props}) => {
 
  return (
    <div className="input-container">
      <div style={{display:'flex'}}>
        {label?<label className='label'>{label}</label>:<></>}
        <div className="input-wrapper">
           <input className='input'  placeholder={props.placeholder} 
                                     disabled={props?.disabled}  
                                     value={props.value} 
                                     type={props.type} 
                                     onChange={props.onChange} 
                                     name={props.name}
                                     required={props.required}/>
        </div>        
      </div>       
    </div>
  )
}

export default TextInput