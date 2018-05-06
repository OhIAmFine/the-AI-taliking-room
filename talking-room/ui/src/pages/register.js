import React, { Component } from 'react';
import RegisterForm from '../components/form/register-form.js'
import '../styles/login.css';


class Login extends Component {
  render() {
    return (
      <div className="background">
        <div className="login">
          <RegisterForm  />
        </div>
      </div>
    );
  }
}

export default Login;
