import React,{ Component } from 'react';
import { Redirect  } from 'react-router-dom';
import { Form, Input, Tooltip, Icon, Checkbox, Button, notification} from 'antd';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/notification/style/css';


const FormItem = Form.Item;

// 消息提醒
const openNotification = (message) => {
  notification.open({
    message: message,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};

// 路由跳转函数
const redirectRouter = (router) => (<Redirect to={{  
  pathname: `/${router}`,  
}}/>)

class RegisterForm extends Component {
  state = {
    confirmDirty: false,
    redirectTalking: false,
    redirectRegister: false
  };
  handleSubmit = (e) => {
    const _this = this;
    console.log('test');
    // console.log(this.props.history)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      console.log(JSON.stringify(values))
      fetch('http://localhost:8000/register', {
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
              // this.location.refresh()
              // setTimeout(() => _this.location.href = _this.location.href, 2000);
            }
          });
    });

  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    // 路由跳转
    if (this.state.redirectRegister) {  
      return redirectRouter("register")  
    }
    if (this.state.redirectTalking) {  
      return redirectRouter("talking")  
    }  
    return (
      <Form onSubmit={this.handleSubmit}>
       <FormItem
          {...formItemLayout}
          label={(
            <span>
              Username&nbsp;
              <Tooltip title="your name to login">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <Checkbox style={{ marginLeft : '100px' }}>I have read the <a href="">agreement</a></Checkbox>
        <FormItem {...tailFormItemLayout} style={{ marginTop: '-20px'}}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegisterForm);

export default WrappedRegistrationForm;

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);