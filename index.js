import express from "express";
import mongoose from "mongoose";
import { erroreHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import dotenv from 'dotenv'
import userRoutes from "./routes/auth.js"; 

dotenv.config()
const app = express();
const port=process.env.PORT || 3000

app.use(express.json())


// routes
app.use('/auth',userRoutes)

app.get('/', (req, res)=>{
  res.send('hey')
})




app.use(notFound)
app.use(erroreHandler)
mongoose.connect(process.env.MONGDB_URI)
.then(()=> console.log('your mong db was connected'))
.catch((e)=> console.error(e))

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})