import HeaderName from '@/components/HeaderName'
import React from 'react'
import SelectCard from './+__(components)/SelectCard'
import AddNewCardDialog from './+__(components)/AddNewCard'
import ViewATMCard from './+__(components)/ViewATMCard'

const AtmCards = () => {
  return (
    <>
        <div className="container py-10">
        <HeaderName/>
        

    <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3">
      <div className=" grid-cols-1 lg:col-span-2">
      <SelectCard/>
      </div>
      <div className="col-span-1 flex justify-end">
        <AddNewCardDialog/>
      </div>
    </div>

        <div className="container min-h-[50vh] flex items-center justify-center w-full">
          <ViewATMCard/>
        </div>

    


        </div>
    </>
  )
}

export default AtmCards