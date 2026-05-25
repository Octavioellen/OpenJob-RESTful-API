const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('../services/database');

const addUser = async (request, h) => {
  const { fullname, email, password } = request.payload;

  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = {
    text: `
      INSERT INTO users(id, fullname, email, password)
      VALUES($1, $2, $3, $4)
      RETURNING id
    `,
    values: [id, fullname, email, hashedPassword],
  };

  const result = await pool.query(query);

  return h.response({
    status: 'success',
    data: {
      userId: result.rows[0].id,
    },
  }).code(201);
};

module.exports = { addUser };