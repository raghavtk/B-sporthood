import React, { Component } from 'react';

import './head3.css'
import img from "./B-sPort1.jpg"
class Head3 extends Component {
    

    render() {
        return(

            <div className="main">

                <p className="styled"> B-SPORTHOOD</p>
            
                   <div className="list">

                <ul className="list1">
                    <p className="names1">About Us</p>
                    <p className="names1">Terms & Conditions</p>
                    <p className="names1">Privacy</p>
                </ul>
                                                               
                <img  className="logowithname" src={img} alt="logo"></img>
                   </div>
                  < div className="lastline" >
                  <i  className="lastline1"  class="far fa-copyright"> 2020 B-SportHood. All rights are reserved.</i>
                
                  
                  </div>
                  
        
                 </div>
                 
              
        )
    }
}

export default Head3