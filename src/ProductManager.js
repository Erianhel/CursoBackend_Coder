import fs from 'fs';

class ProductManager{
    constructor() {
        this.products = [];
        this.path = './archivo_de_productos'
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock)=> {
        try {
            if (fs.existsSync(this.path)) {
                const response = await fs.promises.readFile(this.path,'utf-8');
                this.products = JSON.parse(response);
                ProductManager.id = this.products[this.products.length-1].id + 1;
            } 
            
            const productoExiste = this.products.some((item)=>item.code === code)
            if (productoExiste) {
                console.log("Error: El codigo del producto ingresado, ya existe");
            }else if(code===null || code===""  || title === null || title === "" || description === null || description === "" || price === null || price === "" || thumbnail === null || thumbnail === "" || stock === null || stock === ""){
                console.log("Error: Faltan ingresar datos del producto");
            }else{
                const id = ProductManager.id
                this.products.push({  id , title, description, price, thumbnail, code, stock});
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            } 
        } catch (error) {
            console.log('Error en ejecución', error)
        }
      
    }

    getProducts = async ()=>{
        try {
            if (fs.existsSync(this.path)) {
                const response = await fs.promises.readFile(this.path,'utf-8');
                this.products = JSON.parse(response);
                return JSON.parse(response);
            }else{
                return this.products;
            }
        } catch (error) {
            console.log('Error en ejecución', error)
        }
        
    }

    getProductById = async (id)=>{
        try {
            const response = await fs.promises.readFile(this.path,'utf-8')
            const responseArray = JSON.parse(response);
            console.log('Error en ejecución', responseArray);
            if (responseArray.some((item)=> item.id === id)) {
                return  responseArray.find((item) => item.id === id);
            } else {
                return {Error: "Item Not found"};
            } 
        } catch (error) {
            console.log('Error en ejecución', error)
        }
        
        
    }

    updateProduct = async(id, producto) =>{
        try {
            const {title, description, price, thumbnail, code, stock} = producto;
            const arrayProd = await this.getProducts();
            const arrayModif = arrayProd.map((item)=> {
                if(item.id!==id){
                    return item;
                }else{
                    const nuevo_producto ={
                        title: title ? title : item.title, 
                        description: description ? description : item.description, 
                        price: price ? price : item.price, 
                        thumbnail: thumbnail ? thumbnail : item.thumbnail, 
                        code: code ? code : item.code, 
                        stock: stock ? stock : item.stock
                    }
                    item = {id: item.id, ...nuevo_producto}
                    return item;
                }
    
            });     

            await fs.promises.writeFile(this.path, JSON.stringify(arrayModif));
        } catch (error) {
            console.log('Error en ejecución', error) 
        }
       


    }

    deleteProduct = async(id) =>{
        try {
            let arrayProductosFiltrado = [];
            const arrayProd = await this.getProducts();
            if(arrayProd.some((item)=>item.id===id)){
                arrayProductosFiltrado =  arrayProd.filter((item)=>item.id!==id);
                await fs.promises.writeFile(this.path, JSON.stringify(arrayProductosFiltrado));
            }else{
                console.log("El producto que quiere eliminar, no existe");
            }
            
        } catch (error) {
            console.log('Error en ejecución', error)
        }    
        
    }


    
}

/* async function main (){

    const productManager = new ProductManager();
    console.log("--------------------------Generando Productos---------------------------------");

    await productManager.addProduct("producto1", "Este es el producto 1", 100, "Sin imagen", "prod1",25);
    await productManager.addProduct("producto2", "Este es el producto 2", 200, "Sin imagen", "prod2",25);
    await productManager.addProduct("producto3", "Este es el producto 3", 300, "Sin imagen", "prod3",25);
    await productManager.addProduct("producto4", "Este es el producto 4", 400, "Sin imagen", "prod4",25);
    await productManager.addProduct("producto5", "Este es el producto 5", 500, "Sin imagen", "prod5",25);
    await productManager.addProduct("producto6", "Este es el producto 6", 600, "Sin imagen", "prod6",25);
    await productManager.addProduct("producto7", "Este es el producto 7", 700, "Sin imagen", "prod7",25);
    await productManager.addProduct("producto8", "Este es el producto 8", 800, "Sin imagen", "prod8",25);
    await productManager.addProduct("producto9", "Este es el producto 9", 900, "Sin imagen", "prod9",25);
    await productManager.addProduct("producto10", "Este es el producto 10", 1000, "Sin imagen", "prod10",25);
    
    console.log(await productManager.getProducts()); 
    
    
}

main(); */

export default ProductManager;