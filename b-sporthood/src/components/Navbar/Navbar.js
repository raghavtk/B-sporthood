import React, { useContext, useState } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css'
import img from "../B-sPort1.jpg"
import { UserNameIdContext } from '../UserNameId/UserNameIdContext';

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [username, setUsername] = useContext(UserNameIdContext);
    const history = useHistory();

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUsername('');
        history.push('/');
    }

    return (
        <div>
            <nav className="NavbarItems">
               <div className="spacer"></div>
                <img className="spacer" src={img} alt="logo"></img>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <div className="nav-actions">
                    {username ? (
                        <>
                            <span className="welcome-text">Hi, {username}!</span>
                            <button className="btn btn--outline btn--medium nav-btn" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="btn btn--outline btn--medium nav-btn" style={{marginRight: '10px'}}>Login</button></Link>
                            <Link to="/signup"><button className="btn btn--primary btn--medium nav-btn">Sign Up</button></Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
