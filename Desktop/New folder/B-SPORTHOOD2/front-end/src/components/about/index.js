import React from 'react'
import Nbar from '../Nbar/Nbar'
import Head3 from "../footer/head3"
import { createStyles, makeStyles} from '@material-ui/core';
import { Divider } from '@material-ui/core';
import './about.css'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin:"5%",
      padding: '2% 2%',
      display: 'flex',
      flexDirection: 'column',
      height: '90%',
      backgroundColor:"#fffdd0 ",
      padding:'4%',

    },
    root1: {
        display: 'flex',
        flexDirection: 'column',
        height: '100px',   
        backgroundColor:"#fffdd0 ",
        padding:'4%',
        
      },
    title: {
      fontFamily: 'BrandonTextWeb-Bold',
      textAlign: 'left',
      marginBottom: theme.spacing(3),
      maxWidth: '90%',
    },
    subtitle: {
      textAlign: 'left',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(3),
      maxWidth: '90%',
    },
    
  }),
);
function About() {
    const classes = useStyles();
    return( 
        <>
        <Nbar/>
        
        <div class="title">
          <h2 class="heading">About Us</h2>
        </div>
        <Divider/>
        <div class="body">
          <p class="para">
            <br/>
        Welcome to B-Sporthood.<br/>
          We are dedicated to giving you the very best of experiences at our courts.
          We are currently one of the best performing Badminton Academies in the country having intention 
          & passion to expand the interest of playing the fastest Racquet sport "BADMINTON".<br/></p>
          <h3>How we Started</h3>
          <br/>
          <p class="para">
          We believe that we need to provide a platform to help people enjoy recreational 
          activities which is good for the community’s health and well-being.<br/>
          </p>
          <h3>What makes us unique</h3>
          <br/>
          <p class="para">We believe that India has a huge potential to bring at least 4 Olympic medals from 
            badminton itself so we focus to find talents through our coaching centers for 
            beginners and intermediate players which are placed all over India and Bangalore.<br/></p>
          <h3>What do we value</h3>
          <br/>
          <p class="para">We value the needs of our customers and we try our level best to provide 
          as many facilities as required. We have made sure we have a proper lighting system for your needs. 
          We also provide parking facility so that doesn't become a problem.<br/></p>
          <h3>Why you should choose us</h3>
          <br/>
          <p class="para">We try to get better each and every day considering what different customers need. 
          We do not neglect anything and make sure we deal with with every feedback given. </p>
          <br/>
          <p class="para">We hope you enjoy this as much as we enjoy offering this opportunity to you. 
          If you have any questions or comments, please don't hesitate to contact us.<br/>
          We enjoy a 5 Star rating in Google and above 4.5 in other websites and application. We focus 
          at all proficiency level players like Beginners, Intermediate, Advanced and Professionals. We have 
          coaching staff of International repute. badminton club.</p>
          <br/>
          <br/>
          <p>Regards,<br/>
          The B-Sporthood Team<br/>
          </p>

          </div>


        <Head3 />

        </>
    )
}

export default About;