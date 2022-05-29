// const User = require('../models/user');
const { getDbRef } = require('../../lib/mongo');
const COLLECTION_NAME = 'surveys';

const getAllSurveys = async () => {
  try {
    const surveys = await getDbRef()
      .collection(COLLECTION_NAME)
      .find({'reviewed':false})
      .toArray();
    return { surveys };
  } catch (error) {
    return { error };
  }
};

function createSurvey(matchDocument, res){
   getDbRef()
    .collection(COLLECTION_NAME)
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
}

function update(pId, matchDocument, res){
  var ObjectID = require('mongodb').ObjectID; 
  getDbRef()
   .collection(COLLECTION_NAME)
   .updateOne({'_id':ObjectID(pId)},{$set: matchDocument}, function (err) {
     if (err) {
       res.status(400).send("Error updating!");
     } else {
       res.status(204).send("User updated");
     }
   });
}


module.exports = { getAllSurveys, createSurvey, update};
