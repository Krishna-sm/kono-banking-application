import Navbar from '@/components/Navbar'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <>
    <Navbar/>
        {children}
    </>
  )
}

export default MainLayout