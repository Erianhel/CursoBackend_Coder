const agregarAlCarrito = (_id)=>{
    console.log("Este es el id del producto", _id);
    fetch(`http://localhost:8080/api/carts/6416473b92a4361879037017/products/${_id}`, {
        method: 'POST'
     })
}