import React from "react";
import image1 from "../misc/hero1.jpg";
import image2 from "../misc/hero2.jpg";
import image3 from "../misc/hero3.jpg";
import image4 from "../misc/hero4.jpg";
import image5 from "../misc/hero5.jpg";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slides.css";

const slideImages = [image1, image3, image2, image4, image5];

const properties = {
  prevArrow: <div style={{width: "50px", height: "50px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", fontSize:"20px", marginLeft:"20px", border: "2px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease"}}><i className="fas fa-chevron-left"></i></div>,
  nextArrow: <div style={{width: "50px", height: "50px", borderRadius: "50%", background: "rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", fontSize:"20px", marginRight:"20px", border: "2px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease"}}><i className="fas fa-chevron-right"></i></div>
}

function Slideshow() {
  return (
    <div>
      <Slide easing="ease" {...properties}>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[3]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[4]})` }}></div>
        </div>
      </Slide>
    </div>
  );
}

export default Slideshow;