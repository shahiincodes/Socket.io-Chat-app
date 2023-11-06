const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const fetchUser = await userModel.findOne({
      name,
      password: bcrypt.hash(password, 10).toString(),
    });
    if (fetchUser) {
      res.status(200).json({ message: "User Already exist" });
    } else {
      const user = new userModel({
        name,
        password: (await bcrypt.hash(password, 10)).toString(),
      });
      const data = await user.save();
      res.status(201).json({
        status: true,
        message: `User created successfully with user name as ${data.name}`,
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};
const logIn = async (req, res) => {
  const { name, password } = req.body;
  try {
    const fetchUser = await userModel.findOne({ name });
    if (fetchUser) {
      console.log(fetchUser);
      let isValidUser = bcrypt.compare(password, fetchUser.password);
      if (isValidUser) {
        res.json({ status: true, message: "User Validated successfully" });
      }
    } else {
      res.json({
        status: false,
        message: "User not found, please provide correct username and password",
      });
    }
  } catch (error) {
    res.json({ status: true, message: error.message });
  }
};
module.exports = {
  register,
  logIn,
};
