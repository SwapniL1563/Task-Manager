import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title:{type: String,required:true},
    description:String,
    completed:{type:Boolean,default:false},
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },
    user:{type: mongoose.Schema.Types.ObjectId,ref: 'User'} 
    },
     { timestamps:true})

const Task = mongoose.model('Task', taskSchema);

export default Task;