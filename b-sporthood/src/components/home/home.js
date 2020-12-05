import React from 'react'
import Head2 from './head2'
import Navbar from '../Navbar/Navbar'
import Head3 from '../footer/head3'
//import Hero from '../about/hero';
import Slideshow from './slides'
function Home() {
    return (
        <div>
            <Navbar/>
            <Slideshow/>
            <Head2 />
            <Head3 />
        </div>    
    )
}

export default Home;