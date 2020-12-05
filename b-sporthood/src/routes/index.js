import React from 'react';
import { HashRouter as Router, Switch,Route} from 'react-router-dom';

import SignUpForm from '../components/signup';
import LoginPage from '../components/login/LoginPage';
import About from '../components/about'
import Home from '../components/home/home'

const Routes = () => {

    return ( 
        <Router>
            <Switch >

                <Route path="/signup" component={SignUpForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/about" component={About}/>
                <Route path="/" component={Home}/>
                
                
            </Switch>

        </Router>
    )
}
export default Routes;

