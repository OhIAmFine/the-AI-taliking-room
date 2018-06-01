const express = require('express');
const router = express.Router();
const MongoClinet = require('mongodb').MongoClient;
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
const uid = require('uid')

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'talking-room';
const COLLECTION_NAME = 'users';


/* POST users listing. */
router.post('/', async function(req, res, next) {
	console.log(req.body);
	// 对密码进行加密存储
	// const user = Object.assign({}, req.body, {
	// 	password : md5.update(req.body.password).digest('base64')
	// });
	const user = Object.assign({}, req.body, {
		uid: uid(10)
	});
	console.log(user);
	// 连接数据库
    const db = await connectDB(URL, DB_NAME);
    const findResult = await findUser(db, COLLECTION_NAME, {username: user.username, password: user.password})
	if (findResult > 1) { 
		res.send({"success" : false, info : "您已经注册过了" });
		console.log("您已经注册过了");
		// next();
	}else {
		const inseltResult = await insertUserInfo(db, COLLECTION_NAME, user);
		console.log(inseltResult);
		// 插入用户
		res.send({"success" : true, info : "注册成功", id : user.uid});
		console.log("注册成功");
		// next();
	}
});


// 插入user方法
async function insertUserInfo (db, collectionName, doc) {
	const collection = db.collection(collectionName);
	const { result } = await collection.insertOne(doc);
	return result;
}

// 查询用户方法
async function findUser (db, collectionName,query) {
	const collection = db.collection(collectionName);
	const  result  = await collection.find(query).count()
	return result;
}

async function connectDB(url, dbName) {
	console.log('ready to connect db');
	const client = await MongoClinet.connect(url);
	const db =   client.db(dbName)
	return db;
}
module.exports = router;
