import { Router } from "express";
import UserManager from '../managers/user.manager.js';
const userManager = new UserManager('../data/users.json');

const router = Router();

const usersArray = [
  {
    firstname: "Ramiro",
    lastname: "Gallo",
    age: 23,
    mail: "ramirog@gmail.com",
    phone: "12345678",
  },
  {
    firstname: "Pedro",
    lastname: "Gomez",
    age: 34,
    mail: "pedrog@gmail.com",
    phone: "23456781",
  },
  {
    firstname: "Diego",
    lastname: "Martinez",
    age: 44,
    mail: "diegom@gmail.com",
    phone: "34567812",
  },
  {
    firstname: "Paula",
    lastname: "Sanchez",
    age: 31,
    mail: "paulas@gmail.com",
    phone: "45678123",
  },
  {
    firstname: "Ivana",
    lastname: "Dominguez",
    age: 19,
    mail: "ivanad@gmail.com",
    phone: "56781234",
  },
];


router.get("/home", (req, res) => {
  res.render("home");
});
router.get("/view1", (req, res) => {
  res.render("view1");
});
router.get("/view2", (req, res) => {
  res.render("view2");
});
router.get("/user/random", (req, res) => {
  const randomnumber = Math.floor(Math.random() * 5);
  const user = usersArray[randomnumber];
  res.render("user", { user });
});
router.get("/user", async(req, res) => {
  const users = await userManager.getUsers();
  res.render("users", { usersArray });
});
router.get("/register", async (req,res) => {
  res.render("form");
})

export default router;
