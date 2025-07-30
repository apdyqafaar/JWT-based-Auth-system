
import task from "../models/task.js";
import Tasks from "../models/task.js";


export const createTask=async(req, res, next)=>{

     try {
        const task= await Tasks.create({...req.body, createdBy:req.user._id})
        res.status(201).json(task)
     } catch (error) {
        next(error)
     }
}


export const getAllmyTasks=async(req, res, next)=>{
     try {
         const tasks= await Tasks.find()

         if(!tasks){
            return res.status(401).json("You didnt created task yet!")
         }

         res.status(201).send(tasks)
     } catch (error) {
        next(error)
     }
}

export const updateTask=async(req, res, next)=>{
     try {
        const taskUpdated=await Tasks.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id},
            req.body,
            {new:true}
        )

        if(!taskUpdated) return res.status(201).send('you dont have  access to update this task')

        res.status(201).send(taskUpdated)
     } catch (error) {
        next(error)
     }
}



export const deleteTask=async(req, res, next)=>{

    try {
        
         const taskDeleted=await Tasks.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id}
        )

        if(!taskDeleted) return res.status(201).send('you dont have  access to delete this task')
         
        res.status(201).json('Task was deleted successfully')
    } catch (error) {
        next(error)
    }
}