import { cartService } from "../app.js";

export const getCarts = async (req,res)=>{
    const carts = await cartService.getCarts();
    res.send(carts); 
}

export const getProductsByCartId =  async (req, res)=>{
    const {cid} = req.params;
    console.log(req.params);
    const products = await cartService.getProductsByCartId(cid);
    console.log(products);
    res.send(products);
}

export const addCart = async (req,res)=>{
    const respuesta = await cartService.addCart();
    res.send(respuesta);
}

export const addProduct = async (req,res)=>{
    const {cid, pid} = req.params;
    const respuesta = await cartService.addProduct(cid, pid);
    res.send(respuesta);
}

export const deleteProductByProductId = async (req,res)=>{
    const {cid,pid} = req.params;
    const respuesta = await cartService.deleteProductByProductId(cid, pid);
    res.send(respuesta); 
}

export const updateProductsByCartId = async(req,res)=>{
    const {cid} = req.params;
    const newProducts = req.body;
    console.log("Productos nuevos: ", newProducts);
    const respuesta = await cartService.updateProductsByCartId(cid,newProducts);
    res.send(respuesta);

}

export const updateProductQuantityByProductId =  async(req, res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    const respuesta = await cartService.updateProductQuantityByProductId(cid,pid,+quantity);
    res.send(respuesta);
}

export const deleteProductsByCartId = async(req,res)=>{
    const {cid} = req.params;
    const respuesta = await cartService.deleteProductsByCartId(cid);
    res.send(respuesta);
}