import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Calendar, Edit2, MoreVertical, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api_url from "../api/apiClient";
import { toast } from "sonner";

const STATUS_CONFIG = {
  pending: {
    variant: "secondary",
    label: "Pending",
    color: "text-yellow-600",
  },
  "in progress": {
    variant: "default",
    label: "In progress",
    color: "text-blue-600",
  },
  completed: {
    variant: "outline",
    label: "Completed",
    color: "text-green-600",
  },
};
export const TaskCard = ({
  task,
  onStatusChange,
  isLoading = false,
  onEdit
}) => { 
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient=useQueryClient()

  const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG["pending"];


  const formatDtae=(date)=>{
    if(!date) return null
    return new Date(date).toLocaleDateString("en-US", {
        year:"numeric",
        month:"short",
        day:"numeric"
    })
  }

 const isOverDue=(due)=>{
    if(!due || task.status === "completed") return false
    return new Date(due) < new Date();
  }

  const duedate=formatDtae(task.DueDate)
  const isOverdue=isOverDue(task.DueDate)

 

  const handleShowDialog=()=>{
    // alert("dd")
    setShowDeleteDialog(true)
  }


  // mutaion fun
  const mutaionFunction=useMutation({
    mutationFn:async()=>{
      const response=await Api_url.delete(`/tasks/${task._id}`);
      console.log(task._id)
      return response
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["tasks"])
      toast.success("Task was deleted succeesfully")
    },
    onError:(e)=>{
      toast.error(e.message)
    }
  })


  const handleDeleteCormfirm=async()=>{
      try {
         mutaionFunction.mutate(task)
      } catch (error) {
        toast.error(error.message)
      }
  }


  return (
    <>
      <Card className={"w-full transition-shadow hover:shadow-md"}>
        <CardHeader className={""}>
          <div className="flex items-center justify-between">
            <CardTitle className={"text-lg leading-tight"}>
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={statusConfig.variant} className={" shrink-0"}>
                {statusConfig.label}
              </Badge>

              {/* drop down */}
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <dive>
                     <Badge
                     variant={"ghost"}
                     size={"sm"}
                    >
                        <MoreVertical className="h-4 w-4"/>
                    </Badge>
                  </dive>
                   
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className={'text-muted-foreground font-medium text-xs'}>Manage the task</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=> onEdit(task)}><Edit2 className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShowDialog}><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className={"space-y-3"}>
         {/* Task description */}
         {
            task.description&&(
                <p className="text-muted-foreground text-sm leading-relaxed">{task.description}</p>
            )
         }

         {/* DUEDATE */}
         {
           duedate &&(
                <div className="flex items-center gap-2 my-5 mb-6">
                  <Calendar className="text-muted-foreground h-4 w-4"/>
                <span className="text-sm text-muted-foreground">Due: <Badge variant={isOverdue ? "destructive":'outline'}>{duedate} {isOverdue && " (Overdue)"}</Badge></span>
                </div>
            )
         }

         {/* status indicator */}
         <div className="flex justify-between gap-3 border-t pt-1" >
          <span className="text-muted-foreground text-xs">Created: {formatDtae(task.createdAt)}</span>
          <span className={`${statusConfig.color} text-xs font-medium`}>{statusConfig.label}</span>
         </div>
        </CardContent>
      </Card>

           <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
         <AlertDialogContent>
       <AlertDialogHeader>Are you sure?</AlertDialogHeader>
       <AlertDialogDescription>
        This action connot be undone . This will permanently delete the taks "<span className="text-gray-800">{task.title}</span>"
       </AlertDialogDescription>
       <AlertDialogFooter>
        <AlertDialogCancel className={"cursor-pointer"}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteCormfirm} className={"bg-red-600 text-gray-100 hover:bg-red-700 cursor-pointer"}> {mutaionFunction.isLoading?"Deleting...":"Delete"}</AlertDialogAction>
       </AlertDialogFooter>
         </AlertDialogContent>
        </AlertDialog>
    </>
  );
};
