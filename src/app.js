import express from 'express';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();  
const app = express();

app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req,res)=>{
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if (limit !== null) {
        const productsFiltered = products.slice(0,limit);
        res.send(productsFiltered);
    }else{
        res.send(products);
    }    
})

app.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params;
    console.log(req.params);
    const product = await productManager.getProductById(+pid);
    console.log(product);
    res.send(product);
})