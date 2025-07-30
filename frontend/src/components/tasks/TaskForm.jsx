import React, { useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import Api_url from "../api/apiClient";
import UseAuthStore from "@/lib/store/authStore";
import { Loader } from "lucide-react";

const Task_Status=[
  {value:"pending", label:'pending'},
  {value:"in progress", label:'in progress'},
  {value:"completed", label:'completed'}
]

export const TaskForm = ({ onOpenChange, open = true }) => {
  const titleId = useId();
  const descriptionId = useId();
  const status = useId();

  const {token}=UseAuthStore()

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "pending",
    DueDate: "",
  });

  const handleChaneInput = (e) => {
    const { value, name } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleStatusChange=(value)=>{

    setFormValues({
      ...formValues,
      status:value
    })
  }


  const handleCnacel=()=>{
    onOpenChange?.(false)
  }





  // actual mutationFunction

  const createMutation=useMutation({
    mutationFn: async(taskData)=>{
      const response=await Api_url.post("/tasks",taskData )
    }
  })


  // hndle Form submit
  const handleFormSubmit=(e)=>{
     e.preventDefault()

     if(!formValues.title || formValues.title.length <3) return 

     createMutation.mutate({
      title:formValues.title,
      description:formValues.description || "",
      status:formValues.status,
      DueDate:formValues.DueDate || ""
     })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className={"text-lg font-semibold"}>
            Create New Task
          </DialogTitle>
          <DialogDescription className={"text-muted-foreground text-sm"}>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-2 py-2 space-y-3" onSubmit={handleFormSubmit}>
          {/* title */}
          <div className="space-y-1">
            <Label htmlFor={titleId} className={"text-sm"} >
              Title *
            </Label>
            <Input
              name="title"
              id={titleId}
              value={formValues.title}
              onChange={handleChaneInput}
              placeholder={"Enter task title"}
              required
            />
          </div>

          {/* description */}
          <div className="space-y-1">
            <Label className={"text-sm"}  htmlFor={descriptionId}>Description *</Label>
            <Textarea
            id={descriptionId}
              name="description"
              value={formValues.description}
              onChange={handleChaneInput}
              placeholder={"Enter task description"}
              required
            />
          </div>
          {/* sataus */}
          <div className="space-y-1">
            <Select value={formValues.status} onValueChange={handleStatusChange} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {
                  Task_Status.length>0 &&Task_Status.map(t=>(
                      <SelectItem value={t.value} key={t.value}>{t.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>


              {/* description */}
          <div className="space-y-1">
            <Label className={"text-sm"}  htmlFor={"dudate"}>DueDate *</Label>
            <Input
            id={"dudate"}
              type={"date"}
              name="DueDate"
              value={formValues.DueDate}
              onChange={handleChaneInput}
              required
            />
          </div>

          <DialogFooter>
           <div className="flex items-center justify-end space-x-2 mt-4 mb-2">
              <Button variant={"outline"} className={"cursor-pointer"} onClick={handleCnacel}>Cancel</Button>
              <Button type="submit" className={"cursor-pointer"}>{createMutation.isPending ? `${<Loader className="animate-spin"/>} Creating task...`:"Create Task"}</Button>
           </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
