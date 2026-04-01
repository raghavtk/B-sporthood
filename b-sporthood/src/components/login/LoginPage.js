import React, { Component } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { UserNameIdContext } from '../UserNameId/UserNameIdContext';
import NavBar from '../Navbar/Navbar';
import Head3 from '../footer/head3';

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
   
  padding: '5% 10%',
};

const buttonStyle = {
  marginBottom: 0,
  marginTop: '15px'
};

class LoginForm extends Component {
  static contextType = UserNameIdContext;

  state = {
    username: '',
    password: '',
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signin', {
        Username: this.state.username,
        password: this.state.password
      });

      if (res.data.token) {
        localStorage.setItem('jwt', res.data.token);
        
        // Update context with the signed in username
        const [, setUsername] = this.context;
        if (setUsername) setUsername(this.state.username);

        alert('Signed in successfully!');
        window.location.hash = '#/';
      } else {
        alert('Invalid credentials.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid username or password.');
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <NavBar />
        <div style={divStyle}>
            <div className="login-card">
              <form className="LoginForm" id="loginForm" onSubmit={this.handleFormSubmit}>
              <h1>SIGN IN</h1>
              <p className="login-subtitle">Welcome back! Please enter your details.</p>
                <div>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div style={buttonStyle}>
                  <button type="submit">
                    Login
                  </button>
                </div>
                <p style={{marginTop: "20px", textAlign: "center", color: "#666"}}>
                   Don't have an account? <a href="#/signup" style={{color: "#3acbf7", fontWeight: "bold", textDecoration: "none"}}>Sign up</a>
                </p>
              </form>
            </div>
        </div>
        <Head3 />
      </>
    )
  }
}

export default LoginForm;
