import React from 'react';
import propTypes from 'prop-types';
import Auth from '../Auth/Auth';
import LogOut from '../LogOut/LogOut';

class MyNavbar extends React.Component {
  static = {
    authed: propTypes.bool,
  }

  render() {
    const { authed } = this.props;

    const loadComponent = () => {
      if (authed) {
        return <LogOut />;
      }

      return <Auth />;
    };

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <i className="fab fa-pinterest fa-2x"></i>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              {loadComponent()}
            </li>
          </ul>
        </div>
          </nav>
      </div>
    );
  }
}

export default MyNavbar;
