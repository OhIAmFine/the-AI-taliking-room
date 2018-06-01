const express = require('express');
const router = express.Router();
const MongoClinet = require('mongodb').MongoClient;
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
// const uid = require('uid');

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'talking-room';
const COLLECTION_NAME = 'users';


/* POST users listing. */
router.post('/', async function(req, res, next) {
    console.log(req.body);
    // 对密码进行加密存储
    const user = Object.assign({}, req.body);
    // const user = Object.assign({}, req.body, {
    // 	password : md5.update(req.body.password).digest('base64')
    // });
    console.log(user);
    const db = await connectDB(URL, DB_NAME);
    const findResult = await findUser(db, COLLECTION_NAME, {username: user.username})
    console.log(findResult)
  // 连接数据库
	if (findResult.length >= 1) { 
		res.send({"success" : true, info : "登录成功",uid: findResult.uid});
		console.log("登陆成功");
		// next();
	}else {
		res.send({"success" : false, info : "用户名不存在"});
		console.log("用户名不存在");
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
	// console.log('collection', collection)
	const  arr  = await collection.find(query).toArray();
	return {uid: arr[0].uid, length: arr.length};
}

async function connectDB(url, dbName) {
	console.log('ready to connect db');
	const client = await MongoClinet.connect(url);
	const db =   client.db(dbName)
	return db;
}

module.exports = router;
