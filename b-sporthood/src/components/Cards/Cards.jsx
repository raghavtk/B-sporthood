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
      <Col xs={12} md={6} lg={3}>
        <Card className="premium-card" style={{ minHeight: '95%', margin:"10px", border: "none", boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ overflow: "hidden", borderRadius: "8px 8px 0 0", margin: "10px" }}>
           <Card.Img variant="top" style={{width:"100%"}} src={props.img1} />
        </div>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text style={{color: '#666'}}>
            {props.location}
          </Card.Text>  
        </Card.Body>
        <Card.Body style={{marginBottom:-5}}>
        <Button onClick={()=>click(props.address, props.name, props.img1, props.img2, props.amount)} variant="primary" block style={{borderRadius: "20px", fontWeight: "600"}}>Book Now</Button>
        </Card.Body>
        </Card>

      </Col>
      
    );
   
}

export default Cards;