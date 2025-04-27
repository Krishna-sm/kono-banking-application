import clsx from 'clsx'
import React from 'react'
import {CgSpinner} from 'react-icons/cg'
const CustomAuthButton = ({
    isLoading=false,
    className="",
    type="submit", 
    text,
    ...props
}) => {
  return (
    <>
            <button  type={type} {...props} disabled={isLoading} className={clsx(className,

isLoading&&"disabled:bg-rose-700 " ,
"w-full flex items-center justify-center capitalize text-white text-lg bg-rose-600 py-3 gap-x-2 rounded shadow"

            )}> <span>{text}</span> { isLoading&&<CgSpinner  className='animate-spin text-xl' />} </button>
    </>
  )
}

export default CustomAuthButton