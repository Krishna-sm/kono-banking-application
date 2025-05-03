"use client" ;
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import moment from 'moment'
import { TbCoins } from "react-icons/tb";
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { useMainContext } from '@/context/MainContext';

const ClaimFDModel = ({id,methods:{isUpdate,setIsUpdate}}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [loading,setLoading]= useState(false)
    const [data,setData]  = useState(null)
    const {fetchUserProfile} = useMainContext()

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  

    const fetchFBInformation =async()=>{
        try {
            setLoading(true)

            const response  = await axiosClient.get(`/fd/get/${id}`,{
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem("token")
                }
            })
            const data = await response.data 

            setData(data)

        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    const claimedFD = async()=>{
        try {
            setLoading(true)

            const response  = await axiosClient.get(`/fd/claim/${id}`,{
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem("token")
                }
            })
            const data = await response.data 

           toast.success(data.msg)
           setIsUpdate(!isUpdate)
         await  fetchUserProfile()
        } catch (error) {
        toast.error(error.response.data.msg || error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchFBInformation()
    },[])

    if(loading){
        return <>
                <div className=""></div>
        </>
    }
    
  return (
    <>
         <button onClick={openModal} className="px-4 py-2 rounded border text-rose-600 border-rose-600 cursor-pointer ">Claim</button>

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
                    className="text-lg font-medium leading-6 flex items-center justify-between text-gray-900"
                  >
                 <h3 className='text-2xl text-rose-500'>  {data?.apply_for}</h3>
    <button onClick={closeModal} className='text-2xl text-rose-700 cursor-pointer outline-none bg-rose-100 rounded-full p-3'>    
    <IoClose/>
    </button>

                  </Dialog.Title>
                  <div className="mt-2">
                            <div className="w-full py-3 flex justify-center items-center ">
                                <img src="/logo.svg" alt="" className='w-1/2 mx-auto' />
                            </div> 
                        <table className='table w-full'>
                           <tbody className='w-full'>
                           <tr className='border text-center w-full'>
                                <th className='text-center py-3 border'>Account No</th>
                                <td className='text-center py-3 border  px-10'>{data?.account}</td>
                            </tr>
                           
                           <tr className='border text-center w-full'>
                                <th className='text-center py-3 border'>Total Amount</th>
                                <td className='text-center py-3 border  px-10'>{data?.amount}/-</td>
                            </tr>
                            <tr className='border text-center py-3 w-full  '>
                                <th className='text-center py-3 border '>Interest Amount {"Per day"} </th>
                                <td className='text-center py-3 border px-10'>{data?.interest_amount_per_day}/-</td>
                            </tr>
                            <tr className='border text-center py-3 w-full '>
                                <th className='text-center py-3 border '>Interest Amount {"Total"} </th>
                                <td className='text-center py-3 border px-10'>{data?.totalamount}/-</td>
                            </tr>
                            <tr className='border text-center py-3 w-full '>
                                <th className='text-center py-3 border'>Apply Date </th>
                                <td className='text-center py-3 border  px-10'>{moment(data?.date).format("LL")}</td>
                            </tr>
                           </tbody>
                        </table>

                       <div className="py-5">
                       <button onClick={claimedFD} disabled={loading} className='w-full rounded py-2 flex justify-center items-center gap-x-2 bg-rose-600 disabled:bg-rose-800 text-white capitalize text-xl'>
                            <span>Claim</span>
                            <TbCoins className='text-2xl' />
                        </button>
                       </div>


                  </div>

                  <div className="mt-4">
                  
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

export default ClaimFDModel