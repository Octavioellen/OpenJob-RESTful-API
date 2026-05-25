const errorHandler = (error, request, response, next) => {
  response.status(500).json({
    status: 'error',
    message: error.message,
  });
};

module.exports = errorHandler;