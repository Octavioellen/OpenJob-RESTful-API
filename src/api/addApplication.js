const { nanoid } = require('nanoid');
const pool = require('../services/postgres');

const addApplication = async (request, response) => {
  try {
    const { jobId } = request.body;

    const userId = request.user.id;

    const id = `application-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO applications
        (id, user_id, job_id)
        VALUES ($1, $2, $3)
      `,
      values: [id, userId, jobId],
    };

    await pool.query(query);

    response.status(201).json({
      status: 'success',
      message: 'Lamaran berhasil dikirim',
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = addApplication;