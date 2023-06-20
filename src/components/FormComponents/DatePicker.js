import React from 'react'
import DatePickerReact from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
function DatePickerBB2({label, ...props}) {        
    return (
    <div>
      <div className="input-container">
        <div style={{display:'flex'}}>
          {label?<label className='label'>{label}</label>:<></>}
          <div className="input-wrapper">
            <DatePickerReact      className='input'
                                  dateFormat="dd/MM/yyyy"                                 
                                  selected= {Date.parse(props.value)}
                                  onChange={props.onChange} 
                                  name={props.name}
                                  disabled={props.disabled}/>
        
          </div>        
        </div>
      </div>
    </div>
  )
}

export default DatePickerBB2

