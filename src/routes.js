const express = require('express');

const { addUser } = require('./api/users');
const getUsers = require('./api/getUsers');
const loginUser = require('./api/loginUser');

const addJob = require('./api/addJob');
const getJobs = require('./api/getJobs');
const getJobById = require('./api/getJobById');
const updateJob = require('./api/updateJob');
const deleteJob = require('./api/deleteJob');

const addApplication = require('./api/addApplication');
const getMyApplications = require('./api/getMyApplications');

const validate = require('./middleware/validate');
const userSchema = require('./validator/users');

const auth = require('./middleware/auth');

const router = express.Router();

router.post('/users', validate(userSchema), addUser);

router.get('/users', getUsers);

router.post('/login', loginUser);

router.get('/dashboard', auth, (request, response) => {
  response.json({
    status: 'success',
    message: 'Berhasil mengakses dashboard',
    user: request.user,
  });
});

router.post('/jobs', auth, addJob);

router.get('/jobs', getJobs);

router.get('/jobs/:id', getJobById);

router.put('/jobs/:id', auth, updateJob);

router.delete('/jobs/:id', auth, deleteJob);

router.post('/applications', auth, addApplication);

router.get('/profile/applications', auth, getMyApplications);

module.exports = router;