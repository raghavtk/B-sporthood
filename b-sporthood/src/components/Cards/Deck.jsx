import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Cards from './Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Row } from 'react-bootstrap';
import "./Deck.css";
import Navbar from "../Navbar/Navbar";
import Foot from "../footer/head3.js";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import axios from 'axios';
// const crds = [1,2,4,5,6,7,8,9];
function createCard(detail) {
    return (
      <Cards
        key={detail._id}
        name={detail.name}
        amount={detail.amount}
        location={detail.location}
        address={detail.address}
        img1={detail.img1}
        img2={detail.img2}
      />
    );
}

export default function Deck()
{
    const history = useHistory();
    const [username, setNameid] = useContext(UserNameIdContext);
    const [details, setDetails] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(()=>{
      if(username === '') {
        setDialogOpen(true);
        return;
      }
      axios.get('http://localhost:5000/details')
      .then(res => {
          const det = res.data;
          setDetails(det);
      })
      .catch(err => {
          console.error("Failed to fetch details:", err);
      });
    }, [username]);

    const handleClose = () => {
        setDialogOpen(false);
        history.push('/');
    };

    return (
      <div>
        <Navbar name={username}/>

        <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="auth-dialog-title">
          <DialogTitle id="auth-dialog-title">Authentication Required</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You need to login or sign up before you can view available courts and book them!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push('/login')} color="primary">
              Login
            </Button>
            <Button onClick={() => history.push('/signup')} color="primary" variant="contained">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>

        <Jumbotron className="jumbo">
            <Row>
            {details && details.map(createCard)} 
            </Row>
        </Jumbotron>
        <Foot/>
      </div>
    );
}
