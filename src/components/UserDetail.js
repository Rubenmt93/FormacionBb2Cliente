import React from 'react'
import { useEffect, useState } from "react";
import TextInput from './FormComponents/TextInput';
import { AiOutlineSave, AiOutlinePlusCircle } from 'react-icons/ai'
import Modal from './Modal';
import { useParams, useNavigate } from 'react-router-dom'   
import { MultiSelect } from 'primereact/multiselect';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import bcrypt from 'bcryptjs'
function UserDetail() {
    const [refresh, setRefresh] = useState(true)
    const { idUser } = useParams()      
    const token = localStorage.getItem("FormacionBb2Token")     
    const [data, setData] = useState({
        idUser:0,
        name:"",
        email:"",
        rol:[],
        password:''   
    })
    const rolesPool = [
        { name: "Usuario"},
        { name: "Administrador"},       
      ];
    const [selectedRol, setSelectedRol] = useState([]);
    const [touched, setTouched] = useState(false)
    const [newUserFlag, setNewUserFlag]  = useState(false)
    const [estadoModal, SetEstadoModal] = useState(false);
    const [estadoModalConfirmacion, SetEstadoModalConfirmacion] = useState(
        {
            estado:false,
            mensaje:"",
            cuerpo:""
        }
    );

    useEffect(() =>{
        if(idUser  != 0){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': token }        
            }  
            fetch("http://localhost:8080/api/usuario/"+idUser, requestOptions)
                .then((response) => response.json())
                .then((data) =>{  
                    setData((data)) 
                    var roles = []
                    data.rol.forEach(element => {
                        roles.push({'name': element})
                    });

                    setSelectedRol(roles)
                }).catch((e)=>  { console.error(e) });            
        }else{
            setNewUserFlag(true)
            console.log("AQui")
        }    
    },[])  
/*********************************************************************** */
    const handleInputChange = (event) => {
        setTouched(true);
        setData({
            ...data,
            [event.target.name] : event.target.value
        })   
    }
   
    
   
    const saveUser = (event) => {
        const salt = bcrypt.genSaltSync(10)
        event.preventDefault()     
        var rolAux = []
        selectedRol.forEach(element => {
            rolAux.push(element.name)
        });
        var hashedPassword
        if(newUserFlag){
            var hashedPassword = bcrypt.hashSync(data.password, '$2a$10$CwTycUXWue0Thq9StjUM0u') 
           
        }else{
            var hashedPassword= data.password  
        }

        setData({...data, rol:rolAux})      
     

        const requestOptions = {                  
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': token

                    },    
            body: JSON.stringify({   
                idUser: data.idUser,                        
                name:data.name,
                email:data.email,
                rol:rolAux,
                password:hashedPassword 
            }),           
        };        
            
            fetch("http://localhost:8080/api/usuario", requestOptions)
                .then(response => {         
                    SetEstadoModalConfirmacion({estado :true, mensaje :"Actualizado",   cuerpo: "Se ha guardado el usuario"})
                }).catch((e)=>{
                     console.error(e)
            });
    
             setTouched(false);   
             setNewUserFlag(false);    
    }

    const checkChanges  =() => {
        if(!touched){
            newUser()
        }else{
            SetEstadoModal(!estadoModal)
            
        }
    }

    const newUser= () => {
    
            setData({
                idUser:0,
                name:"",
                email:"",
                rol:[],
                password:''   
            })
            setSelectedRol([])
            setNewUserFlag(true)
            setTouched(false)
    }
    
    return (
      
        <div>   
            <div className='title'>
                 <h1>Detalle del Usuario</h1>
            </div>     
            
            <div className='container'>    
                <form onSubmit={saveUser} >
                    <div className='reverse-row'>                            
                        <button className="secondary-button"   type='button'  onClick={checkChanges}><p>  Nuevo  <AiOutlinePlusCircle/></p> </button>  
                        <button className="primary-button" type='submit'><p>  Guardar <AiOutlineSave/></p> </button>
                    </div>

                    <div className ="formik ItemCard-info">
                        <div className='ItemCard-Colum1'>
                            {newUserFlag? <TextInput  type='password'  value={data.password} label="Contraseña"   onChange={handleInputChange} name="password" /> 
                            :<TextInput  type='number'  value={data.idUser} label="IdUser"  disabled   onChange={handleInputChange} name="idUser" />}
                            
                            <TextInput  type='text' value={data.email || ''}  label="Email" onChange={handleInputChange} name="email" />
                        
                        </div>
                        
                        <div className='ItemCard-Colum2'>
                            <TextInput  type='text' value={data.name || ''}  label="Nombre" onChange={handleInputChange} name="name"/>       
                            
                            
                                <div className="multiselect-card">
                                    <label>Basic</label>
                                    <div className="input-wrapper">
                                        <MultiSelect
                                            className='multiselect'
                                            value={selectedRol}
                                            options={rolesPool}
                                            onChange={(e) => setSelectedRol(e.value)}
                                            optionLabel="name"
                                            placeholder="Seleccione roles"
                                            maxSelectedLabels={3}
                                            required
                                            />
                                    </div>
                                </div>                         

                            
                        </div> 
                    </div> 
                                           
                </form>    

                 
            </div>
            <Modal
                estado={estadoModal}              
                cambiarEstado={SetEstadoModal}                  
                mostrarHeader={false}>
                <div className='contenido'>
                    <h1>Descartar Cambios</h1>
                    <p>Existen cambios sin guardar.</p>
                     <div className='reverse-row'>
                         <button className='secondary-button' onClick={() => {newUser(); SetEstadoModal(!estadoModal)}}>Aceptar</button>
                         <button className='primary-button' onClick={() => SetEstadoModal(!estadoModal)}>Cancelar</button>                        
                     </div>                   
                </div>
            </Modal>

            <Modal
                estado={estadoModalConfirmacion.estado}
                cerrar={false}
                cambiarEstado={estadoModalConfirmacion.estado}>

                <div className='contenido'>
                    <h1>{estadoModalConfirmacion.mensaje}</h1>
                    <p>{estadoModalConfirmacion.cuerpo}</p>
                     <div className='reverse-row'>                      
                         <button className='primary-button' onClick={() => SetEstadoModalConfirmacion({ estado: false})}>Ok!</button>                        
                     </div>                   
                </div>
            </Modal>
      </div>
    

  )
}

export default UserDetail
