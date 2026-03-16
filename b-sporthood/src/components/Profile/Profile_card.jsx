import axios from "axios";
import React, {useContext} from "react";
import { Button, Card } from "react-bootstrap";
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import {useHistory} from 'react-router-dom';
function Profile_card(props)
{
    const not_booked = "You have not booked any courts yet !!";
    const [username, setNameid] = useContext(UserNameIdContext);
    const history = useHistory();
    console.log("hi")
    const cancel = async (courtname,bookingtime)=> 
    {
        
        await axios.post('http://localhost:5000/cancel', {username, courtname,bookingtime})
          .then((res)=>{
            console.log("Cancelation complete")
            console.log(res.data);
            const success = res.data.ok;
            history.push({pathname:"/cancel_result", state: {success}});
        });
    }
    return (
        <Card style={{margin: '5px 0px 5px 0px'}}>
            {(props.court_name === not_booked || props.court_name === undefined)?
                <Card.Body style={{margin: "5px", fontSize:"20px"}}>
                    {not_booked}
                </Card.Body>:
                <Card.Body style={{margin: "5px", fontSize:"20px"}}>
                    Court Name: {props.court_name}<br/>
                    Booked on: {props.booking_time}<br/><br/>
                    <Button onClick={()=>cancel(props.court_name, props.booking_time)} variant="danger">Cancel Booking</Button>
                </Card.Body>
            }
        </Card>
    );
}
export default Profile_card;