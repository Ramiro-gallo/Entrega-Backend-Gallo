import express from "express";
import path from "path";
import userRouter from "./routes/user.router.js";
import prodRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.use("/users", userRouter);
app.use("/prods", prodRouter);
app.use("/carts", cartRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Server ok at 8080");
});

const socketServer = new Server(httpServer);

const prodArray = [];

socketServer.on("connection", (socket) => {
  console.log(`User ${socket.id} connected.`);
  // console.log(socket);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
  });
  socket.emit("prodArray", prodArray);
  socket.on("newProd", (prod) => {
    console.log(prod);
    prodArray.push(prod);
    // console.log(prodArray);
    socketServer.emit("prodArray", prodArray);
  });
});

export { prodArray };
