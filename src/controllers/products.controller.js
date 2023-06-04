import e from "express";
import { productService, socketServer } from "../app.js";

export const getProducts = async (req, res) => {
  try {
    let { limit, page, query, sort } = req.query;
    const queryABuscar = {
      stock: query === "true" || (query === "false" && query) ? query : null,
      category: query !== "true" && query !== "false" && query ? query : null,
    };
    req.logger.debug(`La queryABuscar es:  ${queryABuscar}`);
    const products = await productService.getProducts(
      limit,
      page,
      queryABuscar,
      sort
    );

    const { hasNextPage, hasPrevPage, nextPage } = products;
    const nextLink = hasNextPage
      ? `http://localhost:8080/api/products/?page=${nextPage}`
      : null;
    const prevLink = hasPrevPage
      ? `http://localhost:8080/api/products/?page=${products.page - 1}`
      : null;

    res.send({ status: "success", payload: products, prevLink, nextLink });
  } catch (error) {
    req.logger.error(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    req.logger.debug(req.params);
    const product = await productService.getProductById(pid);
    req.logger.debug(product);
    res.send(product);
  } catch (error) {
    req.logger.error(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const respuesta = await productService.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    );
    socketServer.emit("addProduct", () => {
      req.logger.info("nuevo producto aniadido");
    });
    res.send(respuesta);
  } catch (error) {
    req.logger.error(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails,
    } = req.body;
    const respuesta = await productService.updateProduct(pid, {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });
    socketServer.emit("updatedProduct", () => {
      req.logger.info("Product updated");
    });
    res.send(respuesta);
  } catch (error) {
    req.logger.error(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const respuesta = await productService.deleteProduct(pid);
    socketServer.emit("deleteProduct", () => {
      req.logger.info("producto eliminado");
    });
    res.send(respuesta);
  } catch (error) {
    req.logger.error(error);
  }
};
