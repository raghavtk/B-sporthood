import React, { Component } from 'react';
import LoginForm from './index.js';
import Navbar from '../Navbar/Navbar'
import './LoginPage.css';
import Head3 from '../footer/head3'

class LoginPage extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <div className="LoginPage">
        
        <LoginForm />
        
      </div>
      <Head3 />
      </>
    );
  }
}

export default LoginPage;