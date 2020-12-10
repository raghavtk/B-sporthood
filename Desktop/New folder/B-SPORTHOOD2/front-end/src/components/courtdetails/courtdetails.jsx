import React, {useContext} from 'react';

import Nbar from "../Nbar/Nbar.jsx";
import Foot from "../footer/head3.js";
import Slideshow from '../slideshow/slidshow.jsx';
import { Button, Card } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import {useHistory} from 'react-router-dom';

function Courtdetails(props)
{
    const location = useLocation();
    const [username, setNameid] = useContext(UserNameIdContext);
    const history = useHistory();
    function submit(courtname)
    {
        const time = new Date();
        console.log(username, courtname, time);
        axios.post('http://localhost:5000/book', {username, courtname, time})
          .then((res)=>{
            console.log("the result data")
            console.log(res.data);
            console.log(location.state.amount);
            const success = res.data.ok;
            history.push({pathname:'/payment', state: {success, amount: location.state.amount}});
        });
   
    }

    return (
      <div>
      <Nbar name={username}/>
      <div>
      <Slideshow img1={location.state.img1} img2={location.state.img2}/>
      </div>
      <div style={{marginTop:'30px'}}> 
      <Card border="dark" style={{ width: '100%'}}>
      <Card.Header style={{backgroundColor:'#051117', color:'rgb(153, 234, 245)', fontSize:'30px'}}>Location</Card.Header>
      <Card.Body >
      <Card.Title>{location.state.name}</Card.Title>
      <Card.Text>
      {location.state.addr}
      </Card.Text>
      </Card.Body>
      </Card>
      </div>
      <div style={{marginTop:'30px'}}> 
      <Card border="dark" style={{ width: '100%'}}>
      <Card.Header style={{backgroundColor:'#051117', color:'rgb(153, 234, 245)', fontSize:'30px'}}>Important</Card.Header>
      <Card.Body >
      <Card.Text>
       -Non-Marking shoes are compulsory<br/>
       -Playing Barefoot not allowed<br/>
       -No eating, smoking and screaming in court<br/>
       -Fresh Mineral water will be provided<br/>
      </Card.Text>
      </Card.Body>
      </Card>
      </div>
      <div style={{marginTop:'30px', marginBottom: "10px"}}> 
      <Card border="dark" style={{ width: '100%'}}>
      <Card.Header style={{backgroundColor:'#051117', color:'rgb(153, 234, 245)', fontSize:'30px'}}>Available Equipments for rent</Card.Header>
      <Card.Body >
      <Card.Text>
       -Racquet<br/>
       -Shuttle(Feather and Synthetic)<br/>
       -Non-marking shoes<br/>
      </Card.Text>
      </Card.Body>
      </Card>
      </div>
        <Button onClick={()=>submit(location.state.name)} variant="success" size="lg"  style={{fontSize:'30px'}} block>
        {/* put type submit later  */}
            Book Court
        </Button>
      <Foot/>
      </div>
    );
    
}
export default Courtdetails;