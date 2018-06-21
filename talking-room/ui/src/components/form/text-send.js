import Reat, {Component} from 'react';
import {TextArea, Button} from 'ant/lib';
import 'antd/lib/textArea/style/css';
import 'antd/lib/button/style/css';

class TextSend extends Component {
	constructor() {
		super()
	}
	render() {
		return (<div>
			<TextArea rows={4} className="no-border" />
			<div className="send"><Button>发送</Button></div>
			</div>);
	}
}
export default TextSend;