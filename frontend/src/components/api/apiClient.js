import UseAuthStore from "@/lib/store/authStore"
import  axios from "axios"

const url="https://jwt-based-auth-system.onrender.com/api"
const Api_url=axios.create({
    baseURL:url,
    headers:{
        "Content-Type":"application/json"
    }
})

Api_url.interceptors.request.use((config)=>{
   
    const token=UseAuthStore.getState().token

    if(token) {
        config.headers.Authorization=`Bearer ${token}`
    }
     return config
})

export default Api_url