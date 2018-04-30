import React, { Component } from 'react';
import LoginForm from '../components/form/login-form.js'
import '../styles/login.css';


class Login extends Component {
  render() {
    return (
      <div className="background">
        <div className="login">
          <LoginForm  />
        </div>
      </div>
    );
  }
}

export default Login;
