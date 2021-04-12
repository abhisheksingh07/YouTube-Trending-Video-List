const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const videoRoute = require('./routes/videoapi');
const callSavevideo = require('./controllers/videoController').saveVideoDataInDb

mongoose.connect("mongodb://localhost:27017/videoData",{useNewUrlParser:true}, (error)=>{
    console.log("Data base is connected");
    if(error){
        console.log("Data base error"+error);
    }
})

app.use(cors());
app.use('/', videoRoute);

app.listen(4000,()=>{
    callSavevideo();
    console.log(`Server is runnig on port 4000`)

})