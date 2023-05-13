import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {faker} from '@faker-js/faker/locale/es';

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



export const passportCall = (strategy) =>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            console.log("usuario en passport call: ", user);
            if (!user) {
                return res.status(401).send({error:info.messages?info.messages:info.toString()});
            }
            req.user = user;
            //console.log("usuario en passport call: ", req.user.user._id);
            next();
        })(req,res,next);
    }
}

export const generateProducts = ()=>{
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(5),
        price: faker.commerce.price(),
        status:  true,
        stock: faker.number.int(10),
        category: faker.commerce.department(),
        thumbnail: faker.image.url()
    }
}