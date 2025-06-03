const { CustomAPIError } = require("../error/customErrors");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(500).json({ msg: 'Something fishy is going on' });
};
module.exports = errorHandler;
