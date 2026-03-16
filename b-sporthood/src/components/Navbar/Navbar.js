import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import { Button } from "../Button"
import { Link } from 'react-router-dom';
import './Navbar.css'
import img from "../B-sPort1.jpg"

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <div>
            <nav className="NavbarItems">
               <div className="spacer"></div>
                <img className="spacer" src={img} alt="logo"></img>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
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
                <Button to="/signup">Sign Up!!</Button>
            </nav>
            </div>
        )
    }
}
export default Navbar;
