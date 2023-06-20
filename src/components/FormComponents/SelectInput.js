import React from 'react'

const SelectInput = ({ label, ...props}) => {
    
  return (
    <div className="input-container">
        <div style={{display:'flex'}}>
        <label>{label}</label>
        <div className='input-wrapper'>
            <select value={props.value}{... props} />
        </div>
      

        </div>
        
    </div>
  )
}

export default SelectInput