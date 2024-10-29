import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import  ProdManager  from "./products.manager.js";
const prodManager = new ProdManager("./products.json");


export default class CartManager {
  constructor(path) {
    this.path = path;
  }
  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      return carts.find((c) => c.id === id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      let carts = await this.getCarts();
      const prod = await prodManager.getProdById(prodId);
      if (!prod) throw new Error("Product not found");
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error("Cart not found");
      const prodInCart = cart.products.find((prod) => prod.id === prodId);
      if (!prodInCart) {
        const product = {
          id: prodId,
          quantity: 1,
        };
        cart.products.push(product);
      } else {
        prodInCart.quantity += 1;
      }
      const updatedCarts = carts.map((c) => {
        if (c.id === cartId) return cart;
      });

      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
