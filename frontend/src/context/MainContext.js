"use client";
import Loader from "@/components/Loader";
import { axiosClient } from "@/utils/AxiosClient";
import { toast } from "react-toastify";

// const { createContext, useContext, useState, useEffect } = require("react");
import {createContext, useContext, useState, useEffect} from 'react'
import { useRouter } from "next/navigation";

const mainContext = createContext({user:{},fetchUserProfile(){},LogoutHandler(){}})

export const useMainContext = ()=> useContext(mainContext)

export const MainContextProvider = ({children})=>{

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const router = useRouter()

    // to fetch user profile 
    const fetchUserProfile = async()=>{

        try {
            const token =localStorage.getItem("token") || ''
            if(!token) return
            const response = await axiosClient.get('/auth/profile',{
                headers:{
                    'Authorization':'Bearer '+ token
                }
            })
            const data  = await response.data
            console.log(data)
            setUser(data)


        } catch (error) {
            toast.error(error.response.data.msg || error.message)
        }finally{
            setLoading(false)
        }
    }

    const LogoutHandler = ()=>{
        localStorage.removeItem("token")
        setUser(null)
        router.push("/login")
        toast.success("Logout Success")
    }


    useEffect(()=>{
        fetchUserProfile()
    },[])

    if(loading){
            return <div className="min-h-screen flex items-center justify-center w-full">
                <Loader/>
            </div>
    }

    return <mainContext.Provider value={{user,fetchUserProfile,LogoutHandler}}>
        {children}
    </mainContext.Provider>
}