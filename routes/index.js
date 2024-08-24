import express from "express";
import { postUser } from "./user/postUser.js";
import { getUser } from "./user/getUser.js";
import { deleteUser } from "./user/deleteUser.js";
import { updateUser } from "./user/updateUser.js";
import { loginUser } from "./user/login.js";
import hasValidToken from "../config/hasValidToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.send({ msg: "Hello" });
});

router.post("/user", postUser);
router.post("/login", loginUser);
router.get("/user", hasValidToken, getUser);
router.get("/user/:id", deleteUser);
router.get("/user/:id", updateUser);

export { router };
