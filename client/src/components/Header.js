import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './StripPayment';

class Header extends Component {
  
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
      //navigate to a complete different domain, a different html doc, but just to let usr to navigare 
      //in side of our app, we use Link tag instead of a tag
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key='3' style={{ margin: '0 10px' }}>Credit: {this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }          


  render() {
    // console.log(this.props);//you can see two result, one is null, one is result 
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
          to={this.props.auth ? '/surveys' : '/'}
          className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
              {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//get called with the entire state object out of redux store 
function MapStateToProps ({ auth }) {
  return { auth };
}

export default connect(MapStateToProps)(Header);
