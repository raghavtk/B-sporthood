import {
    Box,
    Button,
    Card,
    createStyles,
    makeStyles,
    Typography,
    TextField,
  } from '@material-ui/core';
  import React from 'react';
  import NavBar from '../Navbar/Navbar'
  import Head3 from '../footer/head3'
  
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        backgroundColor: '#caedf0',
        padding: '5% 10%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      card: {
        boxShadow: '-1px 2px 20px rgba(0, 0, 0, 0.15)',
        borderRadius: theme.spacing(1),
        background: 'rgb(5,17,23)',
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      },
      button: {
        background: '#3acbf7',
        borderRadius: theme.spacing(0.5),
        width: '100%',
        height: theme.spacing(7),
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2),
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        '&:hover': {
           background: '#1b8eb3',
        }
      },
      imageContainer: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        background: theme.palette.primary.light,
        borderRadius: theme.spacing(4),
      },
  
      title: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: theme.spacing(4),
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
        color: '#ffffff',
      },
      subtitle: {
        color: '#e2e8f0',
        marginBottom: theme.spacing(4),
        fontSize: theme.spacing(2),
        textAlign: 'center',
      },
      input: {
        boxSizing: 'border-box',
        marginBottom: '20px',
        width: '100%',
        minHeight: theme.spacing(7),
        outline: 'none',
        fontSize: theme.spacing(2),
        fontFamily: 'Poppins, sans-serif',
        paddingLeft: theme.spacing(3),
        paddingTop: '10px',
        paddingBottom: '10px',
        color: '#ffffff',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
        '& .MuiInputBase-input': {
          color: '#ffffff',
        },
        '& .MuiInputLabel-root': {
          color: '#e2e8f0',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        }
      },
      footerText: {
        color: theme.palette.text.secondary,
        fontSize: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '62%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
  );
  
  const SignUpForm = (props) => {
    const classes = useStyles(props);
    const [labelE, setLableE] = React.useState('');
    const [errorE, setErrorE] = React.useState(false);
    const [errorP, setErrorP] = React.useState(false);
    const [labelP, setLableP] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const userFormList = ['First Name', 'Last Name', 'Username'];
    const userFormHooks = [setFirstName, setLastName, setUserName];
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
    );
  
    const passwordStrengthHandler = (event)=> {
      if (strongRegex.test(event.target.value)) {
        setErrorP(false);
        setLableP('Strong');
        setPassword(event.target.value);
      } else if (mediumRegex.test(event.target.value)) {
        setErrorP(false);
        setLableP('Medium');
        setPassword(event.target.value);
      } else {
        setErrorP(true);
        setLableP('Weak');
      }
    };
    const emailver = (emailId) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(emailId)) {
        setErrorE(false);
        setLableE('');
        return 1;
      }
  
      setErrorE(true);
      setLableE(' Not valid');
      return 0;
    };
    const triggerSignup = async () => {
      if (emailver(email) === 0) {
        alert('Email id is not valid! Please enter a valid email id');
      } else if (labelP === 'Weak' || labelP === '') {
        alert('Password is weak! Please enter a strong or medium strength password');
      } else if (password !== passwordConfirm) {
        alert("Password does'nt match ");
      } else {
        try {
          const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Firstname: firstName,
              Lastname: lastName,
              Username: userName,
              email: email,
              password: password
            })
          });
          const data = await response.json();
          if (data === "success") {
            alert('Signup successful! Please login with your new credentials.');
            window.location.hash = '#/login';
          } else if (data === "Uerror") {
            alert('Username already exists. Please choose another.');
          } else {
            alert(data.error || 'Failed to sign up.');
          }
        } catch (err) {
          alert('Error signing up. Please ensure the backend is running.');
        }
      }
    };
  
    const LoginForm = () => {
      return (
        <>
          <Typography variant="h2" className={classes.title}>
            SIGN UP
          </Typography>
          <Typography variant="h2" className={classes.subtitle}>
            Please fill this form to create a new account
          </Typography>
          {userFormList.map((ele, index) => {
            return (
              <TextField
                key={index}
                type="text"
                placeholder={ele}
                onChange={(e)=> {
                  userFormHooks[index](e.target.value);
                }}
                variant="outlined"
                className={classes.input}
                required
              />
            );
          })}
  
          <TextField
            label={labelE}
            error={errorE}
            name="email"
            type="email"
            placeholder="Email"
            className={classes.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
          />
          <TextField
            label={labelP}
            error={errorP}
            name="password"
            type="password"
            placeholder="Password"
            className={classes.input}
            onChange={passwordStrengthHandler}
            variant="outlined"
          />
          <TextField
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            className={classes.input}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={triggerSignup}>
            SUBMIT
          </Button>
        </>
      );
    };
  
    return (
    <>
      <NavBar/>
      <Box className={classes.root}>
        <Card className={classes.card}>{LoginForm()}</Card>
      </Box>
      <Head3 />
    </>  
    );
  };
  export default SignUpForm;
