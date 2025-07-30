import UseAuthStore from '@/lib/store/authStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import Api_url from '../api/apiClient'
import { Navigate, useLocation } from 'react-router'
import { Loader } from 'lucide-react'

export const ProtectedRoute = ({children}) => {
   const location=useLocation()

     const {setAuth, clearAuth, user, token}=UseAuthStore()

   //   console.log(user)

     const {data, isError, error, isLoading, isSuccess}=useQuery({
        queryKey:['currentUser'],
        queryFn: async()=>{
           const response= await Api_url.get("/auth/me")
           return response.data
        },
        retry:1
     })


     useEffect(()=>{
       if(isError) clearAuth()
     },[isError, error, clearAuth, ])

   //   succees case
   useEffect(()=>{
      if(isSuccess && data) setAuth(data, token)
   },[setAuth, data, token, isSuccess])

     

   if(isError) return <Navigate to="/login" replace state={{from:location}}/>
    if(!user) return <Navigate to="/login" replace state={{from:location}}/>
    
    if(isLoading){
      return <div className=' h-screen flex items-center justify-center'>
               <Loader className=' animate-spin'/>
           </div>
    }

  return children
}
