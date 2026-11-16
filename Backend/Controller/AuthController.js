import userSchema from "../Models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Signup = async(req, res) => {
try{
   const { name, email, password } = req.body;

   if(!name || !email || !password){
    return res.status(400).json({"message": "All fields are required"});
   }
   const userExists = await userSchema.findOne({ email});
   if(userExists){
    return res.status(400).json({"message": "User already exists"});


   }

   const hashedpassword = await bcrypt.hash(password, 10);
   const user = await userSchema.create({
    name,
    email,
    password: hashedpassword
   })

   const userToReturn = {
    name: user.name,
    email: user.email
   }
    res.status(201).json({"message" : "User created sucessfully", user: userToReturn});

    


} catch(error){
  console.error("Error in signup controller:", error);
  res.status(500).json({"message": "Internal server error"});


}
    

 }

 export const Login = async(req ,res) =>{
  try{
    const {email , password } = req.body;

    if(!email || !password){
           return res.status(400).json({"message": "All fields are required"});
    }
    const user = await  userSchema.findOne({email}).select("+password");
    if(!user){
      return res.status(400).json({"message": " User doesn't exists"});

    }
    const match  = await bcrypt.compare(password , user.password);
    if(!match){
      return res.status(400).json({"message":"invalid credentials"});

    }

    const payload = {
      userId : user._id,
      email : user.email,
     


    }

    const token = jwt.sign(payload , process.env.secret_key ,{
      expiresIn : "17d"
    });

    const userToReturn = {
      name: user.name,
      email: user.email
    };
    
    res.status(200).json({"message" : "User Login sucessfully", token, user: userToReturn});
  } catch(error){
  console.error("Error in signup controller:", error);
  res.status(500).json({"message": "Internal server error"});


}
 }