import React, {useState, useContext, useEffect} from "react";
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import Nbar from '../Nbar/Nbar';
import Profile_card from './Profile_card';
import axios from 'axios';
import { Card, Jumbotron } from "react-bootstrap";
import Foot from '../footer/head3'
import {useHistory} from 'react-router-dom';
function card(detail)
{
    return(
        <Profile_card
        court_name={detail.courtname}
        booking_time={detail.time}
    />
    );
    

}
function Profile()
{
    const [details, setDetails] = useState(['Empty']);
    const [username, setNameid] = useContext(UserNameIdContext);
    console.log("Hi");
    const history = useHistory();
    if(username === '')
    {
        history.push('/');
    }
    useEffect(()=>{
        const request = async()=>{
            await axios.post('http://localhost:5000/userdetails', {username})
            .then(res => {
                const det = res.data.courts;
                setDetails(det);
                
            });
            
        }
        request();
    }, []);
    
    return (      
        <>
        <Nbar name={username}/> 
        <Jumbotron style={{margin:"0px"}}>
        <Card bg="primary" text="light" className="text-center" style={{fontSize:"30px", textAlign: "auto"}}>
        <Card.Header>Courts Booked</Card.Header>  
        </Card>
          {console.log(details)}                                                                                                                                                                                        
       {(details === ['Empty'] || details === undefined || details.length === 0)?<Profile_card court_name="You have not booked any courts yet !!"/>:details.map(card)}
       </Jumbotron> 
       <Foot/>
       </>
    );
}
export default Profile;                                     