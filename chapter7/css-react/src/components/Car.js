import React from 'react'

export default function Car({name,price,year,image}) {
  return (
    <div className="rounded-lg bg-amber-50 shadow-md p-5  grid-rows-2">
      <img src={image} width={"400px"} alt={name+" image"}/>
      <div className="text-slate-800 font-medium grid gap-2 mt-[5%]">
        <p className="font-normal text-sm">{`${name}/${year}`}</p>
        <p className="font-semibold">{price}</p>
      </div>
    </div>
  )
}
