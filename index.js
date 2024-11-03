const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskSchema = require('./modal')
const bodyparser = require('body-parser')
const cors = require('cors');

dotenv.config();

app.use(cors({origin:'*'}))
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("not connected");
})



app.listen(4500,()=>{
    console.log("server running at 4500");
})

//testing api from now 
//posting data
app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new taskSchema({
            todo:todo
        })
         await newData.save();
         
         return res.json(await taskSchema.find());
    }catch(err){
        console.log(err);
    }
})
//getting the data
app.get('/gettask',async(req,res)=>{
    try{
      return res.json(await taskSchema.find());
    }catch(err){
        console.log(err);
    }
})
//deleting the task
app.delete('/deletetask/:id',async(req,res)=>{
    try{
     await taskSchema.findByIdAndDelete(req.params.id);
     return res.json(await taskSchema.find());
     
    }catch(err){
        console.log(err);
    }
})