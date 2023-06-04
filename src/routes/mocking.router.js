import { mockProducts } from "../controllers/mocking.controller.js";
import CustomRouter from "./router.router.js";


export default class MockingRouter extends CustomRouter{
    init(){
        this.get('/',["PUBLIC"], mockProducts);
        
    }
}