import { create } from "zustand";
import {persist} from 'zustand/middleware'

 const UseAuthStore=create(
     
    persist(
        (set, get)=> ({
            user:null,
            token:null,
            isAuthenticated:false,


            // set User Data and token
             setAuth:(userData, UserToken)=>set({
                user:userData,
                token:UserToken,
                isAuthenticated:true
             }),

            //  clear Auth
            clearAuth:()=>set({
             user:null,
             token:null,
             isAuthenticated:false,
            }),


            // get token outside of the component
            getToken: ()=> get().token
        }),
        {
            name:"Auth-storage",
            partialize: ({user, token, isAuthenticated})=>({
                user,
                token,
                isAuthenticated
            })
        }
    )
)

export default UseAuthStore