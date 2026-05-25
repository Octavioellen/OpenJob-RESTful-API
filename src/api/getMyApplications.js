const pool = require('../services/postgres');

const getMyApplications = async (request, response) => {
  try {
    const userId = request.user.id;

    const query = {
      text: `
        SELECT
          applications.id,
          jobs.title,
          applications.status
        FROM applications
        JOIN jobs ON jobs.id = applications.job_id
        WHERE applications.user_id = $1
      `,
      values: [userId],
    };

    const result = await pool.query(query);

    response.json({
      status: 'success',
      data: result.rows,
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = getMyApplications;