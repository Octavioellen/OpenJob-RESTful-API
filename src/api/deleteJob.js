const pool = require('../services/postgres');

const deleteJob = async (request, response) => {
  try {
    const { id } = request.params;

    await pool.query({
      text: 'DELETE FROM jobs WHERE id = $1',
      values: [id],
    });

    response.json({
      status: 'success',
      message: 'Lowongan berhasil dihapus',
    });
  } catch (error) {
    console.log(error);

    response.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    });
  }
};

module.exports = deleteJob;