import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import ItemCard from './ItemCard';
import TableSupplier from './TableSupplier';
import TableDiscount from './TableDiscount';

function ItemDetail() {
    const { idItem } = useParams()
    const [data, setData] = useState(null);
    useEffect(() =>{
    const token= localStorage.getItem('FormacionBb2Token');
        const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': token }
        
        };
        fetch("http://localhost:8080/api/items/"+idItem, requestOptions)
        .then((response) => response.json())
        .then((data) =>{      
            console.log("Respuesta de la api en Details",data)  
            setData((data))            
        })
        .catch((e)=>{
            console.error(e)
        });
        },[])  

    return (
    <div className='container'>       
      <div className='title'>
        <h1>Detalle del Item</h1>
      </div>
        <div className='container'>
         <ItemCard data={data}/> 
      </div>

      <div>
        <TableSupplier suppliers={data?.suppliers}/>
        <TableDiscount discount={data?.priceReductions}/>
      </div>

    </div>
  )
 
  
}

export default ItemDetail
