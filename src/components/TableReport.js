import React from 'react'

function TableReport({...props}) {
  return (
    <div>
       <table>
            <tbody>
              <tr>
                <th>Desactivado por </th>
                <th>Email </th>
                <th>Razon</th>                
              </tr>         
              <tr >
                      <td> <p>{props.discontinuedReport.user.idUser}</p></td>
                      <td> <p>{props.discontinuedReport.user.email}</p></td>
                      <td> <p>{props.discontinuedReport.reason}</p></td>
                     
            </tr>
            

              
            </tbody>
          </table>
    </div>
  )
}

export default TableReport
