import { getRounds } from "bcrypt";
import { Router } from "express";
import  passport  from "passport";
import { userModel } from "../dao/models/users.model.js";

const router = Router();

router.get("/logout", async (req, res)=>{
    req.session.destroy((err)=>{
        if (!err) {
        return res.redirect("/login");
        }
        return res.send({message: "error al intentar desconectarse"});
    })
});

router.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user;
    res.redirect('/products');
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/faillogin'}),async (req,res)=>{
if (!req.user) {
    return res.status(400).send({status:"error", error:"invalid credentials"})
}
req.session.user = {
    first_name : req.user.first_name,
    last_name : req.user.last_name,
    age : req.user.age,
    email : req.user.email,
    cart : req.user.cart
}
res.redirect("/products")
});

router.get('/faillogin', (req,res)=>{
res.send({error:"Failed Login"});
});

router.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req,res)=>{
res.redirect("/login")
});

router.get('/failregister', async(req,res)=>{
console.log("Failed Strategy");
res.send({error: "Failed"});
});

router.get('/current', async (req,res)=>{
    res.send(req.session.user);
})

export default router;