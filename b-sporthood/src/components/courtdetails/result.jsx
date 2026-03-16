import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

function Resultpage() {
    const location = useLocation();
    var variant;
    var button_varriant;
    var heading;
    var p ;
    if(location.state.success !==1)
    {
        variant = "danger";
        button_varriant = "outline-danger";
        heading = "You Booking could not be Completed due to server issues";
        p = "Please try again after sometime";

    }
    else
    {
        variant = "success";
        button_varriant = "outline-success";
        heading = "You have Successfully Booked ";
        p = "Thank You for booking with B-Sporthood";
    }
    return (
      <>
        <Alert variant={variant}>
          <Alert.Heading>{heading}</Alert.Heading>
          <p>
            {p}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="/court"><Button  variant={button_varriant}>
              Continue
            </Button></Link>
          </div>
        </Alert>
      </>
    );
  }
export default Resultpage;