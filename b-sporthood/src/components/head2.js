import React, { Component } from 'react';

import './Navbar/Navbar.css'
import img from "./B-sPortlogo.jpg"
import './head2.css'

class Head2 extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(

            <div className="maintag">
                   <img  className="spacer1" src={img} alt="logo"></img>

                   <div className="name">
                   <p >DO MORE SPORT</p>
                  
                   </div>

                 
               <div >
               < ul className="icons" >
                  
                   <i   class="far fa-dot-circle"></i>
                  
               
              
                  <i class="far fa-heart"></i>
                  <i class="fas fa-rupee-sign"></i>
                      </ ul>
               </div>

               <div >
               < ul className="headings" >
               <h7  className="headings1" >PRIORITY  SERVICE</h7>
               <h7  className="headings2">WE CARE!!!</h7>
               <h7  className="headings3">LOWEST PRICES</h7>
               </ ul>
                    </div>              


                    
               <div >
               < ul className="headings_1" >
               <p  className="headings11" >Book in advance and walk in just to play.No more waiting</p>
               <p  className="headings21">We run a 24*7 Helpline to ensure there are no hiccups</p>
               <p  className="headings31">We guarantee the best rates and also run promotions for you</p>
               </ ul>
                    </div>      

                        
    
            </div>
        )
    }
}

export default Head2