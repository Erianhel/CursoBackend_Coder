import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

const PRIVATE_KEY = "s3cr3tPassw0rd";

export const generateToken = (user)=>{
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn: '24h'});
    return token;
}

/* export const authToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({error:"Not authenticated"});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
        if(error) return res.status(403).send({error:"Not authorized"});
        req.user = credentials.user;
        next();
    })
} */

export const passportCall = (strategy) =>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            if (!user) {
                return res.status(401).send({error:info.messages?info.messages:info.toString()});
            }
            req.user = user;
            //console.log("usuario en passport call: ", req.user.user._id);
            next();
        })(req,res,next);
    }
}