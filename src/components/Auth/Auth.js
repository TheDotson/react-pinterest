import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  };

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-primary" onClick={this.loginClickEvent}><i className="fab fa-google"></i> Login</button>
      </div>
    );
  }
}

export default Auth;
