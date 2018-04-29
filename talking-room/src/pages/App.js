import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd/lib';
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
// import 'antd/lib/form/style/css'

// import ReactDOM from 'react-dom';
import '../styles/App.css';


const FormItem = Form.Item;





class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </FormItem>
        <div className="up">
          <a className="login-form-forgot" href="">Forgot password</a>
          Or <a href="">register now!</a>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);


class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="login">
        <WrappedNormalLoginForm  />
      </div>
      </div>
    );
  }
}

export default App;
