import mongoose from "mongoose"
import JWT  from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:{type:String, unique:true},
    role:{
        type:String,
        enum:["user", 'admin'],
        default:'user'
    }
})


userSchema.pre('save', async function (next) {
     
    if(!this.isModified('password')) return next()
    
    const salt =await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
    next()
})


userSchema.methods.comparedPassword=function(inputPassword){
  return bcrypt.compare(inputPassword, this.password)
}




const User= mongoose.model('User', userSchema)
export default User