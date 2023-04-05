import express from 'express';
import bodyParser from "body-parser";
import activityRoutes from "./routes/activityRoutes.js";
import classRoutes from "./routes/classRoutes.js"
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;
app.use(bodyParser())
const mongoUri = 'mongodb+srv://muthuostephen04:sB4hooivaifcGEwe@kwetumalldb.kowvzti.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoUri)
    .then(()=>console.log('MongoDb is connected'))
    .catch((error)=>console.log(error))

app.use('/', classRoutes)
app.use('/', activityRoutes)

app.listen(PORT, ()=>{
    console.log('Server is listening on PORT:'+PORT)
});

// '/' -> path | endpoints
//req -> request (gives you data that has been sent to you from a frontend)
//res -> response (this is a data that you send)

// sB4hooivaifcGEwe
// mongodb+srv://muthuostephen04:<password>@kwetumalldb.kowvzti.mongodb.net/?retryWrites=true&w=majority
// THis is my first change
