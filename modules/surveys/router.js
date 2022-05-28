var express = require('express');
var router = express.Router();
const { getAllSurveys, createSurvey } = require('./controller');
const bcrypt = require ('bcrypt');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const surveys = await getAllSurveys();
  res.json(surveys);
});

/**
 * POST create user
 */
 router.post('/', async function (req, res) {
  createSurvey(req.body, res);
});



module.exports = router;
