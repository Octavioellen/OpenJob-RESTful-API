const pool = require('../services/postgres');

const updateJob = async (request, response) => {
  try {
    const { id } = request.params;

    const {
      title,
      company,
      location,
      description,
    } = request.body;

    const query = {
      text: `
        UPDATE jobs
        SET
          title = $1,
          company = $2,
          location = $3,
          description = $4
        WHERE id = $5
        RETURNING *
      `,
      values: [title, company, location, description, id],
    };

    const result = await pool.query(query);

    response.json({
      status: 'success',
      message: 'Lowongan berhasil diperbarui',
      data: {
        job: result.rows[0],
      },
    });
  } catch (error) {

    response.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = updateJob;