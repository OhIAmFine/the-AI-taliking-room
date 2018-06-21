import React, { Component } from 'react';
import { Avatar, Divider, Icon, Button, Input, Switch} from 'antd/lib';
import DropdownMenu from '../components/dropdown.js'
import ContactList from '../components/contact-list.js'
// import TextSend from '../components/form/text-send.js'
import Recorder from './recorder.js'
// import SearchBar from '../components/form/search-bar.js'
import 'antd/lib/avatar/style/css'
import 'antd/lib/divider/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/switch/style/css'
import '../styles/talking-room.css'
import '../styles/common.css'

const { TextArea } = Input;

class TalkingRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			talker: '',
			checked: false,
			robot: [],
			levi:[],
			vikon:[],
			kedong:[],
			text:" ",
			content:[]
		}
	}
	changeTalker(talker) {
		console.log(talker);
		this.setState({talker: talker})
		// this.talker = talker;
	}
	beginRecorder(e) {
		alert("begin")
	}
	switchBar(checked) {
		this.setState({
			checked: checked
		})
		// this.checked = checked;
		console.log(`this is ${checked}`);
	}
	addContent(content, position) {
		console.log("--------------");
		console.log(content, position);
		const talker = this.state.talker.toString();
		console.log("talker", talker)
		const arr  = this.state[talker];
		arr.push({"content": content, "position": position})
		console.log(arr)
		if (talker === 'robot') {
			this.setState({
				robot: arr
			});	
		};
		if (talker === 'levi') {
			this.setState({
				levi: arr
			});	
		};
		if (talker === 'vikon') {
			this.setState({
				vikon: arr
			});	
		};
		if (talker === 'kedong') {
			this.setState({
				kedong: arr
			});	
		};
		this.changeContent(talker)
	}
	textValue(e) {
		console.log(e.currentTarget.value)
		this.setState({
			text: e.currentTarget.value
		})
	}
	sendText(e) {
		console.log("+++++++++++++")
		this.addContent(this.state.text, "fl-right")
	}
	changeContent(talker) {
		const content = this.state[talker];
		console.log('111111111111111')
		console.log(content)
		this.setState({
			content: content
		})
	}
	render () {
		return (
			<div className="talking">
				<div className="side-bar">
					<div className="personal-info">
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="head" />
						<strong>HNMB</strong>
						<div className="fl-right">
							<DropdownMenu  />
						</div>
					</div>
					<div className="mar-top-10">
					</div>
					<Divider />
					<div className="contact-lists">
						<ContactList changeTalker = {(talker) => this.changeTalker(talker)} changeContent={(talker)=>this.changeContent(talker)} />
					</div>
				</div>
				<div className="content">
					<div className="contacter-info">
						<p className="blo-center">{this.state.talker} <Icon type="down" /></p>
					</div>
					<Divider  className="no-mar-t" />
					<div className="talking-content">
					{this.state.content.map((item, index) => (
						<div className={`taklking-spin `} key={index}><div className={item.position}> {item.content}</div></div>
						))}
					</div>
					<Divider  className="no-mar-t no-mar-bot" />
					<div className="type-func">
						<div className="record-func mar-top-10" >
						<Switch checkedChildren="开启录音" unCheckedChildren="关闭录音" onChange={(checked) => this.switchBar(checked)} />
						</div>
						{this.state.checked ? <Recorder  className="mar-left-20" style={{ fontSize:26}} 
							onClick = {(e) => this.beginRecorder(e)}  addContent= {(content, position) => this.addContent(content, position)} /> : <div><TextArea rows={4} className="no-border" onChange={(e) => this.textValue(e)} /><div className="send" ><Button onClick={(e)=> this.sendText(e)}>发送</Button></div></div>}
					</div>
				</div>
			</div>
		);
	}
}

export default TalkingRoom;