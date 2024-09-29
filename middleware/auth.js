const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const secretString = process.env.JWT_SECRET;

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretString);

    const { id, username } = decoded;

    req.user = { id, username };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
