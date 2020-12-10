const express=require('express')
const router=express.Router()
const bcrypt =require('bcryptjs')
const mongoose =require('mongoose')
const User=mongoose.model("User")
const jwt=require('jsonwebtoken')
const requireLogin=require('../middleware/requireLogin')


const jwt_secr="bfajkbgbddaejb"




// router.get('/protected',(req,res)=>{
//     res.send("hello user")
// })



router.post('/signup',(req,res)=>{
   
  const{ Firstname,Lastname,Username,email,password} =req.body

  if(!email || !Firstname || !Lastname || !Username || !password){
    return  res.json("fielderror")// all fields not entered
  }

  User.findOne({
    Username: Username
}).then((savedUser)=>{
    if(savedUser){  
    return  res.json("Uerror")}//username error

    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user=new User({
            Firstname,Lastname,Username,
            email,
            password:hashedpassword
    
        })
    
        user.save().then(user=>{
            res.json("success")// Success
            
        }).catch(err=>{
            console.log(err)
        })
    })

  
}).catch(err=>{
    console.log(err)
})
 
}
)


router.post('/signin',(req,res)=>{
    const{ Username,password} =req.body
    if(!Username|| !password){
        return  res.status(422).json({error:"please add the fields"})
      }

      User.findOne({
          Username: Username
      }).then(savedUser=>{
       
            console.log(savedUser);
            if(!savedUser){  return  res.status(422).json({error:"invalid  email or password"})}
            if(password === savedUser.password)
            {
                const token=jwt.sign({_id:savedUser._id},jwt_secr)
               res.json({token})
            }
           bcrypt.compare(password,savedUser.password)
           .then(doMatch=>{
               if(doMatch){
                   //res.json({message:"signed in sucessfully"})
                   const token=jwt.sign({_id:savedUser._id},jwt_secr)
                   res.json({token})
               }

               else{
                return  res.status(422).json({error:"invalid  email or password"})
            
            }

               
           }).catch(err=>{
               console.log(err)
           })
          
          
      })
})

module.exports=router