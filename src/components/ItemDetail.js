import React from 'react'
import { useEffect, useState } from "react";
import TextInput from './FormComponents/TextInput';
import SelectInput from './FormComponents/SelectInput';
import { AiOutlineSave, AiOutlinePlusCircle } from 'react-icons/ai'
import DatePicker from './FormComponents/DatePicker';
import TableSupplier from './TableSupplier';
import TableDiscount from './TableDiscount';
import Modal from './Modal';
import { useParams, useNavigate } from 'react-router-dom'

function ItemDetail({...props}) {  
    const [refresh, setRefresh] = useState(true)
    const { idItem } = useParams()  
    const navigate = useNavigate();
    const token = localStorage.getItem("FormacionBb2Token")  
    const currentUser = localStorage.getItem("FormacionBb2User").split(" ");

    const [data, setData] = useState({
        idItem: 0,
        itemCode: '',
        descriptionItem: '',
        price: '',
        creator: '',
        state: '',
        creationDate: new Date(),
        suppliers: [],
        priceReductions: [],
        discontinuedReport: [],
    })
  
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
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': token }        
          }  
            
        if(!currentUser){      
          navigate('/');
        }     
        fetch("http://localhost:8080/api/items/"+idItem, requestOptions)
        .then((response) => response.json())
        .then((data) =>{ console.log(data);  setData((data)) }).catch((e)=>  { console.error(e) });
    },[refresh])  

    const handleInputChange = (event) => {
        setTouched(true);
        setData({
            ...data,
            [event.target.name] : event.target.value
        })   
    }
    const handleDateChange = (event) => {
        setData({
            ...data,
            creationDate: event
        })  
        setTouched(true);
    }
    const handleSelectChange = () => {
        alert("Aqui se hacen cosas")
        setData({
            ...data,
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
                itemCode: data.itemCode,
                descriptionItem: data.descriptionItem,
                price: data.price,
                creator: { "idUser": data.creator},
                state: data.state,
                creationDate:  data.creationDate,
                suppliers: data.suppliers,
                priceReductions: data.priceReductions,
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

           
            var priceReductionAux = []
            data.priceReductions.forEach(element => {
                priceReductionAux.push({"idPriceReduction" : element.idPriceReduction})
             });
           
            const requestOptions = {                  
                method: "POST",
                headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        },    
                body: JSON.stringify({   
                    idItem: data.idItem,            
                    itemCode: data.itemCode,
                    descriptionItem: data.descriptionItem,
                    price: data.price,
                    creator: { "idUser": data.creator.idUser},
                    state: data.state,
                    creationDate:  data.creationDate,
                    suppliers: data.suppliers,
                    priceReductions: priceReductionAux,
                    discontinuedReport: null,
                }),           
            };        
            
            fetch("http://localhost:8080/api/items", requestOptions)
                .then(response => {         
                   SetEstadoModalConfirmacion({estado :true, mensaje :"Actualizado",   cuerpo: "Se ha modificado el item en la base de datos"})
                }).catch((e)=>{
                    console.error(e)
            });
    
            setTouched(false);
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
       
            setData({
                idItem: null,
                itemCode: '',
                descriptionItem: '',
                price: 0,
                creator: currentUser[1],
                state: 'Activo',
                creationDate: new Date(),
                suppliers: [],
                priceReductions: [],
                discontinuedReport: [],
            })
            setNewItemFlag(true)
            setTouched(false)
    }

    const handleSubmitDiscount = (priceReductionAplicated) =>{
        
        var aux = []
         priceReductionAplicated.forEach(element => {
            aux.push({"idPriceReduction" : element})
        });                
        const requestOptions = {                  
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': token,
                    },      

          
            body: JSON.stringify({
                idItem: data.idItem,
                itemCode: data.itemCode,
                descriptionItem: data.descriptionItem,
                price: data.price,
                creator: { "idUser": data.creator.idUser},
                state: data.state,
                creationDate:  data.creationDate,
                suppliers: data.suppliers,
                priceReductions: aux,
                discontinuedReport: null,
            }),           
        };        
        
        fetch("http://localhost:8080/api/items", requestOptions)
            .then(response => {         
                SetEstadoModalConfirmacion({estado :true, mensaje :"Item Actualizado", cuerpo: "Se han actualizado los campos del item"})    
               
                setRefresh(!refresh)
                             
            }).catch((e)=>{
                console.error(e)
        });
        
        setTouched(false)

     
        
    }

    return (
      
        <div>   
            <div className='title'>
                 <h1>Detalle del Item</h1>
            </div>     
            
            <div className='container'>    
                <form onSubmit={saveItem} >
                    <div className='reverse-row'>                            
                        <button className="secondary-button"   type='button'  onClick={checkChanges}><p>  Nuevo  <AiOutlinePlusCircle/></p> </button>  
                        <button className="primary-button" type='submit'><p>  Guardar <AiOutlineSave/></p> </button>
                    </div>

                    <div className ="formik ItemCard-info">
                        <div className='ItemCard-Colum1'>
                            <TextInput  type='number' value={data.itemCode} label="Codigo"   disabled={!newItemFlag}  required  onChange={handleInputChange} name="itemCode" />
                            <TextInput  type='text' value={data.creator.idUser || ''}  label="Creador" onChange={handleInputChange} name="creator" />
                            <TextInput  type='text' value={data.descriptionItem} label="Descripcion"  onChange={handleInputChange} required name="descriptionItem"/>  
                        </div>
                        
                        <div className='ItemCard-Colum2'>
                            <TextInput  type='number' value={data.price}  label="Precio" onChange={handleInputChange} name="price"/>                        
                            <SelectInput label='Estado' value={data.state} 
                                        disabled={(data.state==="Descontinuado")}  
                                        onChange={handleSelectChange} 
                                        name="state">
                                <option value='Activo'> Activo</option>
                                <option value='Descontinuado'> Descontinuado</option>                      
                            </SelectInput>              
                            <DatePicker value={data.creationDate} label="Fecha de Creacion" disabled={!newItemFlag} onChange={handleDateChange} name="creationDate" />
                        </div> 
                    </div> 
                                           
                </form>    

                <TableSupplier suppliers={data?.suppliers} itemCode={data.idItem}/>
                <TableDiscount discount={data?.priceReductions} handleSubmitDiscount={handleSubmitDiscount} itemCode={data.idItem}/>      
            </div>
            <Modal
                estado={estadoModal}              
                cambiarEstado={SetEstadoModal}                  
                mostrarHeader={false}>
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

export default ItemDetail
