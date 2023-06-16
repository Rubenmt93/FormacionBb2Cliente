import React, { useEffect, useState } from 'react'

function TableSupplier( {...props}) {
  
  return (
    <div>
      <h3 className="title">Reducciones de Precio</h3>
        <div className='container'>
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

       
    </div>
  )
}

export default TableSupplier
