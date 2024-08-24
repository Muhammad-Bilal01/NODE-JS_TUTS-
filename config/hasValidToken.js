import jwt from "jsonwebtoken";
import "dotenv/config";

const hasValidToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      if (verifyToken) {
        console.log("Verify");

        next();
      } else {
        return res.status(401).send({ status: 401, error: "Unauthorized!" });
      }
    } else {
      return res
        .status(401)
        .send({ status: 401, error: "Token is Not Provided!" });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error", error });
  }
};

export default hasValidToken;
