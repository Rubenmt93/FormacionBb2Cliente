import React from 'react'

function TableDiscount({...props}) {
  console.log({props})
  return (
    <div>
       <h3 className="title">Reducciones de proveedores</h3>
        <div className='container'>
          <table>
            <tbody>
              <tr>
                <th>Fecha de inicio</th>
                <th>Fecha de fin</th>
                <th>Tipo de descuento</th>
                <th>Descuento</th>
              </tr>         
                {props?.discount?.map( (priceReductions) => (
                <tr key={priceReductions.idPriceReduction}>
                      <td> <p>{priceReductions.startDate.substring(0, priceReductions.startDate.length - 10).replace('T',' ')}</p></td>
                      <td> <p>{priceReductions.endDate.substring(0, priceReductions.endDate.length - 10).replace('T',' ')}</p></td>
                      <td> <p>{priceReductions.reductionType}</p></td>
                      <td> <p>{priceReductions.reducedPrice}<span>{(priceReductions.reductionType =="Porcentual")? '% ': '€'}</span></p> </td>
                     
                </tr>
              ))}   

              
            </tbody>
          </table>
        </div>

       
    </div>
  )
}

export default TableDiscount
