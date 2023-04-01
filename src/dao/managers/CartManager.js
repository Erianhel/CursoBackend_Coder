import { pid } from "process";
import { cartsModel } from "../models/carts.model.js";


export default class CartManager{

    addCart = async ()=> {
        try {

            const carritoCreado = await cartsModel.create({});
            return (carritoCreado);
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }
    
    addProduct = async (cid, pid)=> {
        try {

            const carritoBuscado = await cartsModel.findById({_id: cid}).lean();
            if (!carritoBuscado) {
                return({messaage: "El carrito no existe"});
            }

            console.log("carrito buscado", carritoBuscado.products)

            if (carritoBuscado.products.some((products)=> products.product.toString() === pid)) {
                carritoBuscado.products = carritoBuscado.products.map((elem)=>{
                    if (elem.product.toString() !== pid) {
                       return elem
                    } else {
                        elem.quantity ++;
                        return elem;
                    }
                })
                
                await cartsModel.findByIdAndUpdate({_id:cid},{...carritoBuscado});
                return({messaage:"Cantidad actualizada"});
            }else{
                carritoBuscado.products.push({product:pid,quantity:1});
                await cartsModel.findByIdAndUpdate({_id:cid},{...carritoBuscado});
                return({messaage:"Producto agregado"});
            }
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }

    getCarts = async ()=>{
        try {
            const carts = cartsModel.find({}).lean();
            return carts;
        } catch (error) {
            console.log('Error en la ejecución', error);
        }
        
    }


    getProductsByCartId = async (cid)=>{
        try {

            const carritoEncontrado = await cartsModel.findById({_id: cid}).populate('products.product').lean();
            if(!carritoEncontrado){
                return({messaage:"No se encontró el carrito"});
            }
            return(carritoEncontrado.products);
        } catch (error) {
            console.log('Error en la ejecución', error);
        }
    }

    deleteProductByProductId = async (cid,pid)=>{
        try {
            let carritoEncontrado = await cartsModel.findById({_id: cid}).lean();
            const newProductsArray = carritoEncontrado.products.filter((elem)=> elem.product.toString() !== pid);
            carritoEncontrado.products = newProductsArray;
            await cartsModel.findByIdAndUpdate({_id:cid}, {_id:cid, ...carritoEncontrado});
            return {messaage: "Producto eliminado"};
        } catch (error) {
            console.log('Error en la ejecución', error);
        }
    }
    
    updateProductsByCartId = async (cid, newProducts) =>{
        try {
            let carritoEncontrado = await cartsModel.findById({_id:cid}).lean();
            carritoEncontrado.products = newProducts;
            await cartsModel.findByIdAndUpdate({_id:cid}, {_id:cid, ...carritoEncontrado});
            return {messaage:"Carrito modificado"}; 
        } catch (error) {
            console.log('Error en la ejecución', error);
        }    
    }

    updateProductQuantityByProductId = async(cid,pid,quantity)=>{
        try {
            const carritoBuscado = await cartsModel.findById({_id: cid}).lean();
            carritoBuscado.products = carritoBuscado.products.map((elem)=>{
                if (elem.product.toString() !== pid) {
                   return elem
                } else {
                    elem.quantity = quantity;
                    return elem;
                }
            })  
            await cartsModel.findByIdAndUpdate({_id:cid},{...carritoBuscado});
            return {messaage: "carrito actualizado"};   
        } catch (error) {
            console.log('Error en la ejecución', error);
        }
    }

    deleteProductsByCartId = async(cid) =>{
        try {
            const carritoBuscado = await cartsModel.findById({_id:cid}).lean();
            carritoBuscado.products = [];
            await cartsModel.findByIdAndUpdate({_id:cid}, {...carritoBuscado});
            return {messaage: "productos eliminados del carrito"};
        } catch (error) {
            console.log('Error en la ejecución', error);  
        }
    }


    
}