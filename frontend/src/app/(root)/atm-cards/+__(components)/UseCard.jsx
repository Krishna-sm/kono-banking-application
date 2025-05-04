"use client";
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import { useMainContext } from '@/context/MainContext'
import { axiosClient } from '@/utils/AxiosClient'
import { CARD_TYPE } from '@/utils/constant';
import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Form, Formik ,Field} from 'formik'
import { Fragment, useState } from 'react'
import { RiCloseLargeLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import * as yup from 'yup'
export default function UseCardModel({type}) {
  let [isOpen, setIsOpen] = useState(false)
    const {atm,user,fetchUserProfile} = useMainContext()
    const [loading,setLoading]= useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const initialValues = {
    amount:0,
    pin:0
  }

  const max_amont=  type=='basic'?CARD_TYPE.basic.max:type=='classic'?CARD_TYPE.classic.max: type=='platinum'?CARD_TYPE.platinum.max: 0

  const validationSchema = yup.object({
    amount:yup.number().required("Amount is Required").min(1,"Aleast Enter 1 rs for  Withdrawal ").max(max_amont-1,`Maximum amount should be less than ${max_amont} `),
       pin:yup.string().required("Pin No is Requird").min(4,"Pin No Should be Equal to 4 Digit").max(4,"Equal to 4 Digit")
   
  })

  const onSubmitHandler = async(values,{resetForm})=>{
    try {
        setLoading(true)
        const response = await axiosClient.post(`/atm/withdrawal/${atm._id}`,values,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("token")
            }
        })
        const data = await response.data
        toast.success(data.msg)
        await fetchUserProfile()
        resetForm()
        closeModal()
    } catch (error) {
        toast.error(error.response.data.msg || error.message)
    }finally{
        setLoading(false)
    }
  }



  return (
    <>
      <button  onClick={openModal} className='py-3 px-5 rounded border border-dashed border-rose-700 text-rose-700 hover:bg-rose-500 hover:border-none outline-none hover:text-white transition-all duration-300 cursor-pointer'>Use Card</button>

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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  
 
                              <Dialog.Title
                                as="div"
                                className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                              >
                                <p>Withdrawal amount</p>
                                <button  onClick={closeModal} type='button' className='text-xl p-2 bg-rose-100 rounded-full text-rose-700 cursor-pointer'>
                                  <RiCloseLargeLine/>
                                </button>
                              </Dialog.Title>

                       <div className="mt-2">
                                              <div className="w-full py-3 flex justify-center items-center ">
                                                  <img src="/logo.svg" alt="" className='w-1/2 mx-auto' />
                                              </div> 



          <Formik  initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
        
        
         
                                          <Form  className='py-4'>
                                          <div className="mb-3">
                          <label htmlFor="amount">Amount</label>
                          <Field type="text" id="amount" name="amount" className="w-full py-2 px-3 rounded-md border outline-none border-rose-500" placeholder='Enter Widthrawl Amount' onInput={(e)=>{
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }} />
                          <ErrorMessage  className='text-red-500' component={'p'} name='amount'  /> 
        
                         </div>       
                                     
        
        
                         <div className="mb-3">
                          <label htmlFor="pin">PIN</label>
                          <Field type="text" id="pin" name="pin" className="w-full py-2 px-3 rounded-md border outline-none border-rose-500" placeholder='PIN Number' onInput={(e)=>{
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }} />
                          <ErrorMessage  className='text-red-500' component={'p'} name='pin'  /> 
        
                         </div>
        
                              <div className="mb-3">
                                <CustomAuthButton isLoading={loading}  text={'Withdrawal Amount'} />
                              </div>
        
        
        
        
                                          </Form>
        
        
                         
        
                                  </Formik>
                  
                  
                                    </div>

                
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
