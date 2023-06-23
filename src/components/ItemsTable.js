
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";  
import SelectInput from './FormComponents/SelectInput';
import Modal from './Modal';
const token=null           
const ItemsTable =()=>{
  const navigate = useNavigate();
  var numeral = require('numeral');
  const [data, setData] = useState(null);
  const [state, setState] = useState("Todos");
  const [refresh, setRefresh] = useState(true)
  const [estadoModal, SetEstadoModal] = useState({estado:false, idItem:null});
  var ruta ="http://localhost:8080/api/items";
  const currentUser = localStorage.getItem("FormacionBb2User").split(" ");
  useEffect(() =>{
    
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }
    };
   
    if(state !== "Todos"){
      ruta = ruta+ "/filtrar/"+state
    }

      fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((data) =>{    
        setData(data)})
      .catch((e)=>{
        console.error(e)
      });


      console.log(data)
  },[state, refresh])   

   
  const showItems = (idItem) =>{      
      navigate('/itemsDetails/'+idItem);
  }

  
  const handleSelectChange = (event) => {    
    setState( event.target.value)       
  }

  const deleteItem = (idItem) => {
    const token= localStorage.getItem('FormacionBb2Token');
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }        
    }  
    if(!currentUser){      
     return;
    }     
    fetch("http://localhost:8080/api/items/eliminar/"+idItem, requestOptions)
      .then(() =>{setState("Todos")
    setRefresh(!refresh) })
     
    } 
    
  return(
    <div>
      <div className='title'>
        <h1>Listado de Items</h1>
      </div>

      <div  className='container'>  
        <div className='flexLine'>
          <div className="ItemCard-info" > 
            <SelectInput label='Estado' value={state} 
                                        onChange={handleSelectChange} 
                                        name="state">
                <option value='Todos'> Todos</option>                          
                <option value='Activo'> Activo</option>
                <option value='Descontinuado'> Descontinuado</option>                      
            </SelectInput>    
            
            <button className='primary-button alignCenter fontSizeRevert' onClick={() =>setState("Price")}>Ordenar precios</button>
                 
          </div>

        

          <button className='primary-button alignCenter' onClick={() =>{showItems(0)}}>Nuevo</button>
            
        </div>           
        
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
              {(currentUser[3]==="Administrador")? <th>Eliminar</th> :<></> }
            </tr>         
            {data?.map( (item) => (
              <tr key={item.idItem} onDoubleClick ={() => showItems(item.idItem)} style={{cursor:'pointer'}}>
                    <td> <p>{item.itemCode}</p></td>
                    <td> <p>{item.descriptionItem}</p></td>                
                    <td> <p>{item.state}</p></td>
                    <td> <p>{numeral(item.price).format('0,0[.]00 $')}</p></td>
                    <td> <p>{item.creationDate.substring(0,item.creationDate.length - 10).replace('T',' ')}</p></td>
                    <td> <p>{item.creator.name}</p></td>
                    {(currentUser[3]==="Administrador")? <td><p><button className='primary-button' onClick={() =>SetEstadoModal({estado:true, idItem:item.idItem}) }>Eliminar</button></p></td>:<></> }
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Modal
                estado={estadoModal.estado}              
                cerrar={false}                  
                mostrarHeader={false}        
            >

                <div className='contenido'>
                    <h1>¿Seguro que quiere eliminar?</h1>
                    <p>Se eliminará el item de la base de datos</p>
                     <div className='reverse-row'>
                         <button className='secondary-button' onClick={() => {deleteItem(estadoModal.idItem); SetEstadoModal({estado:false, idItem:null})}}>Aceptar</button>
                         <button className='primary-button' onClick={() => SetEstadoModal({estado:false, idItem:null})}>Cancelar</button>
                        
                     </div>
                   
                </div>
            </Modal>
    </div>
        
        
  )
    
}
export default ItemsTable