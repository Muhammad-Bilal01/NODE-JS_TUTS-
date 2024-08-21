import express from "express";
// import cors from "cors";

const app = express();

// app.use(cors());

const PORT = 8080;

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.get("/users", (req, res) => {
  res.send([{ name: "Noman" }]);
});

app.post("/user", (req, res) => {
  res.send({ msg: "POST SUCCESS" });
});

app.listen(PORT, () => {
  console.log("The Server in running at port:", PORT);
});
