import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const postUser = async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashPassword });
    const token = jsonwebtoken.sign(user.toObject(), process.env.JWT_SECRET);
    return res.status(201).send({
      status: 200,
      user: user,
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).send({ status: 400, error });
  }
};

export { postUser };
