import express from "express";
import { userSchema } from "./schema/index.js";
import chalk from "chalk";

const log = console.log;

const app = express();

const PORT = 8080;

app.use(express.json());

// middleware
app.use("/", (req, res, next) => {
  log(chalk.blue(req.originalUrl));
  log(chalk.blue("Middleware"));

  next();
});

app.get("/", (req, res) => {
  res.send({ status: "OK", data: new Date() });
});

let users = [];

app.get("/users", (req, res) => {
  try {
    res.status(200).send({ status: 200, users: users });
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    await userSchema.validateAsync(req.body);
    let user = { id: Date.now().toString(36), ...req.body };

    users.push(user);

    res
      .status(201)
      .send({ status: 201, user: user, message: "User add Success" });
  } catch (error) {
    res
      .status(400)
      .send({ status: 400, error: error.details || "Something went Wrong" });
  }
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  users = users.filter((val) => val.id !== id);
  console.log(users);

  res.send({ message: "user delete Successfully with id " + id });
});

app.put("/user/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = users.findIndex((obj) => obj.id === id);
    //   console.log("index", index);

    users.splice(index, 1, { id: id, ...req.body });

    res
      .status(201)
      .send({ status: 201, id, message: "user update successfully!" });
  } catch (error) {
    res.send({ message: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log("The Server in running at port:", PORT);
});
