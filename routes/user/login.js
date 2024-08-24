import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv";
import jsonwebtoken from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (checkPassword) {
        const token = jsonwebtoken.sign(
          user.toObject(),
          process.env.JWT_SECRET
        );
        return res.status(200).send({
          status: 200,
          token: token,
          msg: "User Login Successfully",
        });
      } else {
        return res.status(401).send({
          status: 401,
          msg: "Unauthoried USer",
        });
      }
    } else {
      return res.status(404).send({
        status: 200,
        msg: "Not found",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(400).send({ status: 400, error });
  }
};

export { loginUser };
