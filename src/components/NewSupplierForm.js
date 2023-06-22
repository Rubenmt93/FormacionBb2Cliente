import React from 'react'
import { Formik, Form } from "formik"
import TextInput from './FormComponents/TextInput'
import ButtonBB2 from './FormComponents/ButtonBB2'
import { useEffect, useState } from "react";
function NewSupplierForm({...props}) {
    const token = localStorage.getItem("FormacionBb2Token")  
    const [query, setQuery] = useState({
        name: '',
        country: '',
    });       
    
  
    const makeFetch= () =>{     
       
        const requestOptions = {                  
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': token,
          },
          body: JSON.stringify({
            name: query.name,
            country: query.country,
          }),           
        };        
        
        fetch("http://localhost:8080/api/supplier", requestOptions)
        .then((response) => response.json())
        .then((data) =>{            

          handleCloseFormLocal()

        })
        
        
        .catch((e)=>  { console.error(e) });
        
       
    }   


    const submit = (event) => { 
        event.preventDefault()   
        makeFetch()
        console.log(query)   
    }
    const handleInputChange = (event) => {
       
        setQuery({
            ...query,
            [event.target.name] : event.target.value
        })   
    }
    const  handleCloseFormLocal = () => {
        props.handleCloseForm(query)
        console.log(props)
    }
  return (
    <div className='flexColumn'>
        <div className='flexColumn'>
        <h2>Nuevo Proveedor</h2>
        </div>
        <div className='container'>  
        <div className='reverse-row'>
            <span  name="button"  onClick={()=>{handleCloseFormLocal()}} >x</span> 
          </div>
                              
            <form 
                onSubmit={submit}>              
                <TextInput name='name' type='text'  placeholder="Nombre"  required onChange={handleInputChange}/>                                         
                <TextInput name='country' type='text'  placeholder="Pais"  required onChange={handleInputChange}/>      
                <div className='reverse-row' style={{width:'500px'}}>
                                       
                    <button className="primary-button" name="button" type='submit'  >Crear</button>
                    
                </div>                   
            </form>          
        </div>
    </div>
  )
}

export default NewSupplierForm