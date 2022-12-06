import React from 'react'

export default function Student({ student }) {
  const { name, age } = student;

  return (
    <div>
      <h1>Nama: {name}</h1>
      <h2>Umur: {age}</h2>
    </div>
  )
}
