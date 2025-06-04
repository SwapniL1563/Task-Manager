import express from "express";
import { signin, signup } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin)

// protected routes
router.get("/dashboard",authMiddleware,async(req,res)=>{
    res.json({
        "msg":"Welcome to dashboard"
    })
})

export default router;