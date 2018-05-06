  
const express = require('express');
const router = express.Router();
const MongoClinet = require('mongodb').MongoClient;
const crypto = require('crypto');
const md5 = crypto.createHash('md5');


const url = 'mongodb://localhost:27017';
const dbName = 'talking-room';
const collectionName = 'users'


/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  // 对密码进行加密存储
  const user = Object.assign({}, req.body, {
  	password : md5.update(req.body.password).digest('base64')
  });
  console.log(user);
  // 连接数据库
  	MongoClinet.connect(url, async function (err, client) {
		console.log('connect db successfully');
		const db = await client.db(dbName);
		const findResult = await findUser(db, collectionName, {username: user.username, password: user.password})
		console.log(findResult)
		if (findResult >= 1) { 
			res.send({"success" : true, info : "登录成功" });
			console.log("登陆成功");
			// next();
		}else {
			res.send({"success" : false, info : "用户名不存在"});
			console.log("用户名不存在");
			// next();
		}
		client.close();
		console.log('关闭数据库')
	});
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
module.exports = router;
