import mongoose from "mongoose";

const messagesCollection = 'Messages';

const messagesSchema = new mongoose.Schema({
    user: String, 
    message: String 
})

export const messagesModel = mongoose.model(messagesCollection,messagesSchema);