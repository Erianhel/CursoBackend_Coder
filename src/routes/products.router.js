import { Router } from "express";
import { productManager } from "../app.js";
import {socketServer} from '../app.js'

const router = Router();

router.get('/', async (req,res)=>{
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if (limit !== null) {
        const productsFiltered = products.slice(0,limit);
        res.send(productsFiltered);
    }else{
        res.send(products);
    }    
})

router.get('/:pid', async (req, res)=>{
    const {pid} = req.params;
    console.log(req.params);
    const product = await productManager.getProductById(pid);
    console.log(product);
    res.send(product);
})

router.post('/', async (req,res)=>{
    const {title, description, code, price, status, stock, category,thumbnails} = req.body;
    const respuesta = await productManager.addProduct(title,description,code,price,status,stock,category,thumbnails);
    socketServer.emit('addProduct', ()=>{
        console.log("Nuevo Producto Añadido");
    });
    res.send(respuesta);
})

router.put('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const {title, description, code, price, status = true, stock, category,thumbnails} = req.body;
    const respuesta = await productManager.updateProduct(pid,{title,description,code,price,status,stock,category,thumbnails});
    socketServer.emit('updatedProduct', ()=>{
        console.log("Producto Actualizado");
    });
    res.send(respuesta);
})

router.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const respuesta = await productManager.deleteProduct(pid);
    socketServer.emit('deleteProduct', ()=>{
        console.log("Producto Eliminado");
    });
    res.send(respuesta);
})

export default router;