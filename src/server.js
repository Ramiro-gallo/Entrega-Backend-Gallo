import express from "express";
import userRouter from "./routes/user.router.js";
import prodRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/prods", prodRouter);
app.use("/carts", cartRouter);

app.listen(8080, () => console.log("Server ok at 8080"));
