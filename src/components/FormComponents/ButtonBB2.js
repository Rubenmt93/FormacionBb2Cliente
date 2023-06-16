import { useField } from 'formik'
import React from 'react'

const ButtonBB2 = ({text, ...props}) => {
    const[ field, meta]= useField(props)
   
  return (
     <button type={props.type} className={props.primary? 'primary-button': 'seconday-button'} {... field}> {text}</button>
  )
}

export default ButtonBB2