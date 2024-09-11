const express = require('express');
const initialData = require('../../Controllers/AdminController/initialData');
const router = express.Router();

router.get('/initialdata',initialData.initialData);

module.exports = router;