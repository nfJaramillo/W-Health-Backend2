var express = require('express');
var router = express.Router();
const { getAllUsers, register, getUserByEmail } = require('./controller');
const bcrypt = require ('bcrypt');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await getAllUsers();
  res.json(users);
});

/* GET user. */
router.get('/:email/:psw', async function (req, res, next) {
  const users = await getUserByEmail(req.params.email);

  if(users == null)
  {
    res.json();
  }
  else{
    bcrypt.compare(req.params.psw, users.password, function(err, result) {
      if (result) {
        res.json(users);
      }
      else {
        res.json();
      }
    });
  }
});

/**
 * POST create user
 */
 router.post('/', async function (req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const matchDocument = {
      name: req.body.name,
      email: req.body.email,
      password : hash,
      coorporation: req.body.corporation,
      isSupervisor: req.body.isSupervisor
    };
    register(matchDocument, res);
  });
});

module.exports = router;
