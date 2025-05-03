"use client";
import Loader from '@/components/Loader';
import { useMainContext } from '@/context/MainContext';
import { setIsToggle, SidebarSlicePath } from '@/redux/slice/sidebarSlice';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {MdDashboard} from 'react-icons/md'
import { GiFalloutShelter } from 'react-icons/gi';
import { GrCurrency } from "react-icons/gr";
import { PiNewspaperClipping } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCardSharp } from "react-icons/io5";

const RootTemplate = ({children}) => {

  const {user} = useMainContext()
  const [loading,setLoading] = useState(true)

const router = useRouter()
const isToggle = useSelector(SidebarSlicePath)
const dispatch = useDispatch()
  
useEffect(()=>{
  if(!user){
    router.push("/login")
   
  }else{
    setLoading(false)
  }
},[user])

if(loading){
  return <div className='min-h-screen flex items-center justify-center'>
    <Loader/>
  </div>
}

const CustomMenu = ({link,text,Icon})=>{
  const pathname= usePathname()
  return <>
  <MenuItem
  style={{
    background:pathname === link?'#c60036':'#ffff',
    color:pathname === link?'white':'black',
    borderRadius:pathname === link?"10px":'0px'
  }}
  icon={<Icon className="text-2xl" />}
  component={<Link href={link} />}> {text} </MenuItem>
  </>
}

  return (
    <>  
        <section className="flex item-start">
        <Sidebar breakPoint='lg' toggled={isToggle} onBackdropClick={()=>dispatch(setIsToggle())}>
  <Menu className='!bg-white !min-h-screen lg:!min-h-[90vh] px-3 py-10'>
      <CustomMenu link={'/'} text={'Home'} Icon={MdDashboard} />
      <CustomMenu link={'/amount'} text={'Account'} Icon={GrCurrency} />
      <CustomMenu link={'/fd-amount'} text={'Fix Deposit'} Icon={GiReceiveMoney} />
      <CustomMenu link={'/transactions'} text={'Transactions'} Icon={PiNewspaperClipping} />
      <CustomMenu link={'/atm-cards'} text={'ATM Cards'} Icon={IoCardSharp} />
      <CustomMenu link={'/profile'} text={'Profile'} Icon={GiFalloutShelter} />
  
  </Menu>
</Sidebar> 
<main className='px-1 md:px-3 w-full'>
     {children}
  </main>
        </section>
    </>
  )
}

export default RootTemplate