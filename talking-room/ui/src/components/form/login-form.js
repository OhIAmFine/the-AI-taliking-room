import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd/lib';
// import fetch from 'whatwg-fetch';
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/notification/style/css'

const FormItem = Form.Item;


// 消息提醒
const openNotification = (message) => {
  notification.open({
    message: message,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};


class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    const _this = this;
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
       // 获取数据
    fetch('http://localhost:8000/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)}).then((res) => {
            return res.json();
          }).then((res) => {
            // 返回响应成功 注册成功
            if (res.success) { 
              console.log(res)
              openNotification(res.info + '将自动跳转');
              setTimeout(() => _this.props.history.push('/talking'), 2000);
            }else {
              openNotification(res.info);
              setTimeout(() => _this.props.history.push('/register'), 2000);
            }
          });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
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