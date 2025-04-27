"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const MessageShow = () => {
const searchParams = useSearchParams()
const [isShow ,setIsShow ] = useState(false)
  
const success_msg = searchParams.get("success") ||""
const error_msg = searchParams.get("error") ||""

  const success ="ring-teal-400 text-teal-600 bg-teal-100 "
  const error ="ring-red-400 text-red-600 bg-red-100 "

  const option = {}

  if(success_msg){
    option['class'] =success
    option['text'] =success_msg
  }
  else if(error_msg){
    option['class'] =error
    option['text'] =error_msg
  }else{
    option['class'] ="hidden"
    option['text'] =""
  }

  return (
    <div className={`py-5 mb-4  ${option.class} ${isShow?'hidden':''} px-3 rounded-md ring-2  lg:px-10  flex items-center justify-between`}>
          <span>{option.text}</span>
         <button  title='close msg' onClick={()=>setIsShow(true)}> 
         <IoClose  className='text-2xl'  />
         </button>
          
    </div>
  )
}

export default MessageShow