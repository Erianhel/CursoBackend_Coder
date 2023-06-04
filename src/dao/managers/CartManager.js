import { pid } from "process";
import { cartsModel } from "../models/carts.model.js";
import { ticketModel } from "../models/tickets.model.js";
import { productService } from "../../app.js";

export default class CartManager {
  addCart = async () => {
    try {
      const carritoCreado = await cartsModel.create({});
      return carritoCreado._id;
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  addProduct = async (cid, pid) => {
    try {
      const carritoBuscado = await cartsModel.findById({ _id: cid }).lean();
      if (!carritoBuscado) {
        return { messaage: "El carrito no existe" };
      }

      if (
        carritoBuscado.products.some(
          (products) => products.product.toString() === pid
        )
      ) {
        carritoBuscado.products = carritoBuscado.products.map((elem) => {
          if (elem.product.toString() !== pid) {
            return elem;
          } else {
            elem.quantity++;
            return elem;
          }
        });

        await cartsModel.findByIdAndUpdate({ _id: cid }, { ...carritoBuscado });
        return { messaage: "Cantidad actualizada" };
      } else {
        carritoBuscado.products.push({ product: pid, quantity: 1 });
        await cartsModel.findByIdAndUpdate({ _id: cid }, { ...carritoBuscado });
        return { messaage: "Producto agregado" };
      }
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  getCarts = async () => {
    try {
      const carts = cartsModel.find({}).lean();
      return carts;
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  getProductsByCartId = async (cid) => {
    try {
      const carritoEncontrado = await cartsModel
        .findById({ _id: cid })
        .populate("products.product")
        .lean();
      if (!carritoEncontrado) {
        return { messaage: "No se encontró el carrito" };
      }
      return carritoEncontrado.products;
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  deleteProductByProductId = async (cid, pid) => {
    try {
      let carritoEncontrado = await cartsModel.findById({ _id: cid }).lean();
      const newProductsArray = carritoEncontrado.products.filter(
        (elem) => elem.product.toString() !== pid
      );
      carritoEncontrado.products = newProductsArray;
      await cartsModel.findByIdAndUpdate(
        { _id: cid },
        { _id: cid, ...carritoEncontrado }
      );
      return { messaage: "Producto eliminado" };
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  updateProductsByCartId = async (cid, newProducts) => {
    try {
      let carritoEncontrado = await cartsModel.findById({ _id: cid }).lean();
      carritoEncontrado.products = newProducts;
      const carritoModificado = await cartsModel.findByIdAndUpdate(
        { _id: cid },
        { _id: cid, ...carritoEncontrado }
      );
      return carritoModificado;
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  updateProductQuantityByProductId = async (cid, pid, quantity) => {
    try {
      const carritoBuscado = await cartsModel.findById({ _id: cid }).lean();
      carritoBuscado.products = carritoBuscado.products.map((elem) => {
        if (elem.product.toString() !== pid) {
          return elem;
        } else {
          elem.quantity = quantity;
          return elem;
        }
      });
      await cartsModel.findByIdAndUpdate({ _id: cid }, { ...carritoBuscado });
      return { messaage: "carrito actualizado" };
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  deleteProductsByCartId = async (cid) => {
    try {
      const carritoBuscado = await cartsModel.findById({ _id: cid }).lean();
      carritoBuscado.products = [];
      await cartsModel.findByIdAndUpdate({ _id: cid }, { ...carritoBuscado });
      return { messaage: "productos eliminados del carrito" };
    } catch (error) {
      return "Error en la ejecución", error;
    }
  };

  purchaseProducts = async (cid) => {
    let carritoEncontrado = await cartsModel
      .findById({ _id: cid })
      .populate("products.product")
      .lean();
    let nuevoCarrito = [];
    let amount = 0;
    carritoEncontrado.products.forEach(async (item) => {
      let productoEncontrado = await productService.getProductById(
        item.product._id
      );
      if (productoEncontrado.stock < item.quantity) {
        nuevoCarrito.push(item);
      } else {
        amount = amount + productoEncontrado.price * item.quantity;
        productoEncontrado.stock = productoEncontrado.stock - item.quantity;
        await productService.updateProduct(
          productoEncontrado._id,
          productoEncontrado
        );
      }
    });
    const newCart = await this.updateProductsByCartId(cid, nuevoCarrito);
    const productosNoComprados = nuevoCarrito.map((elem) => elem.product._id);
    return { productosNoComprados, amount };
  };
}
