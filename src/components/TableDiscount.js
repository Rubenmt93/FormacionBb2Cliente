import { Checkbox } from '@mui/material';
import React, { useState } from 'react'
import {  AiOutlinePlusCircle } from 'react-icons/ai'
import Modal from './Modal';
function TableDiscount({...props}) {
 
  
  const [estadoModal, setEstadoModal] =useState(false);
  const [data, setData] = useState(null);
  const getAllPriceReduction=() =>{
      const token = localStorage.getItem("FormacionBb2Token")
      const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': token }
      };
      var ruta ="http://localhost:8080/api/priceReduction";
      fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((data) =>{    
        data.map( a => {
          console.log(a)
          a.itemsReduced.map(b => {

            if(b === props.itemCode){
              a.banana=true
              
            }else{
              a.banana=false
            }
          })
        }

        )
        
        setData(data)
        
        
      })
      
      .catch((e)=>{
        console.error(e)
      });
  }


  return (
    <div>
       <h3 className="title">Reducciones de precios</h3>
        <div className='container'>
          <div className='reverse-row'>
             <AiOutlinePlusCircle onClick={() => {getAllPriceReduction();setEstadoModal(!estadoModal)}}/> 
          </div>

          <table>
            <tbody>
              <tr>
               
                <th>Tipo de descuento</th>
                <th>Descuento</th>
                <th>Fecha de inicio</th>
                <th>Fecha de fin</th>
              </tr>         
                {props?.discount?.map( (priceReductions) => (
                <tr key={priceReductions.idPriceReduction}>
                     
                      <td> <p>{priceReductions.reductionType}</p></td>
                      <td> <p>{priceReductions.reducedPrice}<span>{(priceReductions.reductionType ==="Porcentual")? '% ': '€'}</span></p> </td>
                      <td> <p>{priceReductions.startDate.substring(0, priceReductions.startDate.length - 10).replace('T',' ')}</p></td>
                      <td> <p>{priceReductions.endDate.substring(0, priceReductions.endDate.length - 10).replace('T',' ')}</p></td>
                     
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
                <h1>Price Reductions</h1>                
                <table className='tablaModal'>
                  <tbody>
                    <tr>               
                      <th>Aplidado</th>
                      <th>Tipo de descuento</th>
                      <th>Descuento</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha de fin</th>
                    </tr>         
                    {data?.map( (priceReductions) => (
                    <tr key={priceReductions.idPriceReduction}>    
                          <td> <p><Checkbox checked={priceReductions.banana}></Checkbox> </p></td>                        
                          <td> <p>{priceReductions.reductionType}</p></td>
                          <td> <p>{priceReductions.reducedPrice}<span>{(priceReductions.reductionType ==="Porcentual")? '% ': '€'}</span></p> </td>
                          <td> <p>{priceReductions.startDate.substring(0, priceReductions.startDate.length - 19).replace('T',' ')}</p></td>
                          <td> <p>{priceReductions.endDate.substring(0, priceReductions.endDate.length - 19).replace('T',' ')}</p></td>
                        
                    </tr>
                    ))}             
                  </tbody>
                </table>
                <div className='reverse-row'>
                    <button className='primary-button' onClick={() => { setEstadoModal(!estadoModal)}}>Aplicar</button>
                </div>                   
              </div>
            </Modal>
       
    </div>
  )
}

export default TableDiscount
