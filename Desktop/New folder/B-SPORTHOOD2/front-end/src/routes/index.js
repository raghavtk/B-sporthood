import React from 'react';
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import Deck from "../components/Cards/Deck";
import Courtdetails from "../components/courtdetails/courtdetails";
import Resultpage from "../components/courtdetails/result";
import Profile from "../components/Profile/Profile";
import Home from "../components/home/home";
import About from "../components/about/index";
import LoginPage from "../components/Login/LoginPage";
import SignUpForm from "../components/Signup/index";
import Terms from "../components/terms/terms_and_cond";
import ResultCancelpage from "../components/Profile/result";
import Payment from "../components/payment/payment";
const Routes = () => {

    return ( 
        <Router>
            <Switch >

                {/* <Route path="/signup" component={SignUpForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/about" component={About}/>
                <Route path="/terms" component={Terms}/>*/}
                <Route path="/signup" component={SignUpForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/about" component={About}/>
                <Route path="/court" exact component={Deck}/>
                <Route path="/court_detail" exact component={Courtdetails}/>
                <Route path="/" exact component={Home}/>
                <Route path="/result" exact component={Resultpage}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/terms" exact component={Terms}/>
                <Route path="/cancel_result" exact component={ResultCancelpage}/>
                <Route path="/payment" exact component={Payment}/>
                {/* <Route path="/" exact render={
                    (props)=>(
                        <UserNameIdProvider>
                            <Loginpage/>
                        </UserNameIdProvider>
                    )
                }/> */}
                
                
            </Switch>

        </Router>
    )
}
export default Routes;

