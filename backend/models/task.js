import mongoose from "mongoose";
import { required } from "zod/v4-mini";

const taskaSchema=mongoose.Schema({
    title:{type:String, required:true},
    status:{
      type:String,
      enum:['pending', 'in progress', 'completed'],
      default:"pending"
    },
    DueDate:Date,
    description:String,
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    }

},
{timestamps:true}
)


export default mongoose.model('Tasks', taskaSchema )