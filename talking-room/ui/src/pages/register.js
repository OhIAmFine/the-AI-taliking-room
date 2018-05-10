import React, { Component } from 'react';
import RegisterForm from '../components/form/register-form.js'
import '../styles/login.css';


class Login extends Component {
  render() {
    return (
      <div className="background">
        <div className="register">
          <RegisterForm  history = { this.props.history } />
        </div>
      </div>
    );
  }
}

export default Login;
