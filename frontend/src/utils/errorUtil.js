 export const ExtructErrorMessages=(er)=>{
    if(!er) return null
     console.log(er)

    if(er.response?.data){
      const data=er.response.data
    
    //   handle zod
      if(data.errors && Array.isArray(data.errors)){
        return data.errors.slice(1).map((er,i)=> er.message).join(",")
      }

    //   single err
    if(data) return data
    

     //  handle err field
    if(data?.error) return data.error


    }

    // handle network err
    if(er.request && !er.response) return "Network error, Please try again"

    if(er.message) return er.message
 }