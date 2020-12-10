import React from "react";
import image1 from "../misc/hero1.jpg";
import image2 from "../misc/hero2.jpg";
import image3 from "../misc/hero3.jpg";
import image4 from "../misc/hero4.jpg";
import image5 from "../misc/hero5.jpg";
import { Slide } from "react-slideshow-image";// Download this if it doesnt exist
import "react-slideshow-image/dist/styles.css";
import "./slides.css";

const slideImages = [image1, image3, image2, image4, image5];
function Slideshow() {
  return (
    <div>
      <Slide easing="ease">
     
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