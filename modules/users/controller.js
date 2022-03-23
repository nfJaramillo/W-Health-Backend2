//const User = require('../models/user');
const { getDbRef } = require('../../lib/mongo');
const COLLECTION_NAME = 'users';

const getAllUsers = async () => {
  try {
    const users = await getDbRef()
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();
    return { users };
  } catch (error) {
    return { error };
  }
};


async function getUserByEmail(email) {
  try {
    const user = await getDbRef()
      .collection(COLLECTION_NAME)
      .findOne({ email });
    return user;
  } catch (error) {
    return { error };
  }
}

function register(matchDocument, res){
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

module.exports = { getAllUsers, getUserByEmail, register };
