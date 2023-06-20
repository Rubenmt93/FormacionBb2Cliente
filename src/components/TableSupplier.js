import {  AiOutlinePlusCircle } from 'react-icons/ai'

function TableSupplier( {...props}) {
  
  return (
    <div>
      <h3 className="title">Proveerdores</h3>
        <div className='container'>
        <div className='reverse-row'>
            <AiOutlinePlusCircle/>
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

       
    </div>
  )
}

export default TableSupplier
