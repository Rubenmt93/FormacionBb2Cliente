import React from 'react'
import TextInput from './FormComponents/TextInput'
import {useState } from "react";
import SelectInput from './FormComponents/SelectInput';
import DatePicker from './FormComponents/DatePicker';

function NewSupplierForm({...props}) {
    const token = localStorage.getItem("FormacionBb2Token")  
    const [query, setQuery] = useState({
        reductionType: 'Porcentual',
        reducedPrice:0,
        startDate: new Date(),
        endDate: new Date()
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
            reductionType: query.reductionType,
            reducedPrice:query.reducedPrice,
            startDate:query.startDate,
            endDate: query.endDate
          }),           
        };        
        
        fetch("http://localhost:8080/api/priceReduction", requestOptions)
        .then((response) => response.json())
        .then((data) =>{           
          handleCloseFormLocal()
        }).catch((e)=>  { console.error(e) });
        
       
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

    const handleDateChange = ( campo, event) => {

      setQuery({
          ...query,
          [campo]: event
      })  
      console.log(query)
  }
  const handleSelectChange = (event) => {
      console.log(event.target.value)
      setQuery({
        ...query,
        reductionType: event.target.value
      })  
    
  }
  
    const  handleCloseFormLocal = () => {
        props.handleCloseForm(query)
       
    }
  return (
    <div className='flexColumn'>
        <div className='flexColumn'>
        <h2>Nuevo Descuento</h2>
        </div>
        <div className='container'>  
        <div className='reverse-row'>
            <span  name="button" className='botonCerrarForm' onClick={()=>{handleCloseFormLocal()}} >x</span> 
          </div>
                              
            <form 
                onSubmit={submit}>    
                <SelectInput  label='Tipo' 
                              value={query.reductionType}                                         
                              onChange={handleSelectChange} 
                              name="reductionType">
                                <option value='Porcentual'> Porcentual</option>
                                <option value='CantidadFija'> CantidadFija</option>
                                <option value='CambioDePrecio'> CambioDePrecio</option>                      
                </SelectInput>           
                <TextInput name='reducedPrice' step="0.01"  label="Cantidad"  type='number'  placeholder="Cantidad"  required onChange={handleInputChange}/>                                         
                <DatePicker value={query.startDate} label="Fecha de inicio"  onChange={(e) => handleDateChange("startDate",e)} name="startDate" required/>
                <DatePicker value={query.endDate} label="Fecha de fin"  onChange={(e) => handleDateChange("endDate",e)} name="endDate" required />
                <div className='reverse-row' style={{width:'500px'}}>
                                       
                    <button className="primary-button" name="button" type='submit'  >Crear</button>
                    
                </div>                   
            </form>          
        </div>
    </div>
  )
}

export default NewSupplierForm