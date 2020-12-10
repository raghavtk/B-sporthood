import React from 'react';
import LoginForm from './index.js';
import Nbar from '../Nbar/Nbar'
import './LoginPage.css';
import Head3 from '../footer/head3'

function LoginPage()
{
  
    return (
      <>
      
      <Nbar/>
      <div className="LoginPage">
        
        <LoginForm />
        
      </div>
      <Head3 />
      </>
    );
  
}

export default LoginPage;