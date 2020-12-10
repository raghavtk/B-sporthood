import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { createStyles, makeStyles} from '@material-ui/core';
import M1 from 'materialize-css'
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
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

function LoginForm()
{
 
  const history=useHistory();
  

  //console.log("hi")
  const [Username, setUsername] =useState('');
  const [password, setPassword] = useState('');
  const [username, setNameid] = useContext(UserNameIdContext);
  const PostData=()=>{

   // console.log(email,password)
    fetch("http://localhost:5000/signin",

    {

      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      
      body:JSON.stringify(
       {
         
         Username:Username,
         password:password

         
       }
      


      )
    }
   
    
    ).then(res=>res.json())
    .then(data=>{
      if(data.error) {
      console.log(data.error)
      alert(data.error)
        M1.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        console.log("Logid in")
        setNameid(Username);
        history.push('/');
        //alert("saved")
        
        //console.log(data)
        
     
       
        //history.push('/about')
      }
    }).catch(err=>console.log(err))
 
  }
    return (
      <div style={divStyle}>
          <Form horizontal className="LoginForm" id="loginForm">
          <h1>   SIGN IN   </h1>
            <FormGroup controlId="formEmail">
              <FormControl  onChange={(e)=>setUsername(e.target.value)}    type="Username" placeholder="User Name" />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button bsStyle="primary"  onClick={()=>{PostData()}}  >
                Login
              </Button>
            </FormGroup>
          </Form>
        
      </div>
    )
  
}

export default LoginForm;