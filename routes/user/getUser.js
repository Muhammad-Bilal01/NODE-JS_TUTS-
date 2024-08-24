import { User } from "../../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send({ status: 200, users: user });
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
