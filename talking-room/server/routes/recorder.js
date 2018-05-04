var express = require('express');
var router = express.Router();
// var app = require('express')();
// var server = require('http').createServer(app);
var http = require('http');
var io = require('socket.io')(http);

const SendChat = require('../tuling-ai') // 图灵机器人回复
const AipSpeech = require('../baidu-ai').speech  // 百度语音识别
// const io = require('socket.io');

// 设置APPID/AK/SK
const APP_ID = '10726572'
const API_KEY = 'sQNjQQKZiDzMbkUt2jqR18Ao'
const SECRET_KEY = 'Ag0lZ5jD9jhAF5BDT5g8l7oi74aG6xn4'
const client = new AipSpeech(APP_ID, API_KEY, SECRET_KEY)

router.get('/' ,function(req, res){ 
	res.send('get')
})


io.on('connection', (socket) => {
  console.log('a user connected')
})

io.on('chat message', (socket) => {
  const voiceBuffer = socket.data
  // 识别本地文件，附带参数
  client.recognize(voiceBuffer, 'wav', 16000, { lan: 'zh' })
    .then(function (res) {
      console.log('This is what you say')
      console.log(res)
      if (res.err_no === 0) {
        let text = res.result[0]
        SendChat(text)
          .then((res) => {
            console.log('--------------------->')
            console.log('This is return message')
            console.log(res.text)
            console.log(res)
            io.broadcast('bot reply', { say: text, replay: res.text })
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        console.error("err")
        console.log('This is something wrong with what you say')
      }

    })
    .catch(function (err) {
      console.error(err)
    })

})

// server.listen(3001);

module.exports = router;
