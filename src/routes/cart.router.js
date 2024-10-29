import { response, Router } from "express";
import CartManager from "../managers/cart.manager.js";
const cartManager = new CartManager("src/data/carts.json");
const router = Router();

router.post("/", async (req, res) => {
  try {
    res.json(await cartManager.createCart());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
    try {
      res.json(await cartManager.getCarts());
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });


router.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    res.json(await cartManager.getCartById(cartId));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/:cartId/product/:prodId", async (req, res) => {
  try {
    const { prodId } = req.params;
    const { cartId } = req.params;
    await cartManager.addProdToCart(cartId, prodId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;