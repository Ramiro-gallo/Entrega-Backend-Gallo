import { Router } from "express";
import UserManager from "../managers/user.manager.js";
import { userValidator } from "../middlewares/user.validator.js";
import { uploader } from "../middlewares/multer.js";
const userManager = new UserManager("src/data/users.json");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userManager.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userManager.getUserById(id);
    res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", [userValidator], async (req, res) => {
  try {
    const user = await userManager.createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/upload-file", uploader.single("profile"), async (req, res) => {
  try {
    console.log(req.file);
    const user = await userManager.createUser({
      ...req.body,
      profile: req.file.path,
    });
    res
      .status(201)
      .json({ id: user.id, email: user.email, profile: user.profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDel = await userManager.deleteUser(id);
    res
      .status(200)
      .json({ message: `User id: ${userDel.id} has been deleted` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await userManager.deleteAllUsers();
    res.json({ message: "All users have been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdate = await userManager.updateUser(req.body, id);
    res.status(200).json({ userUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res)=>{
  try {
    await userManager.createUser(req.body);
    res.redirect("/user");
  } catch (error) {
    res.render("error", { message: error.message });
  }
})

export default router;
