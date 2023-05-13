import { userDTO } from "../dao/DTO/user.dto.js";
import { userModel } from "../dao/models/users.model.js";
import { generateToken, passportCall } from "../utils.js";

export const logout = async (req, res)=>{
    return res.clearCookie('cookieToken',{httpOnly:true}).redirect("/login");
}

export const githubcallback = async(req,res)=>{
    const user = req.user
    let token = generateToken(user)
    res.cookie('cookieToken',token,{
        maxAge:60*60*1000,
        httpOnly:true
    }).redirect('/products');
}

export const login = async (req,res)=>{
    const {email} = req.body;
    const user = await userModel.findOne({email:email});
    console.log("usuario generate token",user)
    let token = generateToken(user)
    res.cookie('cookieToken',token,{
        maxAge:60*60*1000,
        httpOnly:true
    }).redirect("/products");
}

export const faillogin = (req,res)=>{
    res.send({error:"Failed Login"});
}

export const register =  async (req,res)=>{
    res.redirect("/login")
}

export const failregister = async(req,res)=>{
    console.log("Failed Strategy");
    res.send({error: "Failed"});
}

export const current = async (req,res)=>{
    const user = new userDTO(req.user.user);
    res.send(user);
}