import { Router } from "express";
import { productManager, messagesManager } from "../app.js";

const router = Router();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('home', {products});
})

router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products});
})

router.get('/chat',async (req,res)=>{
    const messages = await messagesManager.getAllMessages();
    res.render('chat', {messages});
})

export default router;