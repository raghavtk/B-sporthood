import React from 'react'
import Head2 from './head2'
import Nbar from '../Nbar/Nbar'
import Head3 from '../footer/head3'
//import Hero from '../about/hero';
import Slideshow from './slides'
function Home() {
    return (
        <div>
            <Nbar/>
            <Slideshow/>
            <Head2 />
            <Head3 />
        </div>    
    )
}

export default Home;