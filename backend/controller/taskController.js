import Task from "../model/taskModel.js"

// get all task for user
export const getTask = async(req,res) => {
    try{
        const tasks = await Task.find({user : req.user.id})
        res.status(200).json(tasks); 
    } catch(error) {
        res.status(500).json({
            error:"Failed to fetch task"
        })
    }
    
}

// create new task for user
export const createTask = async(req,res) => {
    const { title , description, priority } = req.body;

    try{
        const newTask = await Task.create({
            title,description,priority,user:req.user.id
        })

        res.status(201).json({
            "msg":"New task created for user"
        })

    } catch(error) {
        res.status(400).json({
            error:"Unable to create new Task"
        })

    }
}


// delete the task for user
export const deleteTask = async(req,res) => {
    try {
    const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id,user: req.user.id})
    if(!deletedTask) return res.status(404).json({
            "msg": "Unable to delete task"
        })

    res.status(200).json({
        "msg":"task deleted successfully"
    })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


// update the task for the user
export const updateTask = async(req,res) => {
    const { title , description , completed , priority} = req.body;
    try {
        const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, description,priority, completed },
        { new: true }
          );
        
        if(!task) return res.status(404).json({
            "msg" : "Task not found"
        })

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}
