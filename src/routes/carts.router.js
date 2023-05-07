import { addCart, addProduct, deleteProductByProductId, deleteProductsByCartId, getCarts, getProductsByCartId, updateProductQuantityByProductId, updateProductsByCartId } from "../controllers/cart.controller.js";
import { passportCall } from "../utils.js";
import CustomRouter from "./router.router.js";


export default class CartsRouter extends CustomRouter{
    init(){
        this.get('/',["PUBLIC"], getCarts);
        
        this.get('/:cid',["PUBLIC"], getProductsByCartId);
        
        this.post('/',["PUBLIC"], addCart);
        
        this.post('/:cid/products/:pid', ["USER"], addProduct);
        
        this.delete('/:cid/products/:pid',["PUBLIC"], deleteProductByProductId);
        
        this.put('/:cid',["PUBLIC"], updateProductsByCartId)
        
        this.put('/:cid/products/:pid',["PUBLIC"],updateProductQuantityByProductId);
        
        this.delete('/:cid',["PUBLIC"], deleteProductsByCartId);
    }
}