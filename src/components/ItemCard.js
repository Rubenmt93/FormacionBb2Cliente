import React from 'react'
import { useEffect, useState } from "react";

import TextInput from './FormComponents/TextInput';
import SelectInput from './FormComponents/SelectInput';
import { AiOutlineSave, AiOutlinePlusCircle } from 'react-icons/ai'
import DatePicker from './FormComponents/DatePicker';

import TableSupplier from './TableSupplier';
import TableDiscount from './TableDiscount';

function ItemCard({...props}) {  

    const [datos, setDatos] = useState({
        idItem: null,
        itemCode: '',
        descriptionItem: '',
        price: '',
        creator: '',
        state: '',
        creationDate: new Date(),
        suppliers: null,
        priceReductions: null,
        discontinuedReport: null,
    })
    const token = localStorage.getItem("FormacionBb2Token")
    const currentUser = localStorage.getItem("FormacionBb2User").split(" ");
    const [touched, setTouched] = useState(false)
    const [newItemFlag, setNewItemFlag]  = useState(false)

    useEffect(() =>{         
        setDatos({
            ...datos,
            idItem: props?.data?.idItem,
            itemCode: props?.data?.itemCode,
            descriptionItem: props?.data?.descriptionItem,
            price: props?.data?.price,
            creator: props?.data?.creator.idUser,
            state:props?.data?.state,
            creationDate: props?.data?.creationDate,
            suppliers: props?.data?.suppliers,
            priceReductions: props?.data?.priceReductions,
            discontinuedReport: props?.data?.discontinuedReport
        })
        setNewItemFlag(false)
    },[])   
  
    const handleInputChange = (event) => {
        setTouched(true);
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })   
    }
    const handleDateChange = (event) => {
        setDatos({
            ...datos,
            creationDate: event
        })  
        setTouched(true);
    }
    const handleSelectChange = () => {
        alert("Aqui se hacen cosas")
        setDatos({
            ...datos,
            state: "Descontinuado"
        })  
        setTouched(true);
    }
    const saveNewItem = () => {
         
        
        const requestOptions = {                  
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },      

          
            body: JSON.stringify({               
                itemCode: datos.itemCode,
                descriptionItem: datos.descriptionItem,
                price: datos.price,
                creator: { "idUser": datos.creator},
                state: datos.state,
                creationDate:  datos.creationDate,
                suppliers: datos.suppliers,
                priceReductions: datos.priceReductions,
                discontinuedReport: null,
            }),           
        };        
        
        fetch("http://localhost:8080/api/items", requestOptions)
            .then(response => {         
                console.log(response)
            }).catch((e)=>{
                console.error(e)
        });
    }
    const saveItem = (event) => {
        event.preventDefault()      
        if(newItemFlag){
            saveNewItem()
        }else{
        
        const requestOptions = {                  
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': token,
                    },      

          
            body: JSON.stringify({
                idItem: datos.idItem,
                itemCode: datos.itemCode,
                descriptionItem: datos.descriptionItem,
                price: datos.price,
                creator: { "idUser": datos.creator},
                state: datos.state,
                creationDate:  datos.creationDate,
                suppliers: datos.suppliers,
                priceReductions: datos.priceReductions,
                discontinuedReport: null,
            }),           
        };        
        
        fetch("http://localhost:8080/api/items", requestOptions)
            .then(response => {         
                console.log(response)
            }).catch((e)=>{
                console.error(e)
        });

        setTouched(false)
    }
}

    const newItem = () => {
        if(!touched){
            setDatos({
                idItem: null,
                itemCode: '',
                descriptionItem: '',
                price: 0,
                creator: currentUser[1],
                state: 'Activo',
                creationDate: new Date(),
                suppliers: null,
                priceReductions: null,
                discontinuedReport: null,
            })
            setNewItemFlag(true)
        }else{
            alert('ajaja')
        }
    }

   
    return (
      
        <div>        
            <form onSubmit={saveItem} >
                <div className='reverse-row'>
                    <button className="primary-button" type='submit'><p>  Guardar <AiOutlineSave/></p> </button>
                    <button className="secondary-button"   type='button'  onClick={newItem}><p>  Nuevo  <AiOutlinePlusCircle/></p> </button>  
                </div>
                <div className ="formik ItemCard-info">
                    <div className='ItemCard-Colum1'>
                        <TextInput  type='number' value={datos.itemCode} label="Codigo"   disabled={!newItemFlag}  required  onChange={handleInputChange} name="itemCode" />
                        <TextInput  type='text' value={datos.creator}  label="Creador" onChange={handleInputChange} name="creator" />
                        <TextInput  type='text' value={datos.descriptionItem} label="Descripcion"  onChange={handleInputChange} required name="descriptionItem"/>  
                    </div>
                    
                    <div className='ItemCard-Colum2'>
                        <TextInput  type='number' value={datos.price}  label="Precio" onChange={handleInputChange} name="price"/>
                    
                        <SelectInput label='Estado' value={datos.state} 
                                    disabled={(datos.state==="Descontinuado")}  
                                    onChange={handleSelectChange} 
                                    name="state">

                            <option value='Activo'> Activo</option>
                            <option value='Descontinuado'> Descontinuado</option>                      
                        </SelectInput>                
                    
                        <DatePicker value={datos.creationDate} label="Fecha de Creacion" disabled={!newItemFlag} onChange={handleDateChange} name="creationDate" />
                    </div> 
                </div>                        
            </form>    

            <TableSupplier suppliers={datos?.suppliers}/>
            <TableDiscount discount={datos?.priceReductions}/>      
         
      </div>

  )
}

export default ItemCard
