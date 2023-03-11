import { cartsModel } from "../models/carts.model.js";


export default class CartManager{

    addCart = async (products)=> {
        try {

            const carritoCreado = await cartsModel.create({products:products})
            return (carritoCreado);
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }
    
    addProduct = async (cid, pid, quantity)=> {
        try {

            const carritoBuscado = await cartsModel.findById({_id: cid}).lean();
            if (!carritoBuscado) {
                return({messaage: "El carrito no existe"});
            }

            if (carritoBuscado.products.some((products)=> products._id === pid)) {
                carritoBuscado.products = carritoBuscado.products.map((elem)=>{
                    if (elem._id !== pid) {
                       return elem
                    } else {
                        elem.quantity += quantity;
                        return elem;
                    }
                })
                
                await cartsModel.findByIdAndUpdate({_id:cid},{...carritoBuscado});
                return({messaage:"Cantidad actualizada"});
            }else{
                carritoBuscado.products.push({_id:pid,quantity});
                await cartsModel.findByIdAndUpdate({_id:cid},{...carritoBuscado});
                return({messaage:"Producto agregado"});
            }
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }


    getProductsByCartId = async (cid)=>{
        try {

            const carritoEncontrado = await cartsModel.findById({_id: cid});
            if(!carritoEncontrado){
                return({messaage:"No se encontró el carrito"});
            }
            return(carritoEncontrado.products);
        } catch (error) {
            console.log('Error en la ejecución', error)
        }
    }


    
}