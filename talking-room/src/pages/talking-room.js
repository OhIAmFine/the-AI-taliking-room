import React, { Component } from 'react';
import '../styles/talking-room.css'

class TalkingRoom extends Component {
	render () {
		return (
			<div className="talking">
			<div className="side-bar">
				<div className="personal-info"></div>
				<div className="search"></div>
				<div className="contact-lists"></div>
			</div>
			<div className="content">
				<div className="contacter-info"></div>
				<div className="talking-content"></div>
				<div className="type-func">
					<div className="record-func"></div>
				</div>
			</div>
		</div>
		);
	}
}

export default TalkingRoom;