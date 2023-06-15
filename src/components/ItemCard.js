import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'


function ItemCard() {
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
          setData((data))})
        .catch((e)=>{
          console.error(e)
        });
    },[])
  return (
    <div className='container'>
      <h1> {data?.idItem}</h1>
    </div>
  )
}

export default ItemCard
