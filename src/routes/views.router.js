import { Router } from "express";
import session from "express-session";
import { cartManager, messagesManager, productManager } from "../app.js";
import authMdw from "../middleware/auth.js";



const router = Router();

router.get('/', async (req,res)=>{
    return res.redirect('/login');
})

router.get('/realtimeproducts',authMdw,async (req,res)=>{
    let {limit,page,query,sort} = req.query;
    const queryABuscar = {
        stock: query === 'true' || query === 'false' && query ? query : null,
        category: query !== 'true' && query !== 'false' && query ? query : null 
    };
    
    const products = await productManager.getProducts(limit,page,queryABuscar,sort);
    const {hasNextPage, hasPrevPage, nextPage} = products;
    const nextLink = hasNextPage ? `http://localhost:8080/products/?page=${nextPage}` : null;
    const prevLink = hasPrevPage ? `http://localhost:8080/products/?page=${products.page-1}` : null;
    // res.render('products', {products,nextLink,prevLink});
    res.render('realTimeProducts', {products,nextLink,prevLink});
})

router.get('/chat',authMdw,async (req,res)=>{
    const messages = await messagesManager.getAllMessages();
    res.render('chat', {messages});
})

router.get('/products',authMdw, async (req,res)=>{
   try {
        const user = {
             first_name: req.session.user._doc ? req.session.user._doc.firt_name : req.session.user.firt_name,
             last_name:req.session.user._doc? req.session.user._doc.last_name : req.session.user.last_name, 
             email: req.session.user._doc?req.session.user._doc.email : req.session.user.email, 
             age:req.session.user._doc? req.session.user._doc.age : req.session.user.age, 
             rol: req.session.user._doc? req.session.user._doc.rol : req.session.user.rol
            };
        let {limit,page,query,sort} = req.query;
        const queryABuscar = {
            stock: query === 'true' || query === 'false' && query ? query : null,
            category: query !== 'true' && query !== 'false' && query ? query : null 
        };
        
        const products = await productManager.getProducts(limit,page,queryABuscar,sort);
        const {hasNextPage, hasPrevPage, nextPage} = products;
        const nextLink = hasNextPage ? `http://localhost:8080/products/?page=${nextPage}` : null;
        const prevLink = hasPrevPage ? `http://localhost:8080/products/?page=${products.page-1}` : null;

        res.render('products', {products,nextLink,prevLink, user});
   } catch (error) {
    console.log("error", error)
   }

});


router.get('/carts/:cid',authMdw,async (req,res)=>{
    const {cid} = req.params;
    const products = await cartManager.getProductsByCartId(cid);
    res.render('cart', {products});
})


router.get("/login", async (req,res)=>{
    res.render("login");
})

router.get("/register", async(req,res)=>{
    res.render("register");
})




export default router;