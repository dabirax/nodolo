const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorised access to this route");
  }

  //   console.log(req.headers.authorization);
};

module.exports = authenticationMiddleware;
