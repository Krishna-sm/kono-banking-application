"use client";
import CustomAuthButton from '@/components/reuseable/CustomAuthButton';
import { useMainContext } from '@/context/MainContext';
import { axiosClient } from '@/utils/AxiosClient';
import { Dialog, Transition } from '@headlessui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import * as yup from 'yup'
export default function AddAccountModal() {
    const {fetchUserProfile} = useMainContext()
  let [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const initialValues = {
    ac_type:'saving'
  }
  const validationSchema = yup.object({
    ac_type:yup.string().required("Account is Required").oneOf(['saving','current'],"Account Type should be one of saving , current")
  })

  const onSubmitHandler = async(values,{resetForm})=>{
    try {
        setLoading(true)

        const response = await axiosClient.post('/amount/add-account',values,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem("token")
            }
        })
        const data = await response.data 

        await fetchUserProfile()
        toast.success(data.msg)
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
        <div 
          onClick={openModal}
          className="rounded-md  border border-dashed border-rose-600 text-rose-700 flex items-center justify-center flex-col  py-5 hover:bg-rose-600 hover:text-white transition-all duration-300  cursor-pointer"
        >
                <FaPlus  className='text-4xl' />
                <p className="text-center">Add New +</p>
        </div>
 
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                  >

              <h3>Open New Account</h3>
                <button onClick={closeModal} className='text-2xl p-2 bg-rose-50 rounded-full text-rose-600 cursor-pointer'><RxCross1/></button>

                  </Dialog.Title>
              
                  <div className="mt-2">
                    {/* forms */}

                    <div className="w-full py-3 flex justify-center items-center ">
                                <img src="/logo.svg" alt="" className='w-1/2 mx-auto' />
                            </div> 
                        <div className="py-4 bg-rose-50 px-3 flex flex-col gap-y-2">
                            <p>To Open New Account :-</p>
                            <p className='text-rose-700'>
                                <strong>Saving:</strong> Limit is 0
                            </p>
                            <p className='text-rose-700'>
                                <strong>Current:</strong> Limit is 10
                            </p>
                        </div>

                    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="Account_type">Account Type</label>
                                <Field as="select" id="Account_type" type="text" name="ac_type" className='w-full py-3 px-2 rounded-md border outline-none border-zinc-500'>
                                        <option value="saving">Saving</option>
                                        <option value="current">Current</option>

                                </Field>
                                <ErrorMessage className='text-red-500 ' component={'p'} name='ac_type' />
                            </div>

                        <div className="mb-3">
                            <CustomAuthButton className=' ' text={'Open New Account'} isLoading={loading} />
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
