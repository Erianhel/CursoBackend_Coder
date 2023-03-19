import { Router } from "express";
import { cartManager, messagesManager, productManager } from "../app.js";



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

router.get('/products', async (req,res)=>{
    let {limit,page,query,sort} = req.query;
    const queryABuscar = {
        stock: query === 'true' || query === 'false' && query ? query : null,
        category: query !== 'true' && query !== 'false' && query ? query : null 
    };
    
    const products = await productManager.getProducts(limit,page,queryABuscar,sort);
    const {hasNextPage, hasPrevPage, nextPage} = products;
    const nextLink = hasNextPage ? `http://localhost:8080/products/?page=${nextPage}` : null;
    const prevLink = hasPrevPage ? `http://localhost:8080/products/?page=${products.page-1}` : null;
    res.render('products', {products,nextLink,prevLink});
})


router.get('/carts/:cid',async (req,res)=>{
    const {cid} = req.params;
    const products = await cartManager.getProductsByCartId(cid);
    res.render('cart', {products});
})

export default router;