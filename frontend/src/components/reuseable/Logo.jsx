import Link from 'next/link'
import React from 'react'


const Logo = () => {
  return (
    <>
    <Link href={'/'}> 
    <img src="/logo.svg" className='w-[50%] md:w-[20%] lg:w-[10%]  ' alt="" /> </Link>
    </>
  )
}

export default Logo