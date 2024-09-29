// check username and password on login request
// if user exists, create new JWT
// send back to front-end
// setup authentication so only the request with JWT can
// access the dashboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const secretString = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("please provide email and passcode");
  }

  const id = new Date().getTime();

  const token = jwt.sign({ username, id }, secretString, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
