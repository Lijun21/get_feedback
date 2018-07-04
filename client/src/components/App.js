import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
//instant component has been mounted or rendered on the screen, go figure out if current user are signed in
//componentDidMount() is invoked immediately after a component is mounted. 
//Initialization that requires DOM nodes should go here. 
//If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//actions get assigned to this App component as props
export default connect(null, actions)(App);
