import mongoose from "mongoose";

const usersCollection = 'Users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: String 
})

export const userModel = mongoose.model(usersCollection,usersSchema);