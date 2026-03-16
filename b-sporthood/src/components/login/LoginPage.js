import React, { Component } from 'react';
import './LoginPage.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100,
};

const buttonStyle = {
  marginBottom: 0,
};

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const raw = localStorage.getItem('bSporthoodUser');
    if (!raw) {
      alert('No user found. Please sign up first.');
      window.location.hash = '#/signup';
      return;
    }

    try {
      const user = JSON.parse(raw);
      const isMatch = user.email === this.state.email && user.password === this.state.password;

      if (!isMatch) {
        alert('Invalid email or password.');
        return;
      }

      localStorage.setItem('bSporthoodSession', JSON.stringify({
        isLoggedIn: true,
        email: user.email,
        username: user.username,
      }));

      alert(`Welcome back, ${user.firstName || user.username}!`);
      window.location.hash = '#/';
    } catch (err) {
      alert('Stored user data is invalid. Please sign up again.');
      localStorage.removeItem('bSporthoodUser');
      window.location.hash = '#/signup';
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={divStyle}>
          <form className="LoginForm" id="loginForm" onSubmit={this.handleFormSubmit}>
          <h1>   SIGN IN   </h1>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={this.state.email}
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
          </form>
      </div>
    )
  }
}

export default LoginForm;
