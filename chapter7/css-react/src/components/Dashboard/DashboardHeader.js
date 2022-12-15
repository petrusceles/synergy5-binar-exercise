import React from 'react'

export default function DashboardHeader({userName}) {
  return (
    <div className='flex w-full justify-end shadow-lg sticky top-0 bg-slate-50 px-20 py-5'>
        <p>{userName}</p>
    </div>
  )
}
