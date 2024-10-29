import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export default class UserManager {
  constructor(path) {
    this.path = path;
  }

  #createHash(user) {
    user.salt = crypto.randomBytes(128).toString();
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(users);
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(obj) {
    try {
      const user = {
        id: uuidv4(),
        ...obj,
      };
      const users = await this.getUsers();
      const userExists = users.find((u) => u.email === user.email);
      if (userExists) throw new Error("User already exists");
      this.#createHash(user);
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const users = await this.getUsers();
      if (users.length < 1) throw new Error("Users list is empty");
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(obj, id) {
    try {
      const users = await this.getUsers();
      let user = await this.getUserById(id);
      user = { ...user, ...obj };
      if (obj.password) this.#createHash(user);
      const newArray = users.filter((user) => user.id !== id);
      newArray.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return user;
    } catch {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getUserById(id);
      const users = await this.getUsers();
      const newArray = users.filter((user) => user.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAllUsers() {
    try {
      const users = await this.getUsers();
      if (users.length < 1) throw new Error("Users is empty");
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
