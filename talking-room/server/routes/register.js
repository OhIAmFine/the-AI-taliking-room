const express = require('express');
const router = express.Router();
const MongoClinet = require('mongodb').Mongoclient;

const url = 'mongodb://localhost:27017';
const dbName = 'talking-room';


/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.send({name:'sam',age: 25});
  console.log(req.body)
 //  	Mongoclient.connect(url, function (err, client) {
	// 	console.log('connect db successfully');
	// 	const db = client.db(dbName);
	// 	// 插入用户
	// });
	res.send(req.body)
});

async function insertUserInfo (db, doc, callback) {
	const collection = db.collection('users');
	const result = await collection.insertOne(doc);
	return result;
}
module.exports = router;
