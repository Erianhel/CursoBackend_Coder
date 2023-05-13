import fs from 'fs';

export default class CartManager{
    constructor() {
        this.products = [];
        this.path = './archivo_cart'
    }

    static id = 0;


    addCart = async (products)=> {
        try {
            let carts = [];
            if (fs.existsSync(this.path)) {
                const response = await fs.promises.readFile(this.path,'utf-8');
                carts = JSON.parse(response);
                CartManager.id = carts[carts.length-1].id + 1;
            }
            const id = CartManager.id;
            this.products = products;
            carts.push({id, products});
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return (carts);
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }
    
    addProduct = async (cid, pid, quantity)=> {
        try {
            let cartModificado = [];
            const response = await fs.promises.readFile(this.path,'utf-8')
            const responseArray = JSON.parse(response);
            console.log(typeof(pid));
            if (responseArray.some((item)=> item.id === cid)) {
                cartModificado = responseArray.map((item)=>{
                    if (item.id !== cid) {
                        return item;
                    } else if (item.products.some((products)=> products.id === pid)) {
                        item.products = item.products.map((elem)=>{
                            if (elem.id !== pid) {
                               return elem
                            } else {
                                elem.quantity += quantity;
                                return elem;
                            }
                        })
                        return item;
                    }else{
                        item.products.push({id: pid, quantity})
                        console.log(item)
                        return item;
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(cartModificado));
                return cartModificado;
                
            } else {
                return {Error: "Cart Not found"};
            }    
        } catch (error) {
            console.log('Error en la ejecución', error);
            return ('Error en la ejecución', error);
        }
      
    }


    getProductsByCartId = async (id)=>{
        try {
            const response = await fs.promises.readFile(this.path,'utf-8')
            const responseArray = JSON.parse(response);
            if (responseArray.some((item)=> item.id === id)) {
                return  responseArray.find((item) => item.id === id).products;
            } else {
                return {Error: "Item Not found"};
            } 
        } catch (error) {
            console.log('Error en la ejecución', error)
        }
    }


    
}