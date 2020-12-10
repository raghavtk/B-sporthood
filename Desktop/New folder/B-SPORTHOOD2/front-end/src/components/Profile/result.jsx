import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

function ResultCancelpage() {
    const location = useLocation();
    var variant;
    var button_varriant;
    var heading;
    var p ;
    if(location.state.success !==1)
    {
        variant = "danger";
        button_varriant = "outline-danger";
        heading = "You Canceling could not be Completed due to server issues";
        p = "Please try again after sometime";

    }
    else
    {
        variant = "success";
        button_varriant = "outline-success";
        heading = "You have Successfully Canceled ";
        p = ''
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
            <Link to="/profile"><Button  variant={button_varriant}>
              Continue
            </Button></Link>
          </div>
        </Alert>
      </>
    );
  }
export default ResultCancelpage;