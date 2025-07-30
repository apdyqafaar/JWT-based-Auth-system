import { LoginForm } from '@/components/auth/LoginForm'
import React from 'react'

export const LoginPage = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center bg-background'>
        <div className='absolute  inset-0 bg-gradient-to-br from-secondary to-secondary/30 opacity-50'/>
          <div className='z-10 w-full max-w-md px-3 my-17'>
             <div className='text-center mb-8'>
              <h1 className='text-3xl text-foreground font-bold'>Welcome back</h1>
              <p>We're glad to see you again</p>
             </div>
             {/* registeration from */}
             <LoginForm/>
          </div>
    </div>
  )
}
