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
    email : req.user.email
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

export default router;



  /* router.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body;
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            const usuarioAdmin = {
                email, 
                password, 
                first_name: "admin",
                last_name: "admin",
                age: 99,
                rol:"admin"
            };
            req.session.user = {
                ...usuarioAdmin,
            }
            res.redirect("/products");
        } else {
            const usuarioEncontrado = await userModel.findOne({email: email});
            if (!usuarioEncontrado) {
                return res.send({message: "usuario no registrado"});
            }
            if(usuarioEncontrado.password !== password){
                return res.send({message:"contraseña inconrrecta"});
            }
            req.session.user = {
                ...usuarioEncontrado,
            }
            res.redirect("/products");
        }


    } catch (error) {
        console.log("Error al hacer login", error)
    }
}); */

/* router.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, age, password } = req.body;
  
      const addUser = { first_name, last_name, email, age, password, rol:"usuario" };
      await userModel.create(addUser);
  
      req.session.user = { first_name, last_name, email, age };
      return res.render(`login`);
    } catch (error) {
      console.log("Error al registrar usuario: ", error);
    }
  }); */