import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import {UserNameIdContext} from '../UserNameId/UserNameIdContext';
import img from "../B-sPort1.jpg"
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
function Nbar(props)
{
    const [username, setNameid] = useContext(UserNameIdContext);
    const history = useHistory();
    console.log(username);
    function logout()
    {
        setNameid('');
        history.push("/");
    }
    function home()
    {
        history.push('/');
    }
    function about()
    {
        history.push('/about');
    }
    function login()
    {
        history.push("/login");
    }
    function signup()
    {
        history.push("/signup");
    }
    function profile()
    {
        history.push("/profile");
    }
    function deck()
    {
        history.push("/court");
    }
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href=""><img  className="spacer" src={img} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" style={{fontSize: '1.4rem'}}>
            <Nav.Link onClick={home} href="" style={{margin:'10px  0px 0px 0px'}}>Home</Nav.Link>
            <Nav.Link onClick={about} style={{margin:'10px  0px 0px 0px'}}>About</Nav.Link>
           
            {(username === '')?'': <Nav.Link onClick={deck} style={{margin:'10px  0px 0px 0px'}}>Book Now</Nav.Link>}
            
            

            {(username === '')?

                <Nav.Link  >
                    <Button style={{marginRight:"10px", fontSize:"1.4rem"}} onClick={login} variant="primary">Login</Button>
                </Nav.Link>:
                <Nav.Link style={{margin:'10px  0px 0px 0px'}} onClick={profile} >
                    Welcome {username} !
                </Nav.Link>}
                

            
            
                {(username === '')?
                <Nav.Link >
                    <Button style={{marginRight:"10px", fontSize:"1.4rem"}} onClick={signup} variant="secondary">Sign-up</Button>
                </Nav.Link>:
                <Nav.Link >
                    <Button style={{marginRight:"10px", fontSize:"1.4rem"}} onClick={logout} variant="secondary">Sign-Out</Button>
                </Nav.Link>}
            
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}
export default Nbar;