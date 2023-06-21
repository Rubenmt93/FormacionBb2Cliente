import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import ItemCard from './ItemCard';
function ItemDetail() {
    const [refresh, setRefresh] = useState(true)
    const { idItem } = useParams()
    const [data, setData] = useState(null);  
    const navigate = useNavigate();
    const userLocal =  localStorage.getItem('FormacionBb2User');      
    const token= localStorage.getItem('FormacionBb2Token');
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': token }        
    }
    useEffect(() =>{  
       
      if(!userLocal){      
        navigate('/');
      }     
      fetch("http://localhost:8080/api/items/"+idItem, requestOptions)
      .then((response) => response.json())
      .then((data) =>{   setData((data)) }).catch((e)=>  { console.error(e) });
    },[refresh])  
   


    const refrescar = (a) => {
      console.log("refresh");
      console.log(refresh);
      setRefresh(!refresh)
    }
    console.log("object")
    return  !data ? (<></>) : (
    <div >       
      <div className='title'>
        <h1>Detalle del Item</h1>
      </div>     
      <div className='container'>
          <ItemCard data={data} refrescar={refrescar}/>       
      </div>


    </div>
  )
}
  


export default ItemDetail
