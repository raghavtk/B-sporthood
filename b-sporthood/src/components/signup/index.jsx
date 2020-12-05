import {
    Box,
    Button,
    Card,
    createStyles,
    makeStyles,
    Theme,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
  } from '@material-ui/core';
  import React from 'react';
  import NavBar from '../Navbar/Navbar'
  import Head3 from '../footer/head3'
  
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.primary.light,
        padding: '10%',
        height: '80%',
      },
      card: {
        boxShadow: '-1px 2px 20px rgba(0, 0, 0, 0.15)',
        borderRadius: theme.spacing(1),
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      button: {
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.dark} 103.81%)`,
        borderRadius: theme.spacing(0.5),
        width: '20%',
        height: theme.spacing(7),
        marginBottom: theme.spacing(22),
        marginTop: theme.spacing(4),
      },
      imageContainer: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        background: theme.palette.primary.light,
        borderRadius: theme.spacing(4),
      },
  
      title: {
        fontFamily: 'BrandonTextWeb-Bold',
        fontSize: theme.spacing(4),
        marginBottom: theme.spacing(7),
        marginTop: theme.spacing(3),
      },
      subtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(4),
        fontSize: theme.spacing(2),
      },
      input: {
        boxSizing: 'border-box',
        marginBottom: '20px',
        width: '70%',
        height: theme.spacing(7),
        outline: 'none',
        fontSize: theme.spacing(2),
        fontFamily: 'BrandonTextWeb-Regular',
        paddingLeft: theme.spacing(3),
        paddingTop: '10px',
        paddingBottom: '10px',
        letterSpacing: '0.04em',
        color: theme.palette.text.primary,
        borderRadius: '4px',
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
  
  // Change props to userFormProps
  const SignUpForm = (props) => {
    const classes = useStyles(props);
    const [labelE, setLableE] = React.useState('');
    const [errorE, setErrorE] = React.useState(false);
    const [errorP, setErrorP] = React.useState(false);
    const [labelP, setLableP] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [profilePicUrl, setProfilePicUrl] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [name, setName] = React.useState('');
    const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);
    const userFormList = ['FirstName', 'LastName', 'UserName'];
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
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        const data = {
          
          user: {
            firstName: 'suhas',
            lastName: 'pai',
            email: 'suhas@gmail.com',
            password: 'abc123',
            profilePicUrl: 'dfsd',
            username: 'Sp757',
          },
        };
        
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
          <Typography variant="h2" className={classes.subtitle}>
            User Details
          </Typography>
          {userFormList.map((ele, index) => {
            const func = `set${ele}`;
            return (
              <TextField
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
            placeholder="email"
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
  