import React from 'react'
import { useEffect, useState } from "react";

import {  Formik, Form } from "formik"
import TextInput from './FormComponents/TextInput'
import ButtonBB2 from './FormComponents/ButtonBB2'

function ItemCard({...props}) {
  const [itemCode, setItemCode] = useState("");

  useEffect(() =>{
     
        setItemCode((props?.data?.itemCode))  
        },[props])  

  const submit = (values) => { console.log() }
  return (
      
      <div >
         <Formik        
            enableReinitialize
            initialValues={{itemCode: props?.data?.itemCode, 
                            creator:props?.data?.creator.name, 
                            description:  props?.data?.descriptionItem,
                            price: props?.data?.price,
                            state: props?.data?.state,
                            date:props?.data?.creationDate.substring(0, props?.data?.creationDate.length - 10).replace('T',' ')}}          
            onSubmit ={submit}
          > 
      
          <Form className ="formik ItemCard-info">
             
                <div className='ItemCard-Colum1'>
                  <TextInput  type='text' name="itemCode" label="Codigo" readOnly="readOnly" />
                  <TextInput  type='text' name="creator"  label="Creador"   readOnly="readOnly"/>
                  <TextInput  type='text' name="description" label="Descripcion"  readOnly="readOnly" />
                </div>
                
                <div className='ItemCard-Colum2'>
                  <TextInput  type='number' name="price"  label="Precio"  readOnly="readOnly"/>
                  <TextInput  type='text' name="state"  label="Estado"  readOnly="readOnly"/>
                  <TextInput  type='text' name="date"  label="Fecha de Creacion"  readOnly="readOnly"/>
                </div>
              
             
              {/* <ButtonBB2 name="button" primary='true' type='button' text="Enviar"/> */}
          </Form>          
        </Formik>  
      </div>

  )
}

export default ItemCard
