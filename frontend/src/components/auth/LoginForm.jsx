import React, { useId, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router'
import { useFormState } from 'react-dom'
import { Loader } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { ExtructErrorMessages } from '@/utils/errorUtil'
import Api_url from '../api/apiClient'
import UseAuthStore from '@/lib/store/authStore'



export const LoginForm = () => {


    const PasswordId=useId()
    const emailId=useId()
    const navigete=useNavigate()
    const {setAuth}=UseAuthStore()

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [errs, setErrs] = useState(null);

    // mutatin func
  const loginMutation=useMutation({
    mutationFn: async(userData)=>{
      const response = await Api_url.post("/auth/login", userData);
      // console.log(response)
      return response.data
      
    } ,
    onSuccess:(data)=>{
      let {user, token}=data
          // console.log(user)

          if(token && user){
            setAuth(user, token)
            navigete('/dashboard')
          }

      setFormValues({
      email: "",
      password: ""
     })
    // navigete("/login")

    },
    onError:(err)=>{
    
        setErrs(ExtructErrorMessages(err))
      // console.log(err)
      
    }
  })


    //  handleSubmit for from
  const handleSubmit = (e) => {
   e.preventDefault()

    setErrs(null);

    if (
      !formValues.email ||
      !formValues.password
    ) {
      setErrs("All fields are required");
      return;
    }

    // mutation
    loginMutation.mutate({
      email:formValues.email,
      password:formValues.password
    })
  };

    // hanldeChane
  const handleChange=(e)=>{
    const {name, value}=e.target
    setFormValues({
      ...formValues,
      [name]:value
    })
  }

  return (
    <Card className={'w-full'}>
  <CardHeader className={"space-y-1 pb-4"}>
    <CardTitle className={"text-3xl text-center"}>Sing in </CardTitle>
    <CardDescription className={"text-center"}>Enter your credentials to access your account</CardDescription>
  </CardHeader>
 <form onSubmit={handleSubmit}>
     <CardContent className={"flex flex-col space-y-4"}>
      {errs &&(
        <div className='p-2 bg-destructive/20 text-destructive rounded-md text-sm'>{errs}</div>
      )}
   
    <div className='flex flex-col space-y-2'>
     <label htmlFor={emailId} className='text-sm '>Email</label>
     <Input type={"email"} id={emailId} placeholder="John@email.com" name="email" required value={formValues.email} onChange={handleChange}/>
   </div>

    <div className='flex flex-col space-y-2'>
     <label htmlFor={PasswordId} className='text-sm '>Password</label>
     <Input type={"password"} name="password" id={PasswordId} placeholder="*******" required value={formValues.password} onChange={handleChange}/>
   </div>

   <div className='mt-6'>
  <Button className={"w-full"}>{loginMutation.isPending?( <span className='text-sm flex items-center gap-2'><Loader className=' animate-spin'/> Creating...</span>):"Create account"}</Button>
   </div>
  </CardContent>
 </form>
  <CardFooter className={"mt-5 flex flex-col justify-center"}>
    <div className='text-sm text-center'> don't have account? <Link to={"/register"} className='text-primary hover:underline cursor-pointer '>Sing Up</Link></div>
  </CardFooter>
</Card>
  )
}

