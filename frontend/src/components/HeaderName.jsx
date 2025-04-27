"use client";
import { useMainContext } from '@/context/MainContext'
import React from 'react'

const HeaderName = () => {

  const {user} = useMainContext()

  return (
    <>
          <div className="py-2">
      <h1 className="text-5xl font-bold capitalize">{user.name}</h1>
    </div>
    </>
  )
}

export default HeaderName