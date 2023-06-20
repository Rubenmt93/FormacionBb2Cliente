import React from 'react'
import { useEffect, useState } from "react";
import TextInput from './FormComponents/TextInput';
import SelectInput from './FormComponents/SelectInput';
import { AiOutlineSave, AiOutlinePlusCircle } from 'react-icons/ai'
import DatePicker from './FormComponents/DatePicker';
import TableSupplier from './TableSupplier';
import TableDiscount from './TableDiscount';
import Modal from './Modal';

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
    const [estadoModal, SetEstadoModal] = useState(false);
    const [estadoModalConfirmacion, SetEstadoModalConfirmacion] = useState(
        {
            estado:false,
            mensaje:"",
            cuerpo:""
        }
    );
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
               SetEstadoModalConfirmacion({estado :true, mensaje :"Item creado",   cuerpo: "Se ha creado el nuevo item"})
            }).catch((e)=>{
                console.error(e)
        });

        setTouched(false);
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
                SetEstadoModalConfirmacion({estado :true, mensaje :"Item Actualizado", cuerpo: "Se han actualizado los campos del item"})
            }).catch((e)=>{
                console.error(e)
        });

        setTouched(false)
    }
}

    const checkChanges  =() => {
        if(!touched){
            newItem()
        }else{
            SetEstadoModal(!estadoModal)
            
        }
    }

    const newItem = () => {
       
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
            setTouched(false)
    }

   
    return (
      
        <div>        
            <form onSubmit={saveItem} >
                <div className='reverse-row'>
                    <button className="secondary-button"   type='button'  onClick={checkChanges}><p>  Nuevo  <AiOutlinePlusCircle/></p> </button>  
                    <button className="primary-button" type='submit'><p>  Guardar <AiOutlineSave/></p> </button>
                   
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

            <TableSupplier suppliers={datos?.suppliers} itemCode={datos.idItem}/>
            <TableDiscount discount={datos?.priceReductions} itemCode={datos.idItem}/>      
           
            <Modal
                estado={estadoModal}              
                cambiarEstado={SetEstadoModal}                  
                mostrarHeader={false}        
            >

                <div className='contenido'>
                    <h1>Descartar Cambios</h1>
                    <p>Existen cambios sin guardar.</p>
                     <div className='reverse-row'>
                         <button className='secondary-button' onClick={() => {newItem(); SetEstadoModal(!estadoModal)}}>Aceptar</button>
                         <button className='primary-button' onClick={() => SetEstadoModal(!estadoModal)}>Cancelar</button>
                        
                     </div>
                   
                </div>
            </Modal>

            <Modal
                estado={estadoModalConfirmacion.estado}
                cerrar={false}
                cambiarEstado={estadoModalConfirmacion.estado}>

                <div className='contenido'>
                    <h1>{estadoModalConfirmacion.mensaje}</h1>
                    <p>{estadoModalConfirmacion.cuerpo}</p>
                     <div className='reverse-row'>                      
                         <button className='primary-button' onClick={() => SetEstadoModalConfirmacion({ estado: false})}>Ok!</button>                        
                     </div>                   
                </div>
            </Modal>
      </div>

  )
}

export default ItemCard
