import { ClipboardCheck, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./TaskCard";

export const TaskList = ({
  tasks = [],
  isLoading,
  onEdit,
  onStatusChange,
}) => {

    const [searChValue, setSearchValue]=useState('')

   const FilteredTasks=tasks.filter(t=>(
    t.title.toLowerCase().includes(searChValue.toLocaleLowerCase()) || t.description.toLowerCase().includes(searChValue.toLocaleLowerCase())
   ))

  const getTaskStatus = () => {

    // categorized Data
    const categorize={
       all : FilteredTasks,
      pending : FilteredTasks.filter((t) => t.status === "pending"),
      inProgress : FilteredTasks.filter((t) => t.status === "in progress"),
      completed : FilteredTasks.filter((t) => t.status === "completed")
    }

    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const inProgress = tasks.filter((t) => t.status === "in progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    return { total, pending, inProgress, completed, categorize };
  };

  const status = getTaskStatus();





  // other component inside the component
  const TaskGrid=({tasks=[], emptyMessage=""})=>{


     if(tasks.length ===0){
      return <div className="flex items-center justify-center text-center  text-muted-foreground h-[200px]">
        <div className="flex flex-col gap-1 items-center text-center">
          <ClipboardCheck className="max-w-12 h-12 text-muted-foreground"/>
          <h3 className="text-base font-medium text-muted-foreground">No tasks were found</h3>
          <p className="text-sm text-muted-foreground">{emptyMessage || "Please create new task.."}</p>
        </div>
      </div>
     }



     return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-1 py-4">
             {
              tasks.map(t=>(
                <TaskCard
                   key={t._id}
                   onEdit={onEdit}
                   task={t}
                   onStatusChange={onStatusChange}
                />
              ))
             }
        </div>
     )
  }

  return (
    <div className="space-y-6 px-4 py-6 pt-7">
      {/* status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-md border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{status.total || 0}</p>
        </div>

        <div className="bg-card p-4 rounded-md border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {status.pending || 0}
          </p>
        </div>

        <div className="bg-card p-4 rounded-md border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              In progress
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {status.inProgress || 0}
          </p>
        </div>

        <div className="bg-card p-4 rounded-md border shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {status.completed || 0}
          </p>
        </div>
      </div>

      {/* serchr input */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground transform -translate-y-1/2" />
          <Input placeholder={"Search tasks..."} className={"pl-10"}  onChange={e=>setSearchValue(e.target.value)}/>
        </div>
      </div>

      {/* tasks taps and lists*/}
      <div className="w-full">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className={"grid grid-cols-4 w-full"}>
            <TabsTrigger
              value="all"
              className={
                "flex items-center justify-center text-xs sm:text-sm   sm:gap-2"
              }
            >
              All {<Badge variant="outline ">{status.total}</Badge>}
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className={
                "flex items-center justify-center text-xs sm:text-sm sm:gap-2"
              }
            >
              Pending {<Badge variant="outline ">{status.pending}</Badge>}
            </TabsTrigger>{" "}
            <TabsTrigger
              value="inProgress"
              className={
                "flex items-center justify-center text-xs sm:text-sm sm:gap-2"
              }
            >
              In progress{" "}
              {<Badge variant="outline ">{status.inProgress}</Badge>}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className={
                "flex items-center justify-center text-xs sm:text-sm sm:gap-2"
              }
            >
              Completed {<Badge variant="outline ">{status.completed}</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">

            <TaskGrid tasks={status.categorize.all} emptyMessage="No any task on there..."/>

          </TabsContent>
          <TabsContent value="pending">
               
            <TaskGrid tasks={status.categorize.pending} emptyMessage="No pending tasks on there..."/>
            </TabsContent>

            <TabsContent value="inProgress">
               
            <TaskGrid tasks={status.categorize.inProgress} emptyMessage="No In progress tasks on there..."/>
            </TabsContent>

            <TabsContent value="completed">
               
            <TaskGrid tasks={status.categorize.completed} emptyMessage="No Completed tasks on there..."/>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
