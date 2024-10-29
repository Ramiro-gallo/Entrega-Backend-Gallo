import { Router } from "express";
import ProdManager from "../managers/products.manager.js";
const prodManager = new ProdManager("src/data/products.json");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const prods = await prodManager.getProds();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await prodManager.getProdById(id);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const prod = await prodManager.createProd(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodDel = await prodManager.deleteProd(id);
    res
      .status(200)
      .json({ message: `Product id: ${prodDel.id} has been deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await prodManager.deleteAllProds();
    res.json({ message: "All products have been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodUpdate = await prodManager.updateProd(req.body, id);
    res.status(200).json({ prodUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
