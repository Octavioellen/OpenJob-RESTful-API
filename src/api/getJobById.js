const pool = require('../services/postgres');

const getJobById = async (request, response) => {
  try {
    const { id } = request.params;

    const query = {
      text: 'SELECT * FROM jobs WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      return response.status(404).json({
        status: 'fail',
        message: 'Lowongan tidak ditemukan',
      });
    }

    response.json({
      status: 'success',
      data: {
        job: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = getJobById;