import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {faker} from '@faker-js/faker/locale/es';
import winston from 'winston'

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

const customLevelOptions = {
    levels: {
        fatal:0,
        error: 1,
        warning:2 ,
        info: 3,
        http: 4,
        debug:5,
    },
    colors:{
       fatal: 'red', 
       error: 'red', 
       warning: 'yellow', 
       info: 'blue', 
       http: 'white', 
       debug: 'white', 
    }
}

//configuacion del prodLogger
const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './error.log',
            level: "error",
            format: winston.format.simple()
        })
    ]
})

//configuacion del devLogger
const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level:"debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        })
    ]
})

export const addLogger = (req,res,next)=>{
    if(process.env.NODE_ENV === "production"){
        req.logger = prodLogger;
    }else{
        req.logger = devLogger;
    }
    
    //req.logger.http(`[${req.method}]  en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();

}
