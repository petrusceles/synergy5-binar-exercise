import React from 'react'
import '../App.css';
export default function Car({name,price,year,image}) {
  return (
    <div className='car'>
        <p>{name}</p>
        <p>{price}</p>
        <p>{year}</p>
        <img src={image} width='200px' alt={`gambar ${name}`}/>
    </div>
  )
}
