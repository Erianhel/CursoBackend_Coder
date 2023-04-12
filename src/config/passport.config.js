import passport from "passport";
import local from 'passport-local';
import { userModel } from "../dao/models/users.model.js";
import {createHash,isValidPassword} from '../utils.js';
import GitHubStrategy from 'passport-github2';
import { cartManager } from "../app.js";


const LocalStrategy = local.Strategy;
const initializePassport = ()=>{
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done)=>{
            const {first_name,last_name,email,age} = req.body;
            console.log("Acá llegó con: ", req.body);
            try {
                let user = await userModel.findOne({email:username});
                if (user) {
                    console.log("El usuario ya existe");
                    return done(null,false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: await cartManager.addCart()
                }

                let result = await userModel.create(newUser);
                return done(null,result);
            } catch (error) {
                return done("Error al obtener el usuario: " + error);
                
            }
        }
    ))

    passport.use('login',new LocalStrategy({usernameField:'email'}, async(username,password,done)=>{
        try {
            const user = await userModel.findOne({email:username}).populate('cart');
            if (!user) {
                console.log("El usuario no existe");
                return done(null,false);
            }
            if (!isValidPassword(user,password)) {
                return done(null,false);
            }
            return done(null,user);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID:"Iv1.7cf8012bbda53c52",
        clientSecret:'4042fcc1467f7a90902bf5025753caa35220acda',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken,profile,done)=>{
        try {
            console.log(profile);
            let user = await userModel.findOne({email:profile._json.email});
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age:18,
                    email:profile._json.email,
                    password:''
                }
                let result = await userModel.create(newUser);
                done(null,result);
            } else {
                done(null,user);
            }
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async (id,done)=>{
        let user = await userModel.findById({_id:id});
        done(null,user);
    })
}

export default initializePassport;