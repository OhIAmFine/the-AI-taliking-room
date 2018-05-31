import React, {Component} from 'react';
import io from 'socket.io-client'

import './css/style.css'
import './images/favicon.ico'
// import './css/icon.min.css'



	function synthVoice(text) {
	
	  const synth = window.speechSynthesis
	  const utterance = new SpeechSynthesisUtterance()
	  utterance.lang = 'zh';
	  utterance.text = text
	  synth.speak(utterance)
	}


class Recorder extends Component {
	constructor() {
		super();
        this.socket = io('http://localhost:5000');
		this.recorder = null  // 录音器
		this.recording = false   // 是否正在录音
		this.recognizing = false 
		this.emitMes = this.emitMes.bind(this)
	}
	/**
	 * 设置当前状态
	 * 
	 * @param {any} status 
	 */
	setState (status) {
		if( status === 'recording') {
		    this.recording = true
		    this.recognizing = false
		  } else if( status === 'recognizing') {
		    this.recognizing = true
		  } else {
		    this.recording = false
		    this.recognizing = false
		  }
	}
	componentDidMount() {
		var _this = this;
		this.socket.on('bot reply', function (data) {
		  console.log(data)
		  let replay = data.replay
		  console.log(replay)
		  synthVoice(replay)
		  if (replay === '') replay = '(No answer...)'
		  _this.setState('initialize')
		})
	}
	componentWillMount() {
		this.setState('initialize') // 初始化


		window.URL = window.URL || window.webkitURL;

	  	var H5Recorder = function (stream) {
	    
	    var context = new AudioContext();
	    var audioInput = context.createMediaStreamSource(stream);
	    var recorder = context.createScriptProcessor(4096, 1, 1);

	    var audioData = {
	      size: 0, //录音文件长度
	      buffer: [],  //录音缓存
	      inputSampleRate: context.sampleRate, //输入采样率 默认为 44.1k
	      inputSampleBits: 16, //输入采样数位 8, 16
	      // 百度语音识别: 原始语音的录音格式目前只支持评测 8k/16k 采样率 16bit 位深的单声道语音
	      outputSampleRate: 16000, //输出采样率
	      oututSampleBits: 16,  //输出采样数位 8, 16
	      input: function (data) {
	        this.buffer.push(new Float32Array(data));
	        this.size += data.length;
	      },
	      compress: function () { //合并压缩
	        //合并
	        var data = new Float32Array(this.size);
	        var offset = 0;
	        for (var i = 0; i < this.buffer.length; i++) {
	          data.set(this.buffer[i], offset);
	          offset += this.buffer[i].length;
	        }
	        //压缩
	        var compression = parseInt(this.inputSampleRate / this.outputSampleRate , 10);
	        var length = data.length / compression;
	        var result = new Float32Array(length);
	        var index = 0, j = 0;
	        while (index < length) {
	          result[index] = data[j];
	          j += compression;
	          index++;
	        }
	        return result;
	      },
	      encodeWAV: function () {
	        var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
	        var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
	        var bytes = this.compress();
	        var dataLength = bytes.length * (sampleBits / 8);
	        var buffer = new ArrayBuffer(44 + dataLength);
	        var data = new DataView(buffer);

	        var channelCount = 1;//单声道
	        var offset = 0;

	        var writeString = function (str) {
	          for (var i = 0; i < str.length; i++) {
	            data.setUint8(offset + i, str.charCodeAt(i));
	          }
	        }

	        // 资源交换文件标识符 
	        writeString('RIFF'); offset += 4;
	        // 下个地址开始到文件尾总字节数,即文件大小-8 
	        data.setUint32(offset, 36 + dataLength, true); offset += 4;
	        // WAV文件标志
	        writeString('WAVE'); offset += 4;
	        // 波形格式标志 
	        writeString('fmt '); offset += 4;
	        // 过滤字节,一般为 0x10 = 16 
	        data.setUint32(offset, 16, true); offset += 4;
	        // 格式类别 (PCM形式采样数据) 
	        data.setUint16(offset, 1, true); offset += 2;
	        // 通道数 
	        data.setUint16(offset, channelCount, true); offset += 2;
	        // 采样率,每秒样本数,表示每个通道的播放速度 
	        data.setUint32(offset, sampleRate, true); offset += 4;
	        // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
	        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
	        // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
	        data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
	        // 每样本数据位数 
	        data.setUint16(offset, sampleBits, true); offset += 2;
	        // 数据标识符 
	        writeString('data'); offset += 4;
	        // 采样数据总数,即数据总大小-44 
	        data.setUint32(offset, dataLength, true); offset += 4;
	        // 写入采样数据 
	        if (sampleBits === 8) {
	          for (let i = 0; i < bytes.length; i++ , offset++) {
	            var s = Math.max(-1, Math.min(1, bytes[i]));
	            var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
	            val = parseInt(255 / (65535 / (val + 32768)), 10);
	            data.setInt8(offset, val, true);
	          }
	        } else {
	          for (let i = 0; i < bytes.length; i++ , offset += 2) {
	            let s = Math.max(-1, Math.min(1, bytes[i]));
	            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
	          }
	        }

	        return new Blob([data], { type: 'audio/wav' });
	      }
	    };

	    //开始录音
	    this.start = function () {
	      audioInput.connect(recorder);
	      recorder.connect(context.destination);
	    }

	    //停止
	    this.stop = function () {
	      recorder.disconnect();
	    }

	    //获取音频文件
	    this.getBlob = function () {
	      this.stop();
	      return audioData.encodeWAV();
	    }

	    //回放
	    this.play = function (audio) {
	      audio.src = window.URL.createObjectURL(this.getBlob());
	    }

	    //上传
	    this.upload = function (url, callback) {
	      var fd = new FormData();
	      fd.append("audioData", this.getBlob());
	      var xhr = new XMLHttpRequest();
	      if (callback) {
	        xhr.upload.addEventListener("progress", function (e) {
	          callback('uploading', e);
	        }, false);
	        xhr.addEventListener("load", function (e) {
	          callback('ok', e);
	        }, false);
	        xhr.addEventListener("error", function (e) {
	          callback('error', e);
	        }, false);
	        xhr.addEventListener("abort", function (e) {
	          callback('cancel', e);
	        }, false);
	      }
	      xhr.open("POST", url);
	      xhr.send(fd);
	    }

	    //音频采集
	    recorder.onaudioprocess = function (e) {
	      audioData.input(e.inputBuffer.getChannelData(0));
	      //record(e.inputBuffer.getChannelData(0));
	    }

	  };

	  //获取录音机
	  H5Recorder.init = function (callback) {
	    console.log(navigator.mediaDevices)
	    navigator.mediaDevices.getUserMedia({ audio: true })
	      .then(function (stream) {
	        console.log(stream)
	        var rec = new H5Recorder(stream);
	        callback(rec);
	      })
	      .catch(function (err) {
	        console.error(err)
	      })
	  }

	  window.H5Recorder = H5Recorder;
	}

	// 发送消息
	emitMes() {
		console.log('test')
		var _this = this;
		if (_this.recognizing) {
	   		return
	  	}
	  if (! _this.recording) {
	    window.H5Recorder.init(function (rec) {
	      _this.recorder = rec
	      _this.recorder.start()
	    })
	    console.log('1')
	    _this.setState('recording')
	  } else {
	    console.log(_this.recorder)
	    console.log('2')
	    let buffer = _this.recorder.getBlob()
	    this.socket.emit('chat message', buffer)
	    _this.setState('recognizing')
  }
	}
	render() {
		return (
			<div>
				<section>
				    <h1>简单AI聊天机器人</h1>
				    <h2>- 基于 Web Speech API</h2>
				    <button onClick =  { this.emitMes } ><i className= {this.recording ? 'ion-ios-mic' : 'ion-radio-waves' }></i></button>

				    <div className="chat-box">
				      <p>你说: <em className="output-you">...</em></p>
				      <p>机器人回复: <em className="output-bot">...</em></p>
				    </div>
			  </section>
			</div>
			);
	}
}


export default Recorder;