import React, { Component } from 'react';
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
               <div>
               <ul className="icons">
                   <i className="far fa-dot-circle"></i>
                  <i className="far fa-heart"></i>
                  <i className="fas fa-rupee-sign"></i>
               </ul>
                 <div className="texts">
                     <p className="txt1">Book a Court</p>
                     <p className="txt1">Healthier life</p>
                     <p className="txt2">Amazing prizes</p>
                     </div>
                     <div className="texting">
                 <h6 className="txt3">Choose between the nearest court <br/>available and book it!</h6>
                 <h6 className="txt4">Playing badminton regularly can help<br/>improve your heart function.</h6>
                 <h6 className="txt3">We give prizes for regular<br/> customers! </h6>
           </div>
               </div>
            </div>
        )
    }
}

export default Head2
