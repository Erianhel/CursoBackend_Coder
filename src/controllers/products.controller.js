import e from "express";
import { productService, socketServer } from "../app.js";

export const getProducts = async (req,res)=>{
    try {
        let {limit,page,query,sort} = req.query;
        const queryABuscar = {
            stock: query === 'true' || query === 'false' && query ? query : null,
            category: query !== 'true' && query !== 'false' && query ? query : null 
        };
        console.log("La queryABuscar es: ", queryABuscar);
        const products = await productService.getProducts(limit,page,queryABuscar,sort);
    
        const {hasNextPage, hasPrevPage, nextPage} = products;
        const nextLink = hasNextPage ? `http://localhost:8080/api/products/?page=${nextPage}` : null;
        const prevLink = hasPrevPage ? `http://localhost:8080/api/products/?page=${products.page-1}` : null;
    
        res.send({status: "success", payload: products, prevLink, nextLink});
        
    } catch (error) {
        console.log(error); 
    }
  
}

export const getProductById = async (req, res)=>{
    try {
        const {pid} = req.params;
        console.log(req.params);
        const product = await productService.getProductById(pid);
        console.log(product);
        res.send(product);
    } catch (error) {
        console.log(error); 
    }
  
}

export const addProduct = async (req,res)=>{
    try {
        const {title, description, code, price, status, stock, category,thumbnails} = req.body;
        const respuesta = await productService.addProduct(title,description,code,price,status,stock,category,thumbnails);
        socketServer.emit('addProduct', ()=>{
            console.log("nuevo producto aniadido");
        });
        res.send(respuesta);
    } catch (error) {
        console.log(error);    
    }
   
}

export const updateProduct = async (req, res)=>{
    try {
        const {pid} = req.params;
        const {title, description, code, price, status = true, stock, category,thumbnails} = req.body;
        const respuesta = await productService.updateProduct(pid,{title,description,code,price,status,stock,category,thumbnails});
        socketServer.emit('updatedProduct', ()=>{
        console.log("Product updated");
        });
    res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
    
}

export const deleteProduct = async (req, res)=>{
    try {
        const {pid} = req.params;
        const respuesta = await productService.deleteProduct(pid);
        socketServer.emit('deleteProduct', ()=>{
            console.log("producto eliminado");
        });
        res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
   
}

