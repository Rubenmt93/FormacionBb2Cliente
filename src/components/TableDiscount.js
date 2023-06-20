import React from 'react'
import {  AiOutlinePlusCircle } from 'react-icons/ai'
function TableDiscount({...props}) {
  
  return (
    <div>
       <h3 className="title">Reducciones de proveedores</h3>
        <div className='container'>
          <div className='reverse-row'>
            <AiOutlinePlusCircle/>
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

       
    </div>
  )
}

export default TableDiscount
