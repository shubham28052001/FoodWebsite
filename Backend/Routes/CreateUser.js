import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
const router = express.Router()
import User from '../models/User.js'
import { body,validationResult } from 'express-validator'
const jwtsecret = "Mynameshubhamsanodiyafrombhopal"
router.post('/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
  ],
    async(req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
try{
    const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        location:req.body.location      
    })
    res.json({success:true})
}catch (error){
    console.log(error);    
    res.status(500).json({ success: false, error: error.message });
}

})
router.post(
    "/loginuser",
    [
      body("email").isEmail(),
      body("password").isLength({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // 🔍 Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
          console.log("❌ User not found!");
          return res.status(400).json({ errors: "Try logging in with correct inputs" });
        }
  
        // 🔐 Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log("❌ Incorrect password!");
          return res.status(400).json({ errors: "Try logging in with correct inputs" });
        }else{
            console.log("🏡Right Password");  
        }
        // 🔑 Generate jwt token 
        const payload = {
        data:{
            id:user.id
        }
        }
        const authtoken = jwt.sign(payload,jwtsecret)
        console.log("✅ json token");
        
 return res.json({ success: true,authtoken:authtoken });
      } catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    }
  );
export default router;