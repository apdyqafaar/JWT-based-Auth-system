import express from "express";
import mongoose from "mongoose";
import { erroreHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import dotenv from 'dotenv'
// import userRoutes from "./routes/auth.js"; 
import userRoutes from "./routes/userAuth.js";
import uploadRoute from "./routes/upload.js";
import tasksRouter from "./routes/tak.js";
import helmet from "helmet";
import cors from "cors"

import { swaggerUi, swaggerSpec }  from'./utils/swagger.js';
import { limit } from "./middlewares/rateLimit.js";
import { getUsers } from "./controllers/user.js";

import path from "path"
import { fileURLToPath } from "url";

dotenv.config()
const app = express();
const port=process.env.PORT || 3000

app.use(express.json())
app.use(helmet())
app.use(limit)
app.use(cors(
  {origin:["http://localhost:5173"]}
))

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/api/auth',userRoutes)
app.use('/api/upload',uploadRoute)
app.use('/api/tasks', tasksRouter)

app.get('/users', getUsers)



if(process.env.NODE_DEV==='production'){

  const __direname=path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static(path.join(__direname, "../frontend/dist")));
  
  app.get(/.*/, (req, res)=>{
    res.send(path.join(__direname, "..", "frontend", "dist", "index.html"))
  })
}

app.use(notFound)
app.use(erroreHandler)
mongoose.connect(process.env.NODE_DEV=="local"?process.env.MONGDB_URI:process.env.MONGDB_URI_PRO)
.then(()=> console.log('your mong db was connected'))
.catch((e)=> console.error(e))

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})