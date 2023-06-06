const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/api/jobController');

// Get all jobs
router.get('/', jobController.getAllJobs);

// Get a specific job by ID
router.get('/:id', jobController.getJobById);

// Create a new job
router.post('/', jobController.createJob);

// Update an existing job
router.put('/:id', jobController.updateJob);

// Delete a job by ID
router.delete('/:id', jobController.deleteJob);

module.exports = router;