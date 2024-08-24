import express from "express";
import { userSchema } from "./schema/index.js";
import chalk from "chalk";
import { router } from "./routes/index.js";
import mongoose from "./db/index.js";

const log = console.log;

const app = express();

const PORT = 8080;

app.use(express.json());

// Database Connectivity
mongoose.connection.on("open", () => {
  console.log("MongoDB is Connected");
});

mongoose.connection.on("error", (error) => {
  console.error("Database Error ", error);
});

// middleware
app.use("/", (req, res, next) => {
  log(chalk.blue(req.originalUrl));
  log(chalk.blue("Middleware"));

  next();
});

app.get("/", (req, res) => {
  return res.status(200).send({ Status: 200, msg: "OK" });
});

app.all("/secret", (req, res) => {
  console.log(req.query);

  return res.send("test");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("The Server in running at port:", PORT);
});
