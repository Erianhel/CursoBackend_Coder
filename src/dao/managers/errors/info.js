export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * firstName: need to be a string, received ${user.firstName}
    * lastName: need to be a string, received ${user.lastName}
    * email: need to be a string, received ${user.email}`

}

export const generateProductErrorInfo = (product) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title: need to be a string, received ${product.title}
    * description: need to be a string, received ${product.description}
    * code: need to be a string, received ${product.code}
    * price: need to be a number, received ${product.price}
    * stock: need to be a number, received ${product.stock}
    * category: need to be a string, received ${product.category}
    * thumbnails: need to be a string, received ${product.thumbnails}`

}