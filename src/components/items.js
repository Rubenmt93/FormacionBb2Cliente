
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
      .then((data) =>{        
        setData(data)})
      .catch((e)=>{
        console.error(e)
      });
  },[])   

    
    const showItems = (idItem) =>{      
       navigate('/items/'+idItem);
    }
    return(
      <div>
        <h1>items</h1>
        <div>
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
                <tr key={item.idItem} onDoubleClick ={() => showItems(item.idItem)}>
                      <td>{item.itemCode}</td>
                      <td>{item.descriptionItem}</td>
                      <td>{numeral(item.price).format('0,0[.]00 $')}</td>
                      <td>{item.creator.name}</td>
                      <td>{item.creationDate}</td>
                      <td>{item.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
        
    )
    
}
export default Items