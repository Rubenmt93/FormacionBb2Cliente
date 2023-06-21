import React from 'react'
import { Formik, Form } from "formik"
import TextInput from './FormComponents/TextInput'
import ButtonBB2 from './FormComponents/ButtonBB2'
import { useEffect, useState } from "react";
function NewSupplierForm() {
   
    const [query, setQuery] = useState({
        name: '',
        country: '',
    });       
  
    useEffect(() =>{
        console.log("hacer cosas")
    //    if(!query) return
    //     const requestOptions = {                  
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: query.email,
    //         password: query.password,
    //       }),           
    //     };        
        
    //     fetch("http://localhost:8080/auth/login", requestOptions)
    //     .then(response => { 
              
    //     })
        
    //     .catch((e)=>{
    //       console.error(e)
    //     });
    },[query]);   

    const submit = (event) => { 
        event.preventDefault()   
          
        console.log(query)   
    }
    const handleInputChange = (event) => {
       
        setQuery({
            ...query,
            [event.target.name] : event.target.value
        })   
    }
   
  return (
    <div className='flexColumn'>
        <div className='flexColumn'>
        <h2>Nuevo Proveedor</h2>
        </div>
        <div className='container'>                       
            <form 
                onSubmit={submit}>              
                <TextInput name='name' type='text'  placeholder="Nombre"  required onChange={handleInputChange}/>                                         
                <TextInput name='country' type='text'  placeholder="Pais"  required onChange={handleInputChange}/>      
                <div className='reverse-row'>
                    <button className="primary-button" name="button" primary='true' type='submit' >Crear</button>
                </div>                   
            </form>          
        </div>
    </div>
  )
}

export default NewSupplierForm