import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary";
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoute"
import contactRoutes from './routes/ContactRoutes';

mongoose
        .connect(process.env.DATABASE_STRING as string)
        .then(()=>{console.log("Connected to the database!")
})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



const app = express()
app.use(cors()) 
app.use("/api/order/checkout/webhook",express.raw({type:"*/*"})); 
app.use(express.json())

app.get("/health", async (req:Request, res:Response)=>{
    res.send({message:"Health OK!"})
})

app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant",myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.use("/api/order", orderRoute)


app.use('/api/contact', contactRoutes);




app.listen(7000,()=>{
    console.log("listening at port 7000...")
})