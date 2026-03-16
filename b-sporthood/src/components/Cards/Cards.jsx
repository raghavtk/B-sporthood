import React from "react";
import {Card, Button, Col} from "react-bootstrap";
import {useHistory} from 'react-router-dom';
function Cards(props)
{
    const history = useHistory();
    function click(address, Name, img1, img2, amount)
    {
      history.push({pathname:'/court_detail', state: {addr: address, name: Name, img1: img1, img2: img2, amount: amount}});
      
    }
    console.log(props.img1)
    return (
      <Col lg={3}>
        <Card style={{ minHeight: '95%', margin:"10px"}}>
        <Card.Img variant="top" style={{width:"95%", margin:"10px"}}src={props.img1} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.location}
          </Card.Text>  
        </Card.Body>
        <Card style={{border: "0px"}}>
          <Card.Body style={{marginBottom:-5}}>
        <Button   onClick={()=>click(props.address, props.name, props.img1, props.img2, props.amount)} variant="primary" block>Book Now</Button>
        </Card.Body>
        </Card>

      </Card>
      </Col>
      
    );
   
}

export default Cards;