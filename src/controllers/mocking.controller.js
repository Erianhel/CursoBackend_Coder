import { generateProducts } from "../utils.js";

export const mockProducts = (req, res) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }
    res.send({payload:products});
}; 