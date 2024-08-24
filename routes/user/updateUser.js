import { User } from "../../models/User.js";

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    await User.findByIdAndUpdate(id, { ...req.body, password: hashPassword });
    res.status(200).send({ status: 200, message: "User update successfully!" });
  } catch (error) {}
};

export { updateUser };
