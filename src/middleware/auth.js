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

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
    );

    request.user = decoded;

    next();
  } catch (error) {

    return response.status(401).json({
      status: 'fail',
      message: 'Token tidak valid',
    });
  }
};

module.exports = auth;