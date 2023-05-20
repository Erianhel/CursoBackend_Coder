import { cartService, messagesService, productService } from "../app.js";

export const login = async (req, res) => {
  return res.redirect("/login");
};

export const realtimeproducts = async (req, res) => {
  let { limit, page, query, sort } = req.query;
  const queryABuscar = {
    stock: query === "true" || (query === "false" && query) ? query : null,
    category: query !== "true" && query !== "false" && query ? query : null,
  };

  const products = await productService.getProducts(
    limit,
    page,
    queryABuscar,
    sort
  );
  const { hasNextPage, hasPrevPage, nextPage } = products;
  const nextLink = hasNextPage
    ? `http://localhost:8080/products/?page=${nextPage}`
    : null;
  const prevLink = hasPrevPage
    ? `http://localhost:8080/products/?page=${products.page - 1}`
    : null;
  res.render("realTimeProducts", { products, nextLink, prevLink });
};

export const getAllMessages = async (req, res) => {
  const messages = await messagesService.getAllMessages();
  res.render("chat", { messages });
};

export const getProducts = async (req, res) => {
  try {
    req.logger.debug(`req.user es:  ${req.user}`);
    const user = {
      first_name: req.user.user
        ? req.user.user.firt_name
        : req.session.user.firt_name,
      last_name: req.user.user
        ? req.user.user.last_name
        : req.session.user.last_name,
      email: req.user.user ? req.user.user.email : req.session.user.email,
      age: req.user.user ? req.user.user.age : req.session.user.age,
      rol: req.user.user ? req.user.user.rol : req.session.user.rol,
      cart: req.user.user ? req.user.user.cart : req.session.user,
    };
    let { limit, page, query, sort } = req.query;
    const queryABuscar = {
      stock: query === "true" || (query === "false" && query) ? query : null,
      category: query !== "true" && query !== "false" && query ? query : null,
    };

    const products = await productService.getProducts(
      limit,
      page,
      queryABuscar,
      sort
    );
    const { hasNextPage, hasPrevPage, nextPage } = products;
    const nextLink = hasNextPage
      ? `http://localhost:8080/products/?page=${nextPage}`
      : null;
    const prevLink = hasPrevPage
      ? `http://localhost:8080/products/?page=${products.page - 1}`
      : null;

    res.render("products", { products, nextLink, prevLink, user });
  } catch (error) {
    req.logger.error(`error en getProducts ${error}`);
  }
};

export const getProductsByCartId = async (req, res) => {
  const { cid } = req.params;
  const products = await cartService.getProductsByCartId(cid);
  res.render("cart", { products });
};

export const loginRender = async (req, res) => {
  res.render("login");
};

export const register = async (req, res) => {
  res.render("register");
};
