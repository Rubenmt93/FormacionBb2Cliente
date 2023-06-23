import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Modal from './Modal';
function AdminPanel() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(true)
    var ruta ="http://localhost:8080/api/usuario";
    const [estadoModal, SetEstadoModal] = useState({estado:false, idItem:null});
    const currentUser = localStorage.getItem("FormacionBb2User").split(" ");
    const token= localStorage.getItem('FormacionBb2Token');
    useEffect(() =>{

        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': token }
        };
        fetch(ruta, requestOptions)
        .then((response) => response.json())
        .then((data) =>{
            
          setData(data)})
        .catch((e)=>{
          console.error(e)
        });        
    },[refresh,ruta,token])


    const showUser = (idUser) =>{
        navigate('/userDetails/'+idUser);
    }

    const deleteItem = (idUser) => {

        console.log(idUser)
        const token= localStorage.getItem('FormacionBb2Token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': token }
        }
        if(!currentUser){
        return;
        }
        fetch("http://localhost:8080/api/usuario/eliminar/"+idUser, requestOptions)
        .then(() =>{
            setRefresh(!refresh) 
        })

    }

    return(
        <div>
            <div className='title'>
            <h1>Listado de Usuarios</h1>
            </div>
            <div className='container '>
                <div className='reverse-row'>
                     <button className='primary-button' onClick={() =>showUser(0)}>Nuevo</button>

                </div>

            </div>    
            <div className='container'>
                <table>
                    <tbody>
                    <tr>
                        <th>idUser</th>
                        <th>Nombre</th>
                        <th>Email </th>
                        <th>Roles</th>
                        {(currentUser[3]==="Administrador")? <th>Eliminar</th> :<></> }
                    </tr>
                    {data?.map( (user) => (
                       
                            <tr key={user.idUser} onDoubleClick ={() => showUser(user.idUser)} style={{cursor:'pointer'}}>
                            <td> <p>{user.idUser}</p></td>
                           
                            <td> <p>{user.name}</p></td>
                            <td> <p>{user.email}</p></td>
                            <td> <p>{user.rol}</p></td>
                            {(currentUser[3]==="Administrador")? <td><p><button className='primary-button' onClick={() =>SetEstadoModal({estado:true, idUser:user.idUser}) } >Eliminar</button></p></td>:<></> }
                           
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
             <Modal
                  estado={estadoModal.estado}
                  cerrar={false}
                  mostrarHeader={false}>

                  <div className='contenido'>
                      <h1>¿Seguro que quiere eliminar?</h1>
                      <p>Se eliminará el usuario de la base de datos y todos los items creados por el</p>
                       <div className='reverse-row'>
                           <button className='secondary-button' onClick={() => {deleteItem(estadoModal.idUser); SetEstadoModal({estado:false, idUser:null})}}>Aceptar</button>
                           <button className='primary-button' onClick={() => SetEstadoModal({estado:false, idItem:null})}>Cancelar</button>

                       </div>

                  </div>
            </Modal>
        </div>
    )

}
export default AdminPanel
