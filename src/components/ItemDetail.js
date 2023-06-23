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
import TableReport from './TableReport';

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
        price: 0,
        creator: {"idUser":currentUser[1]},
        state: 'Activo',
        creationDate: new Date(),
        suppliers: [],
        priceReductions: [],
        discontinuedReport: '',
    })
  
    const [touched, setTouched] = useState(false)
    const [newItemFlag, setNewItemFlag]  = useState(false)
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalConfirmacion, setEstadoModalConfirmacion] = useState(
        {
            estado:false,
            mensaje:"",
            cuerpo:""
        }
    );
    const [estadoModalDiscontinued, setEstadoModalDiscontinued] = useState(false)
    const [ reportReason, setReportReason]= useState('')

    useEffect(() =>{
        if(idItem != 0){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': token }        
            }                  
            if(!currentUser){      
              navigate('/');
            }     
            fetch("http://localhost:8080/api/items/"+idItem, requestOptions)
            .then((response) => response.json())
            .then((data) =>{ 
                console.log(data)
                setData((data)) 

            }).catch((e)=>  { console.error(e) });
        }else{
            setNewItemFlag(true)
        }
       
    },[refresh,idItem,navigate])  

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
        setEstadoModalDiscontinued(true)
        setData({
            ...data,
            state: "Descontinuado"
        })  
        setTouched(true);
    }
    const saveReport =() => {
        const requestOptions = {                  
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': token 
                    },    
            body: JSON.stringify({   
                itemDiscontinued: {"idItem" : data.idItem},                           
                user: { "idUser": currentUser[1]},
                reason:  reportReason
            }),  
                     
        };  
        fetch("http://localhost:8080/api/discontinuedReport", requestOptions)
        .then(response => {}).catch((e)=>{
            console.error(e)
        })      
    }
    const saveItem = (event) => {
        event.preventDefault()            
        var priceReductionAux = []
        data.priceReductions.forEach(element => {
            priceReductionAux.push({"idPriceReduction" : element.idPriceReduction})
        });

        if(reportReason !== ''){
            saveReport()
           
        }
        
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
                setEstadoModalConfirmacion({estado :true, mensaje :"Actualizado",   cuerpo: "Se ha modificado el item en la base de datos"})
            }).catch((e)=>{
                console.error(e)
        });

        setTouched(false);
        navigate('/')
    }

    const checkChanges  =() => {
        if(!touched){
            newItem()
        }else{
            setEstadoModal(!estadoModal)
            
        }
    }

    const newItem = () => {
    
            setData({
                idItem: 0,
                itemCode: '',
                descriptionItem: '',
                price: 0,
                creator: {"idUser":currentUser[1]},
                state: 'Activo',
                creationDate: new Date(),
                suppliers: [],
                priceReductions: [],
                discontinuedReport: '',
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
                discontinuedReport: data.discontinuedReport,
            }),           
        };        
        
        fetch("http://localhost:8080/api/items", requestOptions)
            .then(response => {         
                setEstadoModalConfirmacion({estado :true, mensaje :"Item Actualizado", cuerpo: "Se han actualizado los campos del item"})    
               
                setRefresh(!refresh)
                             
            }).catch((e)=>{
                console.error(e)
        });        
        setTouched(false)            
    }
   

    const handleSubmitSupplier = (supplierAplicated) => {
        var priceReductionToJson= []
        data.priceReductions.forEach( element => {
            priceReductionToJson.push({"idPriceReduction" : element.idPriceReduction})
        });   
        var SupplierToJson = []
        supplierAplicated.forEach(element => {
            SupplierToJson.push({"idSupplier" : element})
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
               creationDate: data.creationDate,
               suppliers:SupplierToJson,
               priceReductions: priceReductionToJson,
               discontinuedReport: data.discontinuedReport,
           }),           
       };        
      
       fetch("http://localhost:8080/api/items", requestOptions)
           .then(response => {         
               setEstadoModalConfirmacion({estado :true, mensaje :"Item Actualizado", cuerpo: "Se han actualizado los campos del item"})    
              
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
                            <TextInput  type='number'  value={data.itemCode} label="Codigo"   disabled={!newItemFlag}  required  onChange={handleInputChange} name="itemCode" />
                            <TextInput  type='text' value={data.creator.idUser || ''}  label="Creador" disabled= {(data.state === 'Descontinuado')} onChange={handleInputChange} name="creator" />
                            <TextInput  type='text' value={data.descriptionItem} label="Descripcion" disabled= {(data.state === 'Descontinuado')} onChange={handleInputChange} required name="descriptionItem"/>  
                        </div>
                        
                        <div className='ItemCard-Colum2'>
                            <TextInput  type='number' step="0.01" value={data.price}  label="Precio" disabled= {(data.state === 'Descontinuado')} onChange={handleInputChange} name="price"/>                        
                            <SelectInput label='Estado' value={data.state} 
                                        disabled={(data.state==="Descontinuado")}  
                                        onChange={handleSelectChange} 
                                        name="state">
                                <option value='Activo'> Activo</option>
                                <option value='Descontinuado'> Descontinuado</option>                      
                            </SelectInput>              
                            <DatePicker value={data.creationDate} label="Fecha de Creacion" disabled={(!newItemFlag)||(data.state === 'Descontinuado')} onChange={handleDateChange} name="creationDate" />
                        </div> 
                    </div> 
                                           
                </form>    
                {(data.discontinuedReport !== ''  && data.discontinuedReport !== null)?
                     <TableReport  discontinuedReport={ data.discontinuedReport }/>
                     :<></>
                }
               

                <TableSupplier suppliers={data?.suppliers} state={data?.state} itemCode={data.idItem} handleSubmitSupplier={handleSubmitSupplier}/>
                <TableDiscount discount={data?.priceReductions} state={data?.state} price = {data?.price} handleSubmitDiscount={handleSubmitDiscount} itemCode={data.idItem}/>      
            </div>
            <Modal
                estado={estadoModal}              
                cambiarEstado={setEstadoModal}                  
                mostrarHeader={false}>
                <div className='contenido'>
                    <h1>Descartar Cambios</h1>
                    <p>Existen cambios sin guardar.</p>
                     <div className='reverse-row'>
                         <button className='secondary-button' onClick={() => {newItem(); setEstadoModal(!estadoModal)}}>Aceptar</button>
                         <button className='primary-button' onClick={() => setEstadoModal(!estadoModal)}>Cancelar</button>                        
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
                         <button className='primary-button' onClick={() => setEstadoModalConfirmacion({ estado: false})}>Ok!</button>                        
                     </div>                   
                </div>
            </Modal>

            <Modal
                estado={estadoModalDiscontinued}
                cerrar={false}
                cambiarEstado={setEstadoModalDiscontinued}>

                <div className='contenido'>
                    <h1>Descontinuar Item</h1>
                    <p>El item dejará de estar activo y no podrá editarse</p>
                    <form onSubmit = {(e) => { e.preventDefault();setEstadoModalDiscontinued(!estadoModalDiscontinued)}}>  
                      <TextInput  type='text'  value={reportReason} label="Motivo"   required  onChange={(e)=> {  setReportReason(e.target.value)}} name="itemCode" />

                   
                    
                     <div className='reverse-row'>  
                        <button className='secondary-button' onClick={() =>{ setReportReason(''); setEstadoModalDiscontinued(!estadoModalDiscontinued)}}>Cancelar</button>        
                        <button className='primary-button' type='submit' >Ok!</button>                         
                         

                     </div>      
                     </form>             
                </div>
            </Modal>
            
      </div>
    

  )
}

export default ItemDetail
