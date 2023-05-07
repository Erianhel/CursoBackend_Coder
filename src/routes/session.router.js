import { Router } from "express";
import  passport  from "passport";
import { generateToken, passportCall } from "../utils.js";
import { authorization } from "../middleware/auth.js";
import  CustomRouter  from "./router.router.js";
import { current, faillogin, failregister, githubcallback, login, logout, register } from "../controllers/session.controller.js";

export default class SessionRouter extends CustomRouter{
    init(){
        this.get("/logout",['PUBLIC'], logout);
        
        this.get('/github',['PUBLIC'], passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{});
        
        this.get('/githubcallback',['PUBLIC'], passport.authenticate('github', {failureRedirect:'/login'}), githubcallback);
        
        
        this.post('/login',['PUBLIC'],passport.authenticate('login',{failureRedirect:'/faillogin'}), login);
            
        this.get('/faillogin',['PUBLIC'], faillogin);
        
        this.post('/register',['PUBLIC'], passport.authenticate('register',{failureRedirect:'/failregister'}), register);
        
        this.get('/failregister',['PUBLIC'], failregister);

        this.get('/current',['PUBLIC'],passportCall('jwt'), current);
        
        /* this.get('/current',['PUBLIC'],passportCall('jwt'),authorization('user'), async (req,res)=>{
            res.send(req.user);
        }); */
    }
 
}