var express = require('express');
var router = express.Router();
const { getAllSurveys, createSurvey, update } = require('./controller');
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

/**
 * PUT update 1 survey by email
 */
 router.put('/:email', async function (req, res) {

  update(req.params.email, req.body, res);
});

module.exports = router;
