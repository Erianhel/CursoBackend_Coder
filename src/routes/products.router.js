import { Router } from "express";
import { productManager } from "../app.js";
import {socketServer} from '../app.js'

const router = Router();

router.get('/', async (req,res)=>{
    let {limit,page,query,sort} = req.query;
    const queryABuscar = {
        stock: (query === 'true' || query === 'false') && query ? query : null,
        category: query !== 'true' && query !== 'false' && query ? query : null 
    };
    console.log("La queryABuscar es: ", queryABuscar);
    const products = await productManager.getProducts(limit,page,queryABuscar,sort);

    const {hasNextPage, hasPrevPage, nextPage} = products;
    const nextLink = hasNextPage ? `http://localhost:8080/api/products/?page=${nextPage}` : null;
    const prevLink = hasPrevPage ? `http://localhost:8080/api/products/?page=${products.page-1}` : null;

    res.send({status: "success", payload: products, prevLink, nextLink});
      
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
        console.log("nuevo producto aniadido");
    });
    res.send(respuesta);
})

router.put('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const {title, description, code, price, status = true, stock, category,thumbnails} = req.body;
    const respuesta = await productManager.updateProduct(pid,{title,description,code,price,status,stock,category,thumbnails});
    socketServer.emit('updatedProduct', ()=>{
        console.log("Product updated");
    });
    res.send(respuesta);
})

router.delete('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const respuesta = await productManager.deleteProduct(pid);
    socketServer.emit('deleteProduct', ()=>{
        console.log("producto eliminado");
    });
    res.send(respuesta);
})

export default router;