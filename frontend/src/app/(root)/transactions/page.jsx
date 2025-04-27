"use client";
import HeaderName from '@/components/HeaderName' 
import React, { Suspense, useEffect, useState } from 'react'
import TableCard from './+___compoents/TableCard'
import MessageShow from './+___compoents/MessageShow'
import { toast } from 'react-toastify'
import { axiosClient } from '@/utils/AxiosClient'
import CustomLoader from '@/components/reuseable/CustomLoader';

const Transactions = () => {
  const [transaction,setTransaction ] = useState([])
  const [loading,setLoading] = useState(false)

  const fetchAllTransaction = async()=>{
    setLoading(true)
    try {
      
      const response = await axiosClient.get('/amount/transactions',{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data = await response.data 
      setTransaction(data)

    } catch (error) {
       toast.error(error.response.data.msg || error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllTransaction()
  },[])


  return (
    <>

<div className="container py-10">
            <HeaderName/>




           
<div className="relative overflow-x-auto py-10">
 <div className="px-3">
 <MessageShow/>
 </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 capitalize">
          Txn ID
        </th>
        <th scope="col" className="px-6 py-3 capitalize">
          Type
        </th>
        <th scope="col" className="px-6 py-3 capitalize ">
          Amount
        </th>
        <th scope="col" className="px-6 py-3 capitalize ">
          Date
        </th>
        <th scope="col" className="px-6 py-3 capitalize hidden lg:block">
          Remark
        </th>
      </tr>
    </thead> 
    <tbody>
    <tr>
      <td colSpan={12}>
      {
        loading && <CustomLoader/>
      }
      </td>
     </tr>
    </tbody>
        <Suspense fallback={<CustomLoader/>}>
      <tbody>
            {
             transaction && transaction.length>0 &&transaction.map((cur,i)=>{
                return <TableCard key={i} id={i} data={cur} />
              })

              
            }
        </tbody>
        </Suspense>
       
  </table>
</div>


            </div>

    </>
  )
}

export default Transactions