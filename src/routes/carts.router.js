import { Router } from "express";
import { cartManager } from "../app.js";


const router = Router();

router.get('/:cid', async (req, res)=>{
    const {cid} = req.params;
    console.log(req.params);
    const products = await cartManager.getProductsByCartId(cid);
    res.send(products);
})

router.post('/', async (req,res)=>{
    const {products} = req.body;
    const respuesta = await cartManager.addCart(products);
    res.send(respuesta);
});

router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;

    const respuesta = await cartManager.addProduct(cid, pid, quantity);
    res.send(respuesta);
});

export default router;