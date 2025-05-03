"use client";
import Link from 'next/link';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import ClaimFDModel from './ClaimFDModel';
const FDCard = ({data,isUpdate,setIsUpdate}) => {
    const [isShow,setIsShow] = useState(false)
    
    const amount = `${data.amount}`


  return (
    <div className='py-4 px-2 w-full shadow border rounded flex flex-col'>
            <h2 className='text-3xl font-medium '>{data?.apply_for}</h2>
             <div className='text-2xl text-start w-full font-bold text-zinc-950 flex items-center gap-x-2 justify-start'> <span>&#8377; {isShow ? amount: ``.padStart(amount.length,'x')}/-</span> <button
                onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    setIsShow(!isShow)
                }}
             type='button' className='outline-none cursor-pointer text-rose-700'> { !isShow? <FaEye/>:<FaEyeSlash/>} </button>  </div>         

                <div className="flex justify-end items-center">
                   <ClaimFDModel methods={{isUpdate,setIsUpdate}} id={data?._id} />
                    </div>


    </div>
  )
}

export default FDCard