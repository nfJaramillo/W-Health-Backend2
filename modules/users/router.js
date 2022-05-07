var express = require('express');
var router = express.Router();
const { getAllUsers, register, getUserByEmail, update, getAllUsersByCorporation, updateSurveys, updateActiveBreak, updatePersonalizedExcercise, updateEHealthSurvey } = require('./controller');
const bcrypt = require ('bcrypt');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await getAllUsers();
  res.json(users);
});

/* GET user. */
router.get('/auth/:email/:psw', async function (req, res, next) {
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

/* GET users on corporation. */
router.get('/corpo/:corpo', async function (req, res, next) {
  var users = {}
  users = await getAllUsersByCorporation(req.params.corpo);



    res.json(users);

  
});

/* GET users on email. */
router.get('/email/:email', async function (req, res, next) {
  var users = {}
  console.log(req.params.email)
  users = await getUserByEmail(req.params.email);
  console.log(users)
  

  if(users == undefined){
    res.json();

  }
  else{
    res.json(users);

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
      isSupervisor: req.body.isSupervisor,
      lastSurvey: req.body.lastSurvey,
      lastActiveBreak: new Date(Date.now()).toISOString(),
      lastP_Exercise: req.body.lastP_Exercise,
      lastE_Survey: req.body.lastE_Survey,
      profilePic: "https://t3.ftcdn.net/jpg/02/36/48/86/360_F_236488644_opXVvD367vGJTM2I7xTlsHB58DVbmtxR.jpg"
    };
    register(matchDocument, res);
  });
});

/**
 * PUT update 1 user by email
 */
 router.put('/:email', async function (req, res) {
  var matchDocument = {}

  if(req.body.name != undefined) matchDocument.name = req.body.name
  if(req.body.password != undefined) matchDocument.password= req.body.password
  if(req.body.lastSurvey != undefined) matchDocument.lastSurvey= req.body.lastSurvey
  if(req.body.lastActiveBreak != undefined) matchDocument.lastActiveBreak= req.body.lastActiveBreak
  if(req.body.lastP_Exercise != undefined) matchDocument.lastP_Exercise= req.body.lastP_Exercise
  if(req.body.lastE_Survey != undefined) matchDocument.lastE_Survey= req.body.lastE_Survey
  if(req.body.lastE_Survey != undefined) matchDocument.lastE_Survey= req.body.lastE_Survey
  console.log(matchDocument.lastSurvey)
  update(req.params.email, matchDocument, res);
});

/* Update supervisor check survey ammount */
router.post('/lastSurvey/:email', async function (req, res, next) {
  const users = await updateSurveys(req.params.email, res);
});

/* Update employee active break count */
router.post('/lastActiveBreak/:email', async function (req, res, next) {
  const users = await updateActiveBreak(req.params.email, res);
});

/* Update employee presonalized excercise count */
router.post('/lastP_Exercise/:email', async function (req, res, next) {
  const users = await updatePersonalizedExcercise(req.params.email, res);
});

/* Update employee health survey count */
router.post('/lastE_Survey/:email', async function (req, res, next) {
  const users = await updateEHealthSurvey(req.params.email, res);
});




module.exports = router;
