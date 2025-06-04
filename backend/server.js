import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js'
import User from './model/userModel.js';
const PORT = 3000;

const app = express();

dotenv.config()
app.use(express.json());
app.use(cors({
    origin: 'https://task-manager-frontend-one-ebon.vercel.app',
    credentials: true
}));
  

connectDb();

// api endpoints
app.use("/api/auth" , userRoutes);
app.use("/api/task", taskRoutes);

app.get("/",function(req,res){
    res.send("Server started ");
})

app.get("/users",async function(req,res){
    const users = await User.find({});
    res.json({
        users
    })
})

app.post("/create",async function(req,res){
    const { email , password , username } = req.body;
    const result = await User.create({
        email:email,
        password:password,
        username:username
    })

    res.json({
        result:"User Successfully created"
    })

})

app.put("/update/:id",async function (req,res) {
    const user = await User.findById(req.params.id);
    user.password = req.body.password || user.password;
    user.username = req.body.username || user.username;
    const updated = await user.save();
    res.json(updated)
})

app.delete("/delete/:id",async function(req,res){
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
       return res.status(404).json({
            msg :"User not found"
        })
    }

    res.json({
       msg:"User successfully deleted"
    })

})

app.listen(PORT,function(){
    console.log(`Server running on ${PORT}`)
})