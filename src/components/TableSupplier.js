import {  AiOutlinePlusCircle } from 'react-icons/ai'
import Modal from './Modal';
import React, { useState, useEffect } from 'react'
import { Checkbox } from '@mui/material';
import NewSupplierForm from './NewSupplierForm';

function TableSupplier( {...props}) {
  
  const [estadoModal, setEstadoModal] =useState(false);
  const [data, setData] = useState(null); 
  const [supplierAplicated, setSupplierAplicated] = useState([])
  const [newSupplier, setNewSupplier] = useState(false); 
  useEffect(() =>{
    const token = localStorage.getItem("FormacionBb2Token")
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }
    };
    var ruta ="http://localhost:8080/api/supplier";
    
    fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((data) =>{                 
        setData(data)        
      }).catch((e)=>{
        console.error(e)
      });
  },[supplierAplicated, estadoModal,newSupplier])
 

  const handleChange =(id) =>{    
    if (supplierAplicated.includes(id)){
      setSupplierAplicated(supplierAplicated.filter(item => item !== id))
    }else{      
      setSupplierAplicated([...supplierAplicated,id])      
    }    
  }  
  const openModal = ()  => {
    setEstadoModal(!estadoModal); 
    var aux=  []
    props.suppliers?.map( element => {
      aux.push(element.idSupplier)
    })
    setSupplierAplicated(aux)
  }

  const handleCloseForm = (e) => {
    setNewSupplier(!newSupplier)
  }
  const submit = () => {
    props.handleSubmitSupplier(supplierAplicated)
  }
  return (
    <div>
      <h3 className="title">Proveerdores</h3>
        <div className='container'>
          <div className='reverse-row'>
            <AiOutlinePlusCircle className='openTableIcon' onClick={() => {(props.state === "Activo")?openModal(): <></>}}/>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Pais</th>
                
              </tr>         
                {props?.suppliers?.map( (supplier) => (
                <tr key={supplier.idSupplier}>
                      <td> <p>{supplier.name}</p></td>
                      <td> <p>{supplier.country}</p></td>
                     
                </tr>
              ))}    

              
            </tbody>
          </table>
        </div>

        <Modal 
                estado={estadoModal}              
                cambiarEstado={setEstadoModal}                  
                mostrarHeader={false}>
               
              <div className='contenido'>
                <h1>Proveedores</h1>     
                <div className='flexLine' >
                  {newSupplier?  <NewSupplierForm handleCloseForm={handleCloseForm} />   : 
                                  <div className='reverse-row'>
                                    <button className='secondary-button' onClick={() => setNewSupplier(!newSupplier)}>Crear</button> 
                                  </div>}

                </div>           
                <table className='tablaModal'>
                  <tbody>
                    <tr>               
                      <th>Aplicado</th>
                      <th>Nombre</th>
                      <th>Pais</th>
                     
                    </tr>         
                    {data?.map( (supplier) => (
                      
                    <tr key={supplier.idSupplier}>    
                          {}
                          <td> <p><Checkbox checked={supplierAplicated.includes(supplier.idSupplier)} onChange={() => {handleChange(supplier.idSupplier)}}></Checkbox> </p></td>                         
                          <td> <p>{supplier.name}</p></td>
                          <td> <p>{supplier.country}</p> </td>
                         
                    </tr>
                    ))}             
                  </tbody>
                </table>
                <div className='reverse-row'>
                    <button className='primary-button' onClick={() => { submit(); setEstadoModal(!estadoModal)}}>Aplicar</button>
                </div>                   
              </div>
            </Modal>
       
    </div>
  )
}

export default TableSupplier
