const { nanoid } = require('nanoid');
const pool = require('../services/postgres');

const addJob = async (request, response) => {
  try {

    const { title, company, location, description } = request.body;

    const userId = request.user.id;

    const id = `job-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO jobs
        (id, title, company, location, description, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
      values: [
        id,
        title,
        company,
        location,
        description,
        userId,
      ],
    };

    const result = await pool.query(query);

    return response.status(201).json({
      status: 'success',
      message: 'Lowongan berhasil ditambahkan',
      data: {
        jobId: result.rows[0].id,
      },
    });
  } catch (error) {

    return response.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = addJob;