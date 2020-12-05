import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Box, createStyles, makeStyles} from '@material-ui/core';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: -100
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '90%',
      width:'100%',
      align:"center"
    }
  }),
);

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  width: 300,
  
};

const buttonStyle = {
  marginBottom: 0,
  
};

class LoginForm extends Component {

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("FORM SUBMIT!");
  }

  render() {
    return (
      <div style={divStyle}>
          <Form horizontal className="LoginForm" id="loginForm">
          <h1>   SIGN IN   </h1>
            <FormGroup controlId="formEmail">
              <FormControl type="email" placeholder="Email Address" />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
            </FormGroup>
          </Form>
        
      </div>
    )
  }
}

export default LoginForm;