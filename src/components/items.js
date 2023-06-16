
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";  
    const token=null
    
         

const Items =()=>{
  const navigate = useNavigate();
  var numeral = require('numeral');
  const [data, setData] = useState(null);
  useEffect(() =>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }
    };
      fetch("http://localhost:8080/api/items", requestOptions)
      .then((response) => response.json())
      .then((data) =>{  console.log(data)      
        setData(data)})
      .catch((e)=>{
        console.error(e)
      });
  },[])   

    
    const showItems = (idItem) =>{      
       navigate('/itemsDetails/'+idItem);
    }
    return(
      <div>
        <div className='title'>
          <h1>Listado de Items</h1>
        </div>
        <div className='container'>
          <table>
            <tbody>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Creador </th>
                <th>Fecha creacion</th>
                <th>Estado</th>
              </tr>         
              {data?.map( (item) => (
                <tr key={item.idItem} onDoubleClick ={() => showItems(item.idItem)} style={{cursor:'pointer'}}>
                      <td> <p>{item.itemCode}</p></td>
                      <td> <p>{item.descriptionItem}</p></td>
                      <td> <p>{numeral(item.price).format('0,0[.]00 $')}</p></td>
                      <td> <p>{item.creator.name}</p></td>
                      <td> <p>{item.creationDate}</p></td>
                      <td> <p>{item.state}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
        
    )
    
}
export default Items