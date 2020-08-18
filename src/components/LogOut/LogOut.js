import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class LogOut extends React.Component {
  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    return (
      <div className="Logout">
        <button className="btn btn-danger" onClick={this.logoutClickEvent}>Logout <i className="fas fa-sign-out-alt"></i></button>
      </div>
    );
  }
}

export default LogOut;
