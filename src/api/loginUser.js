const pool = require('../services/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
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

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return response.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = loginUser;