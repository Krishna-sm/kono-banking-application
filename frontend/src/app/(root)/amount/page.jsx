"use client";
import HeaderName from '@/components/HeaderName'
import React, { Suspense, useState } from 'react'

import AddAmountModel from '@/components/Amount/AddAmountModel'
import { useMainContext } from '@/context/MainContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AddAccountModal from './+__(components)/AddAccountModal';
import CustomLoader from '@/components/reuseable/CustomLoader';
const AmountPage = () => {

  const {user} = useMainContext()

  return (
    <>
    <div className="container py-10 px-3">
    <HeaderName/>

      <div className="grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-3">
      {
    user && user.account_no && user.account_no.length>0 && user.account_no.map((cur,i)=>{
        return <Card key={i} cur={cur} />
    
    })
   } 

        <Suspense fallback={<CustomLoader/>}>
          
   <AddAccountModal/>
        </Suspense>

      </div>
    
     </div>       
    
    </>
  )
}

export default AmountPage


const Card =({cur})=>{
  const [isShow,setIsShow] = useState(false)

  return  <div className="card w-full border py-5 rounded flex items-center justify-between px-3">
  <div className="flex flex-col">
  <h1 className='text-2xl font-bold'>Add Amount</h1>
  <p className='text-lg text-zinc-500 font-medium'> {cur._id}</p>
   <div className='text-2xl text-start w-full font-bold text-zinc-950 flex items-center gap-x-2 justify-start'> <span>Total Amount &#8377; {isShow ? cur.amount: ``.padStart(`${cur.amount}`.length,'x')}/-</span> <button
                  onClick={(e)=>{
                      e.preventDefault()
                      e.stopPropagation()
                      setIsShow(!isShow)
                  }}
               type='button' className='outline-none cursor-pointer text-black'> { !isShow? <FaEye/>:<FaEyeSlash/>} </button>  </div> 
  </div>
  
  <AddAmountModel id={cur._id} />
</div>
}