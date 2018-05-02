import React, {Component} from 'react';
import SocketIo from 'socket.io'

import './css/style.css'
import './images/favicon.ico'
// import './css/icon.min.css'

class Recorder extends Component {
	render() {
		return (
			<div>
			 <section>
    <h1>简单AI聊天机器人</h1>
    <h2>- 基于 Web Speech API</h2>
    <button><i class="ion-load-d"></i></button>

    <div class="chat-box">
      <p>你说: <em class="output-you">...</em></p>
      <p>机器人回复: <em class="output-bot">...</em></p>
    </div>
  </section>
</div>
			);
	}
}

// const Recorder = (
		
// 	)



export default Recorder;