"use client";
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { checkout_url, razorpayCallBackUrl } from '@/utils/constant';
import { loadScript } from '@/utils/loadScripts';
import { Dialog, Transition } from '@headlessui/react'
import { Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SiRazorpay } from "react-icons/si";
import { toast } from 'react-toastify';
import * as yup from 'yup'

export default function AddAmountModel({id}) {

  const {user} = useMainContext()

  let [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading]  = useState(false)
  const initial_state={
    amount:0,
    account_no:id
  }
  const validationSchema = yup.object({
    amount:yup.number().min(1,"Enter Minium Amount 1 INR").required("Amount Is Required")
  })

  const onSubmitHandler =async (values,{resetForm})=>{

    try {
      setLoading(true)
      // console.log(values);
     await loadScript(checkout_url)

     const response = await axiosClient.post('/amount/add-money',values,{
      headers:{
        'Authorization':'Bearer '+ localStorage.getItem("token")
      }
     })
     const data = await response.data 


     

     const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: (values.amount*100).toString(),
      currency: 'INR',
      name: "CBI Bank",
      description: "Add Money Transaction",
      callback_url: razorpayCallBackUrl(data.txn_id),
      "image": "/logo.svg",
      // image: { logo },
      order_id: data.order_id,
  
      prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
      }, 
      theme: {  
          color: "#61dafb",
      },
  };


 


  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

     
      // resetForm()
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.msg || error.message)
    }finally{
      setLoading(false)
    }
    
  }


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <> 
        <button type="button"
          onClick={openModal} className='text-3xl text-rose-700 cursor-pointer'> <CiSquarePlus/> </button>
        
 

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[50vh] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                  <span>  Add Payment</span>

                  <button onClick={closeModal} className='text-2xl text-black p-2 bg-rose-100 rounded-full cursor-pointer'>
                    <IoClose/>
                  </button>

                  </Dialog.Title>

                  <div className="w-full py-3 flex justify-center items-center ">
                                <img src="/logo.svg" alt="" className='w-1/2 mx-auto' />
                            </div> 

                         <Formik onSubmit={onSubmitHandler} validationSchema={validationSchema} initialValues={initial_state}>
                         {({values,handleSubmit})=>(
                          <form onSubmit={handleSubmit} className=" w-[96%] lg:w-[80%] mx-auto">
                          <div className="mb-3 flex items-center gap-x-2 border w-full px-2">
                         <RiMoneyRupeeCircleLine className='text-2xl' />   <Field
                         name="amount"
                          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                         type="text" className='w-full py-2 outline-none border-none  rounded' placeholder='Enter Amount (in inr) '/>
                          </div>
                          <div className="mb-3 flex w-full justify-end">
                            <button disabled={values.amount<1 ||loading} className="px-5 flex items-center gap-x-2 w-full bg-rose-600 hover:bg-rose-700 text-white py-2 disabled:bg-rose-500 justify-center rounded"><span>Pay</span> <SiRazorpay/> </button>
                          </div>
                        </form>

                         )}
                         </Formik>
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
