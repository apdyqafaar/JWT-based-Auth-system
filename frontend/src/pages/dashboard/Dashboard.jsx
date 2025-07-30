import { DashboardWellcome } from '@/components/dashboard/dashboardWellcome'
import { HeaderComponent } from '@/components/dashboard/HeaderComponent'
import { TaskForm } from '@/components/tasks/taskForm'
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
      </main>

      {/* task dailog form */}
       <TaskForm
       open={showCreateForm || !!editinTask}
       onOpenChange={handleCloseForm}
       />
    </div>
  )
}
