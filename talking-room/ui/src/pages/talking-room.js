import React, { Component } from 'react';
import { Avatar, Divider, Icon, Button, Input } from 'antd/lib';
import DropdownMenu from '../components/dropdown.js'
import ContactList from '../components/contact-list.js'
import SearchBar from '../components/form/search-bar.js'
import 'antd/lib/avatar/style/css'
import 'antd/lib/divider/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'
import '../styles/talking-room.css'
import '../styles/common.css'

const { TextArea } = Input;

class TalkingRoom extends Component {
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
						<SearchBar />
					</div>
					<Divider />
					<div className="contact-lists">
						<ContactList />
					</div>
				</div>
				<div className="content">
					<div className="contacter-info">
						<p className="blo-center">HNMB <Icon type="down" /></p>
					</div>
					<Divider  className="no-mar-t" />
					<div className="talking-content"></div>
					<Divider  className="no-mar-t no-mar-bot" />
					<div className="type-func">
						<div className="record-func mar-top-10">
							<Icon type="play-circle-o"  className="mar-left-20" style={{ fontSize:26}} />
						</div>
						<TextArea rows={3} className="no-border" />
						<div className="send">
							<Button>发送</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TalkingRoom;