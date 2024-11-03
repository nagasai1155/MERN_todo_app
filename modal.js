const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    todo:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('taskSchema',taskSchema);