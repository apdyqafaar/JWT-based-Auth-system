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

import { swaggerUi, swaggerSpec }  from'./utils/swagger.js';
import { limit } from "./middlewares/rateLimit.js";

dotenv.config()
const app = express();
const port=process.env.PORT || 3000

app.use(express.json())
app.use(helmet())
app.use(limit)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/auth',userRoutes)
app.use('/upload',uploadRoute)
app.use('/tasks', tasksRouter)

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