const express = require('express')
const router = express.Router();
const transferController = require('./../controllers/transfer.controller')

// Create a new Transfer
router.post('/', transferController.create);

// Get all transfers
router.get('/', transferController.findAll);

// Get a single transfer by id
router.get('/:id', transferController.findOne);

// Update a transfer by id
router.put('/:id', transferController.update);

// Delete a transfer by id
router.delete('/:id', transferController.delete);

module.exports = router;
