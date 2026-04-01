import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from "../B-sPortlogo.jpg"
import './head2.css'

class Head2 extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <div className="maintag">
                   <img className="spacer1" src={img} alt="logo"></img>
                   <div className="name">
                   <p>Play more sports</p>
                   </div>
               <div style={{width: "100%", maxWidth: "1200px"}}>
               <ul className="icons">
                   <i className="far fa-dot-circle"></i>
                  <i className="far fa-heart"></i>
                  <i className="fas fa-rupee-sign"></i>
               </ul>
                 <div className="headings">
                     <p className="headings1">Book a Court</p>
                     <p className="headings2">Healthier lifestyle</p>
                     <p className="headings3">Amazing prizes</p>
                     </div>
                     <div className="headings_1">
                 <h6 className="headings11">Choose between the nearest court <br/>available and book it!</h6>
                 <h6 className="headings21">Playing badminton regularly can help<br/>improve your heart function.</h6>
                 <h6 className="headings31">We give prizes for regular<br/> customers! </h6>
           </div>
           
           <div className="cta-container">
             <Link to="/court" className="home-book-btn">Book Now</Link>
           </div>
               </div>
            </div>
        )
    }
}

export default Head2
