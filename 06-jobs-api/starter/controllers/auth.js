const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  //   const { name, email, password } = req.body;
  //   //   if (!name || !email || !password) {
  //   //     throw new BadRequestError("Please provide name, email and password");
  //   //   }

  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   const tempUser = { name, email, password:hashedPassword };

  const user = await User.create({ ...req.body });

  const token = user.createJwt;

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invald Credentials");
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Password");
  }

  //compare password
  const token = user.createJwt();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
