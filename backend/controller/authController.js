import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

// signup logic
export const signup = async (req,res) => {
    const { email, password , username } = req.body;
    // check if already the user exist or not
    const user = await User.findOne({email});
    if(user) {
       return res.json({
        msg:"User already exists"
       })
    }

    // if not then hash the password
    const hashpwd = await bcrypt.hash(password,10);

    // now store the user with hash password in db
    const newUser = await User.create({
        email,username,password:hashpwd
    })

    // now generate jwt token for the same user
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.json({
        token,
            "msg":"signup successfully"
    })
}

// signin logic 
export const signin = async(req,res) => {
    const { email,password } = req.body;
    
    // check if user exist or not
    const user = await User.findOne({email});
    if(!user) {
        return res.json({ 
            error:"User doesn't exist"
        })
    }

    // if user exist then compare its password with hashpwd
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.json({
            error:"Invalid Credentials"
        })
    }

    // now generate jwt token for valid user
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{ expiresIn:"7d"});

    res.json({
        token,user:{ email:user.email,user:user.username ,"msg":"Login Successfully" }
        
    })
}

