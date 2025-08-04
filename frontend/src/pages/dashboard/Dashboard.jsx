import Api_url from '@/components/api/apiClient'
import { DashboardWellcome } from '@/components/dashboard/dashboardWellcome'
import { HeaderComponent } from '@/components/dashboard/HeaderComponent'
import { TaskForm } from '@/components/tasks/taskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

import React, { useState } from 'react'

export const Dashboard = () => {
  const [showCreateForm, setShowCreateForm]=useState(false)
  const [editinTask, setEditingTask]=useState(null)

  const handleCloseForm=()=>{
    setShowCreateForm(false)
    setEditingTask(null)
  }

  const handleCreateTask=()=>{
    setShowCreateForm(!showCreateForm)
    setEditingTask(null)
  }

  const handleEditTsk=(task)=>{
    setEditingTask(task)
    setShowCreateForm(true)
  }

 

  const handleStatusChange=(taskId, NewTask)=>{

  }


  // tasksmutaion
  const tasksQuery=useQuery({
    queryKey:["tasks"],
    queryFn:async()=>{
      const response=await Api_url.get("/tasks")
      return response
    },
    retry:1
  })



//  if isLoding ?
if(tasksQuery.isLoading){
  return <div className='min-h-screen w-full flex items-center justify-center'>
    <Loader className=' animate-spin'/>
  </div>
}

  return (
    <div className='min-h-screen bg-background'>

      {/* Header */}
      <HeaderComponent/>

      {/* main content */}
      <main>

        {/* welcom section */}
         <DashboardWellcome 
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTask}
         />

        {/* tasks section */}
        <TaskList
         tasks={tasksQuery.data?.data || []}
          isLoading={tasksQuery.isLoading}
          onEdit={handleEditTsk}
          onStatusChange={handleStatusChange}
        />

      </main>

      {/* task dailog form */}
       <TaskForm
       task={editinTask}
       open={showCreateForm || !!editinTask}
       onOpenChange={handleCloseForm}
       />
    </div>
  )
}
