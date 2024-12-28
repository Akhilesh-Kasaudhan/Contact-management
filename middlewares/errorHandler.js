const { constants } = require("../constant");
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not found",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized access",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.status(statusCode).json({
        title: "Internal server error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      console.log("No error all good!");
      break;
  }

  console.log(error);
};

module.exports = errorHandler;
