import express from 'express'
const router = express.Router()

router.post('/fooddata',(req,res)=>{
    try{
        res.send([global.MenuItems,global.categories])
        
    }catch(error){
        console.log(error.message)
        res.send("server error")
    }
})
export default router;