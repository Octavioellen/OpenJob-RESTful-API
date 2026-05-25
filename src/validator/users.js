const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');
const pool = require('../services/postgres');

const addUser = async (request, response, next) => {
  try {
    const { fullname, email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = `user-${randomUUID()}`;

    const query = {
      text: `
        INSERT INTO users(id, fullname, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id
      `,
      values: [id, fullname, email, hashedPassword],
    };

    await pool.query(query);

    response.status(201).json({
      status: 'success',
      message: 'User berhasil ditambahkan',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser };