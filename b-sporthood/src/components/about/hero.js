import { Box, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HeroImage1 from './hero1.jpg';
import HeroImage2 from './hero2.jpg';
// import HeroImage3 from '../../../assets/img/svg/hero3.jpg';
// import HeroImage4 from '../../../assets/img/svg/hero4.jpg';
// import HeroImage5 from '../../../assets/img/svg/hero5.jpg';



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '90%',
      width:'100%'
    },
    
    image: {
      width: '100px',
      height: '80%',
    },
  }),
);

const Hero = ( props )=>{
    const classes=useStyles(props);
    return(
        <Box className={classes.root}>
            <Carousel autoPlay infiniteLoop >
                <div>
                    <img src={HeroImage1} className={classes.image} alt=""/>
                </div>
                <div>
                    <img src={HeroImage2} className={classes.image} alt=""/>
                </div>
               
            </Carousel>
        </Box>
    );

}


export default Hero;