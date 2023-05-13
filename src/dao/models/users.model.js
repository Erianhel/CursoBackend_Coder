import mongoose from "mongoose";

const usersCollection = 'Users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true

    },
    age: Number,
    password: String,
    cart: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Carts'  
    }, 
    rol: {
        type: String,
        default:'user'
    } 
})


export const userModel = mongoose.model(usersCollection,usersSchema);