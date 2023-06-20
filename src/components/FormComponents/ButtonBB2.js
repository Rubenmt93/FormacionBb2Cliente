import { useField } from 'formik'
import React from 'react'

const ButtonBB2 = ({text, ...props}) => {
   
  return (
     <button type={props.type} className={props.primary? 'primary-button': 'seconday-button'} onClick={props.onClick}> {text}</button>
  )
}

export default ButtonBB2