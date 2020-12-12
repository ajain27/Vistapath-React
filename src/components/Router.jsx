import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CaseDetails from './CaseDetails';
import Home from './Home';

function Routes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/cases/:id' component={CaseDetails} />
                </Switch>
            </Router>
            
        </div>
    )
}

export default Routes