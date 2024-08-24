import { User } from "../../models/User.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .send({ status: 200, message: "User deleted successfully!" });
  } catch (error) {}
};

export { deleteUser };
