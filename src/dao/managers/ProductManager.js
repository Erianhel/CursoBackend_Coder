import { productModel } from "../models/products.model.js";

export default class ProductManager{
  
    addProduct = async (title, description, code, price, status = true, stock, category, thumbnails)=> {
        try {
            const nuevoProducto = {
                title, 
                description, 
                code, 
                price, 
                status, 
                stock, 
                category, 
                thumbnails
            }
            const existeProducto = await productModel.findOne({code: nuevoProducto.code});
            if(existeProducto){
                return "El producto ingresado ya existe";
            }else if(code===null || code===""  || title === null || title === "" || description === null || description === "" || price === null || price === "" || thumbnails === null || thumbnails === "" || stock === null || stock === "" || category === null || category === ""){
                console.log("Error: Faltan ingresar datos del producto");
                return ("Error: Faltan ingresar datos del producto");
            }else{
                await productModel.create(nuevoProducto);
                return ({message: "Producto aniadido"});
            }
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }

    getProducts = async ()=>{
        try {
            const products = await productModel.find({}).lean();
            return products;
        } catch (error) {
            console.log('Error en la ejecución', error)
        }
        
    }

    getProductById = async (id)=>{
        try {
            const productoEncontrado = await productModel.find({_id:id}).lean();
            if (!productoEncontrado) {
                return {Error: "Item Not found"};
            }
            return productoEncontrado;
        } catch (error) {
            console.log('Error en la ejecución', error)
        }
    }

    updateProduct = async(id, producto) =>{
        try {
            const {title, description, code, price, status, stock, category, thumbnails} = producto;
            const productoEncontrado = await productModel.findById({_id:id}).lean();
            const productoUpdated = {
                title: title ? title : productoEncontrado.title, 
                description: description ? description : productoEncontrado.description,
                code: code ? code : productoEncontrado.code, 
                price: price ? price : productoEncontrado.price,
                status: status ? status : productoEncontrado.status,
                stock: stock ? stock : productoEncontrado.stock, 
                category: category ? category : productoEncontrado.category,
                thumbnails: thumbnails ? thumbnails : productoEncontrado.thumbnails, 
            }
            await productModel.findByIdAndUpdate({_id:id},{...productoUpdated});
            return {Message: "Item updated"};
        } catch (error) {
            console.log('Error en la ejecución', error) 
        }       

    }

    deleteProduct = async(id) =>{
        try {

            const existeProducto = await productModel.findById({_id:id}).lean();
            console.log("prueba: ", existeProducto)
            if (!existeProducto) {
                return({message: "El producto que se quiere eliminar, no existe"});
            }
            await productModel.findByIdAndDelete({_id:id});
            return({message:"Producto eliminado"}); 
        } catch (error) {
            console.log('Error en la ejecución', error)
            return('Error en la ejecución', error);
        }    
        
    }


    
}

