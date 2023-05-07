import authMdw from "../middleware/auth.js";
import  CustomRouter  from "./router.router.js";
import { passportCall } from "../utils.js";
import { login, realtimeproducts, getAllMessages, getProducts, getProductsByCartId, loginRender, register } from "../controllers/views.controller.js";

export default class ViewsRouter extends CustomRouter{

    init(){
        this.get('/',["PUBLIC"], login);
        
        this.get('/realtimeproducts',["PUBLIC"], realtimeproducts);
        
        this.get('/chat',["USER"], getAllMessages)
        
        this.get('/products',["PUBLIC"],passportCall('jwt'), getProducts);
        
        
        this.get('/carts/:cid',["PUBLIC"], getProductsByCartId);
        
        
        this.get("/login",["PUBLIC"], loginRender)
        
        this.get("/register",["PUBLIC"], register)

    }
}
