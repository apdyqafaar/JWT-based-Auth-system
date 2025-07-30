import { RegisterForm } from '@/components/auth/RegisterForm'
import React from 'react'

export const RegistrationPage = () => {
  return (
   <div className='relative min-h-screen flex flex-col items-center justify-center bg-background'>
          <div className='absolute  inset-0 bg-gradient-to-br from-secondary to-secondary/30 opacity-50'/>
            <div className='z-10 w-full max-w-md px-3 my-17'>
               <div className='text-center mb-8'>
                <h1 className='text-3xl text-foreground font-bold'>Join us To'day</h1>
                <p>Create an account in few steps</p>
               </div>
               {/* registeration from */}
               <RegisterForm/>
            </div>
      </div>
  )
}
