const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        status: 'fail',
        message: 'Token tidak ditemukan',
      });
    }

    const token = authHeader.split(' ')[1];

    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return response.status(401).json({
      status: 'fail',
      message: 'Token tidak valid',
    });
  }
};

module.exports = auth;