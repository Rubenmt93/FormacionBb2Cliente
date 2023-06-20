
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";  
import ButtonBB2 from './FormComponents/ButtonBB2';
import SelectInput from './FormComponents/SelectInput';

import {  Formik, Form } from "formik";
const token=null
    
         

const Items =()=>{
  const navigate = useNavigate();
  var numeral = require('numeral');
  const [data, setData] = useState(null);
  const [state, setState] = useState("Todos");
  var ruta ="http://localhost:8080/api/items";
  
  useEffect(() =>{
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }
    };
   
    if(state !== "Todos"){
      ruta = "http://localhost:8080/api/items/filtrar/"+state
    }
      fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((data) =>{    
        setData(data)})
      .catch((e)=>{
        console.error(e)
      });
  },[state])   

   
    const showItems = (idItem) =>{      
       navigate('/itemsDetails/'+idItem);
    }

    const submit = (values) =>{
      setState(values.state)
    }
    return(
      <div>
        <div className='title'>
          <h1>Listado de Items</h1>
        </div>

        <div  className='container'>
        <Formik        
            enableReinitialize
            initialValues={{state: "Todos" }}          
            onSubmit ={(submit)}
          >       
          <Form className ="ItemCard-info">           
            <SelectInput label='Estado' name='state' >
              <option value='Todos'> Todos</option>
              <option value='Activo'> Activo</option>
              <option value='Descontinuado'> Descontinuado</option>                     
            </SelectInput>  
            <div  className="filterButton">
              <ButtonBB2 name="button" primary='true' type='submit' text="Filtrar"/> 
            </div>
            
          </Form>          
        </Formik>  
        </div>
        <div className='container'>
          <table>
            <tbody>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th> Estado </th>
                <th>Precio</th>
                <th>Fecha creacion</th>
                <th>Creador</th>
              </tr>         
              {data?.map( (item) => (
                <tr key={item.idItem} onDoubleClick ={() => showItems(item.idItem)} style={{cursor:'pointer'}}>
                      <td> <p>{item.itemCode}</p></td>
                      <td> <p>{item.descriptionItem}</p></td>                  
                     
                      <td> <p>{item.state}</p></td>
                      <td> <p>{numeral(item.price).format('0,0[.]00 $')}</p></td>
                      <td> <p>{item.creationDate}</p></td>
                      <td> <p>{item.creator.name}</p></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
        
    )
    
}
export default Items