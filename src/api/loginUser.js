const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../services/postgres');

const loginUser = async (request, response) => {
  try {

    const { email, password } = request.body;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      return response.status(401).json({
        status: 'fail',
        message: 'Email atau password salah',
      });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return response.status(401).json({
        status: 'fail',
        message: 'Email atau password salah',
      });
    }
 
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: '3h',
      },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
    );

    response.json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {

    response.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = loginUser;