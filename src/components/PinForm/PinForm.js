import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    createPin: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    link: '',
    imageUrl: '',
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeLinkEvent = (e) => {
    e.preventDefault();
    this.setState({ link: e.target.value });
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { title, link, imageUrl } = this.state;
    const { createPin, boardId } = this.props;

    const newPin = {
      boardId,
      title,
      link,
      imageUrl,
      uid: authData.getUid(),
    };
    createPin(newPin);
  }

  render() {
    return (
      <form className="col-6 offset-3">
        <div className="form-group">
          <label htmlFor="pinTitle">Pin Title</label>
          <input
            type="text"
            className="form-control"
            id="pinTitle"
            placeholder="Enter Pin Name"
            onChange={this.changeTitleEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinLink">Pin Link</label>
          <input
            type="text"
            className="form-control"
            id="pinLink"
            placeholder="Website"
            onChange={this.changeLinkEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinImage">Pin Image</label>
          <input
            type="text"
            className="form-control"
            id="pinImage"
            placeholder="Image URL"
            onChange={this.changeImageEvent}
          />
        </div>
        <button className="btn btn-dark" onClick={this.savePinEvent}>Save Pin</button>
      </form>
    );
  }
}

export default PinForm;
