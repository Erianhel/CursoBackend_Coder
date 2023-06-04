import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.controller.js";
import CustomRouter from "./router.router.js";

export default class ProductsRouter extends CustomRouter{
    init(){
        this.get('/',["PUBLIC"], getProducts);
        
        this.get('/:pid',["PUBLIC"], getProductById);
        
        this.post('/',["ADMIN"], addProduct);
        
        this.put('/:pid',["ADMIN"], updateProduct);
        
        this.delete('/:pid',["ADMIN"], deleteProduct);
    }
}