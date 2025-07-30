import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { CardStatus } from './CardStatus'

export const DashboardWellcome = ({showCreateForm, onCreateTask}) => {
    
  const hanldeCreateTaskButton=()=>{
    onCreateTask()
  }

  return (
    <Card className={"border-0 rounded-none p-2  sm:p-4 shadow-sm bg-gradient-to-r from-indigo-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 "}>
        <CardHeader className={"py-4 sm:py-6"}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-2">
            <div className='flex flex-col items-start space-y-1 sm:space-y-2'>
                <CardTitle className='text-2xl sm:text-3xl font-bold text-foreground'>Welcome back!</CardTitle>
                <CardDescription className={"text-base"}>Here is what `s happening with your tasks today.</CardDescription>
            </div>

            {/* Todo task creator button */}
            <div>
                <Button onClick={hanldeCreateTaskButton} className={"cursor-pointer"}>Create New Task! <Plus/></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={"p6"}>
            <CardStatus/>
        </CardContent>
    </Card>
  )
}
