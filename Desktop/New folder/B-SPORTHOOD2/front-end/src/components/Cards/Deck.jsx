import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Cards from './Cards'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Row } from 'react-bootstrap';
import "./Deck.css";
import Nbar from "../Nbar/Nbar.jsx";
import Foot from "../footer/head3.js";

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

function Deck()
{
    const history = useHistory();
    const [username, setNameid] = useContext(UserNameIdContext);
    if(username === '')
    {
      history.push('/');
    }
    const [details, setDetails] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:5000/details')
      .then(res => {
          const det = res.data;
          setDetails(det);
      });
    }, []);
    
    return (
      <div>
        <Nbar name={username}/>
        <Jumbotron className="jumbo">
            <Row>
            {details.map(createCard)} 
            </Row>
        </Jumbotron>
        <Foot/>
      </div>

    );
  
    
}
export default Deck;