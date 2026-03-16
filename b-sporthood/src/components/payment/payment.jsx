import React, {ReactDOM} from "react";
import { Button, Col, Form, Jumbotron, Card } from "react-bootstrap";
import {Link, useLocation} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import {useContext} from 'react';
function Payment()
{
    const location = useLocation();
    const history = useHistory();
    const firstname = React.createRef();
    const lastname = React.createRef();
    const cardnum = React.createRef();
    const cvv = React.createRef();
    const date = React.createRef();
    const [username, setNameid] = useContext(UserNameIdContext);
    function pay()
    {
        
        //console.log(firstname.current.value);
        if(firstname.current.value === '' || lastname.current.value=== '' || cardnum.current.value === '' || cvv.current.value === '' || date.current.value === '')
        {
            alert("All entries must be filled");
        }
        else if(cardnum.current.value.length !== 19)
        {
            alert("Invaild Card Number");   
        }
        else if(cardnum.current.value[4] !== '-' || cardnum.current.value[9] !== '-' || cardnum.current.value[14] !== '-')
        {
            alert("Invaild Card Number");
        }
        else if(cvv.current.value.length !== 3 )
        {
            alert("Invaild CVV"); 
        }
        else if(date.current.value.length !== 7)
        {
            alert("Invaild Date");
        }
        else if(date.current.value[2] !== '/')
        {
            alert("Invaild Date");
        }
        else if(parseInt(date.current.value.slice(0, 2)) <= 0 ||  parseInt(date.current.value.slice(0, 2)) > 12 || parseInt(date.current.value.slice(3, 7)) < 2020)
        {
            alert("Invaild Date");
        }
        else
        {
            const success = location.state.success;
            console.log(parseInt(date.current.value.slice(0, 2)));
            history.push({pathname:'/result', state: {success}});
        }
        // console.log(lastname.current.value);
        // console.log(cardnum.current.value);
        // console.log(cvv.current.value);
        // console.log(date.current.value);
        
    }
    return(
        <div>
        <Card bg="dark">
            <Card.Header style={{color: "white", fontSize:"35px"}}>Payment Details</Card.Header>
        </Card>
        <Jumbotron style={{margin:"30px"}}>
        <Card bg="primary" style={{margin: "10px"}}> 
            <Card.Body style={{color:"white", fontSize: "30px"}}>Amount Rs: {location.state.amount}/- </Card.Body>
        </Card>
        <Form style={{margin: "20px"}}>
            <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control ref={firstname} type="email" placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col} >
                <Form.Label>Last Name</Form.Label>
                <Form.Control  ref={lastname} placeholder="Last Name" />
                </Form.Group>
            </Form.Row>

            <Form.Group >
                <Form.Label>Card Number</Form.Label>
                <Form.Control ref={cardnum} placeholder="1234-4567-8910-9900" />
            </Form.Group>

            <Form.Row>
                <Col lg={1}>
                <Form.Group controlId="formGridPassword">
                <Form.Label>CVV</Form.Label>
                <Form.Control ref={cvv} type="password" placeholder="CVV" />
                </Form.Group>
                </Col>
                <Col lg={1}>
                <Form.Group>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control  ref={date} placeholder="MM/YYYY"/>
                </Form.Group>
                </Col>
            </Form.Row>


            <Button onClick={()=>pay()} style={{fontSize:"30px", margin: "10px"}} variant="success" block>
                Pay Now
            </Button>
        </Form>
        </Jumbotron>
        </div>
    );
}

export default Payment;

