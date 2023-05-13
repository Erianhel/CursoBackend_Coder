import { cartService, ticketService } from "../app.js";

export const getCarts = async (req,res)=>{
    try {
        const carts = await cartService.getCarts();
        res.send(carts); 
    } catch (error) {
        console.log(error);
    }
  
}

export const getProductsByCartId =  async (req, res)=>{
    try {
        const {cid} = req.params;
        console.log(req.params);
        const products = await cartService.getProductsByCartId(cid);
        console.log(products);
        res.send(products);
    } catch (error) {
        console.log(error);
    }
    
}

export const addCart = async (req,res)=>{
    try {
        const respuesta = await cartService.addCart();
        res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
  
}

export const addProduct = async (req,res)=>{
    try {
        const {cid, pid} = req.params;
        const respuesta = await cartService.addProduct(cid, pid);
        res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
  
}

export const deleteProductByProductId = async (req,res)=>{
    try {
        const {cid,pid} = req.params;
        const respuesta = await cartService.deleteProductByProductId(cid, pid);
        res.send(respuesta); 
    } catch (error) {
        console.log(error);
    }
    
}

export const updateProductsByCartId = async(req,res)=>{
    try {
        const {cid} = req.params;
        const newProducts = req.body;
        console.log("Productos nuevos: ", newProducts);
        const respuesta = await cartService.updateProductsByCartId(cid,newProducts);
        res.send(respuesta);
    } catch (error) {
        console.log(error);
    }
  

}

export const updateProductQuantityByProductId =  async(req, res)=>{
   try {
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    const respuesta = await cartService.updateProductQuantityByProductId(cid,pid,+quantity);
    res.send(respuesta);
   } catch (error) {
    console.log(error);
   }
}

export const deleteProductsByCartId = async(req,res)=>{
    try {
        const {cid} = req.params;
        const respuesta = await cartService.deleteProductsByCartId(cid);
        res.send(respuesta);
    } catch (error) {
        console.log(error); 
    }

}

export const purchaseProducts = async(req,res)=>{
    try {
        const {cid} = req.params;
        const {email} = req.user.user;
        console.log("El email es: ", email);
        const {productosNoComprados, amount} = await cartService.purchaseProducts(cid);
        const ticket = await ticketService.createTicket(amount,email);
        res.send({ProductosNoComprados: productosNoComprados, tiket: ticket});

    } catch (error) {
        console.log(error); 
    }
}