const validate = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validate;