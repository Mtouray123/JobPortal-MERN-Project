const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/api/jobController');

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a specific job by ID
router.get('/:id', jobController.getJobById);

// Create a new job
router.post('/orders/jobs', jobController.createJob);

// Update an existing job
router.put('/orders/jobs', jobController.updateJob);

// Delete a job by ID
router.delete('/jobs', jobController.deleteJob);

module.exports = router;