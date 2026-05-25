const pool = require('../services/postgres');

const getJobs = async (request, response) => {
  try {
    const result = await pool.query('SELECT * FROM jobs');

    response.status(200).json({
      status: 'success',
      data: {
        jobs: result.rows,
      },
    });
  } catch (error) {

    response.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = getJobs;