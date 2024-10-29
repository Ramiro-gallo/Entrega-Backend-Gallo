import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProdManager {
  constructor(path) {
    this.path = path;
  }
  async getProds() {
    try {
      if (fs.existsSync(this.path)) {
        const prods = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(prods);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProd(obj) {
    try {
      const prod = {
        id: uuidv4(),
        ...obj,
      };
      const prods = await this.getProds();
      const prodExists = prods.find((p) => p.id === prod.id);
      if (prodExists) throw new Error("Product already exists");
      prods.push(prod);
      await fs.promises.writeFile(this.path, JSON.stringify(prods));
      return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProdById(id) {
    try {
      const prods = await this.getProds();
      if (prods.length < 1) throw new Error("Products list is empty");
      const prod = prods.find((prod) => prod.id === id);
      if (!prod) throw new Error("Product not found");
      return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProd(obj, id) {
    try {
      const prods = await this.getProds();
      let prod = await this.getProdById(id);
      prod = { ...prod, ...obj };
      const newArray = prods.filter((prod) => prod.id !== id);
      newArray.push(prod);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return prod;
    } catch {
      throw new Error(error.message);
    }
  }

  async deleteProd(id) {
    try {
      const prod = await this.getProdById(id);
      const prods = await this.getProds();
      const newArray = prods.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAllProds() {
    try {
      const prods = await this.getProds();
      if (prods.length < 1) throw new Error("Products is empty");
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
