// const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const Event = require('../model/eventModel');

require('dotenv').config();

const createToken = (id) => {
    return jwt.sign({ id }, "qrscannerbackend", { expiresIn: '3d' });
  };
  
//========signup user================
const signupUser = async (req, res) => {
    const { email, password, owner } = req.body;
    console.log("signup working");
    try {
      const user = await User.singup(email, password, owner);
      const id = user._id;
      const token = createToken(id);
      res.json({ email, token, id, owner });
    } catch (err) {
      console.log("not working");
      res.status(400).json({ error: err.message });
    }
  };
  
  //========login user================
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      id = user._id;
      owner = user.owner;
      const token = createToken(id);
      console.log("login working");
      res.status(200).json({ email, token, id, owner });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  module.exports = { signupUser, loginUser, getAllUsers }
  
  