const userModel = require("../Models/userModel");

const register = async (req, res) => {
  const { name, password } = req.body;
  const user = new userModel({
    name,
    password,
  });
  const data = await user.save();
  res.send(data);
};

module.exports = {
  register,
};
