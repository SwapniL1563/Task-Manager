import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../model/userModel.js';

export const authMiddleware = async(req,res,next) => {
     // get the token - remove bearer from auth header
     const token = await req.headers.authorization.split(' ')[1];

     // verify the jwt token - if verified control react to next route handler
     try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // fetch the user from db excluding the pwd
        next();
     } catch(error){
        res.json({
            error:"invalid token"
        })
     }
}