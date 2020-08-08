import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>React-Pinterest</h1>
        <button className="btn btn-danger">
        <i className="fab fa-pinterest"></i>Pinterest Button<i className="fab fa-pinterest"></i></button>
      </div>
    );
  }
}

export default App;
