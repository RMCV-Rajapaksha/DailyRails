const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Routes for contact us messages
router.post('/', contactController.addContactMessage);
router.get('/', contactController.getContactMessages);
router.delete('/:id', contactController.deleteContactMessage);

module.exports = router;
