import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd/lib';
// import fetch from 'whatwg-fetch';
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(fetch)
    fetch('http://localhost:8000/users').then((res) => {
      return res.json();
    }).then((res) => {
      console.log(res)
    })
    // const result = fetch('http://localhost:8000/users');
    // console.log(result)
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

const LoginForm = Form.create()(NormalLoginForm);


export default LoginForm;